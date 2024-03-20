import { json, ActionFunctionArgs, redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { Action, CheckResult, CompositeLicense, LicenseFinder, MetaInformation, RecommendationResult } from "../../../core/dist/index";
import { FunctionComponent } from "react";

import { addLicense, getLicense, checkLicense, resetLicense, toJson, getRecommendations } from '../../pipeline';


export const loader = () => {
  const finder = new LicenseFinder();
  const metainformations = finder.getLicenses().map((license) => license.metaInformation);

  const compositeLicense = getLicense();

  const hasStartedPipeline = !(compositeLicense == null);

  const checkResult = checkLicense();

  const jsonResult = toJson();

  const recommendationResult = getRecommendations();

  return json({ metainformations, hasStartedPipeline, compositeLicense, checkResult, jsonResult, recommendationResult });
}

export const action = async ({_, request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const action = formData.get('_action') as string;
    if (action == 'add') {
        const newLicense = formData.get('license') as string;

        addLicense(newLicense);
    }
    if (action == 'reset') {
        resetLicense();
    }
    
    return redirect('/pipeline');
}

export default function Pipeline() {
  const { metainformations, hasStartedPipeline, compositeLicense, checkResult, jsonResult, recommendationResult } = useLoaderData<typeof loader>();
  
  return (
    <div className="main">
      <h2>License-Aggregation-Pipeline</h2>
        <div className="license-pipeline-container">
            <LicenseSelectorForm metainformations={metainformations} hasStartedPipeline={hasStartedPipeline} />
            <CompositeLicenseOverview license={compositeLicense} />
        </div>
        <CompositeLicenseCheckDisplay checkResult={checkResult} />
        <CompositeLicenseRecommendations recommendations={recommendationResult} />
        <CompositeLicenseDisplay license={compositeLicense} />
        <CompositeLicenseJsonDisplay json={jsonResult} />
        
    </div>
  )
}

const LicenseSelectorForm : FunctionComponent<{
    metainformations: MetaInformation[],
    hasStartedPipeline: boolean
}> = ({ metainformations, hasStartedPipeline }) => {
    return (
        <div className="license-pipeline-form">
            <form className="license-pipeline-form-element" method="post">
                <label>
                    <span>License-Name</span>
                    <LicenseSelector metainformations={metainformations} />
                </label>
                
                <button typeof="submit" name="_action" value="add">{
                    hasStartedPipeline ?
                    'Add' :
                    'Start'
                }</button>
                <button typeof="submit" name="_action" value="reset">Reset</button>
            </form>
        </div>
    )
}

const LicenseSelector: FunctionComponent<{
    metainformations: MetaInformation[]
  }> = ({ metainformations }) => {
      return (
          <select name="license">
            {
                metainformations.map((metainformation) => (
                    <option>{metainformation.name}</option>
                ))
            }
          </select>
      )
  }

const CompositeLicenseOverview: FunctionComponent<{
    license: (CompositeLicense | null)
  }> = ({ license }) => {
    if (license == null) {
        return (
            <div className="license-pipeline-overview">
                <p>Please choose a license!</p>
            </div>
        )
    }

    return (
        <div className="license-pipeline-overview">
            <ul>
                {
                    license.metainformations.map((license) => (
                        <li>{license.name}</li>
                    ))
                }
            </ul>
        </div>
    )
  }


  const CompositeLicenseCheckDisplay: FunctionComponent<{
    checkResult: (CheckResult | null)
  }> = ({ checkResult }) => {
  
      if (checkResult == null) {
          return (
            <div className="license-actions">
                <h3>Check-Result</h3>
                <p>Overall-Result: ?</p>
            </div>
          )
      }
  
      return (
        <div className="license-actions">
              <h3>Check-Result</h3>
              <p>Overall-Result: <CheckIcon value={checkResult.result} /></p>
              <ul>
                {checkResult.checks.map((check) => (
                    <li>{`${check.name1} x ${check.name2} = `}<CheckIcon value={check.areCompatible} />{`(Less Restrictive: `}<CheckIcon value={(check.restrictivenessCheck1 && check.restrictivenessCheck2)} />{`, composable: `}<CheckIcon value={check.canBeComposed} />{` ,share-alike: `}<CheckIcon value={check.areShareAlikeConform} />{`)`}</li>
                ))}
              </ul>
          </div>
      )
  }

const CheckIcon : FunctionComponent<{
    value: boolean
}> = ({ value }) => {
    if (value) {
        return (<span className='license-check-icon-success'>✓</span>);
    } else {
        return (<span className='license-check-icon-failure'>✕</span>)
    }
}

const CompositeLicenseDisplay: FunctionComponent<{
  license: (CompositeLicense | null)
}> = ({ license }) => {

    if (license == null) {
        return (
            <div className="license-actions">
                <h3>Overview</h3>
                <p>Please choose a license!</p>
            </div>
        )
    }

    const permissions = license.permissions;
    const prohibitions = license.prohibitions;
    const duties = license.duties;

    return (
        <div className="license-actions">
            <h3>Overview</h3>
            <div className="license-actions-display">
                <div className="license-actions-display-column">
                    <h4>Permissions</h4>
                    {permissions.length ? (
                        <ul>
                            {
                                permissions.map((permission) => (
                                    <li><ActionElement action={permission} /></li>)
                                )
                            }
                        </ul>) : ('')
                    }
                </div>
                <div className="license-actions-display-column">
                    <h4>Prohibitions</h4>
                    {prohibitions.length ? (
                        <ul>
                            {
                                prohibitions.map((prohibition) => (
                                    <li><ActionElement action={prohibition} /></li>)
                                )
                            }
                        </ul>) : ('')
                    }
                </div>
                <div className="license-actions-display-column">
                    <h4>Duties</h4>
                    {duties.length ? (
                        <ul>
                            {
                                duties.map((duty) => (
                                    <li><ActionElement action={duty} /></li>)
                                )
                            }
                        </ul>) : ('')
                    }
                </div>
            </div>
        </div>
    )
}

const CompositeLicenseRecommendations: FunctionComponent<{
    recommendations: (RecommendationResult[])
  }> = ({ recommendations }) => {
  
      if (recommendations.length == 0) {
          return (
            <div className="license-recommendations">
                <h3>Recommendations</h3>
                <p>-</p>
            </div>
          )
      }
  
      return (
        <div className="license-recommendations">
              <h3>Recommendations</h3>
              <ul>
                {recommendations.map((recommendation) => (
                    <CompositeLicenseRecommendation recommendation={recommendation} />
                ))}
              </ul>
          </div>
      )
  }

const CompositeLicenseRecommendation: FunctionComponent<{
    recommendation: (RecommendationResult)
}> = ({ recommendation }) => {
  
    if (recommendation.comparisonResult.isEqual) {
        return (
        <li>{`${recommendation.name} is equal to the combined license.`}</li>
        )
    }

    if (recommendation.comparisonResult.isMoreRestrictive) {
        return (
            <li>
                <span>{`${recommendation.name} is more restrictive:`}</span>
                <ul>
                    {recommendation.comparisonResult.permissionCheck.missingActions.map((permission) => (
                        <li className="license-permission">{permission.displayName}</li>
                    ))}
                    {recommendation.comparisonResult.prohibitionCheck.additionalActions.map((prohibition) => (
                        <li className="license-prohibition">{prohibition.displayName}</li>
                    ))}
                    {recommendation.comparisonResult.dutyCheck.additionalActions.map((duty) => (
                        <li className="license-duty">{duty.displayName}</li>
                    ))}
                </ul>
            </li>
        )
    }
  
    return (
        <span></span>
    )
  }

const CompositeLicenseJsonDisplay: FunctionComponent<{
    json: string
  }> = ({ json }) => {
  
      return (
          <div className="license-actions">
              <h3>JSON-Result</h3>
              <pre>{json}</pre>
          </div>
      )
  }

const ActionElement: FunctionComponent<{
    action: Action
  }> = ({ action }) => {
  
      return (
          <span title={action.description}>{action.displayName}</span>
      )
  }
