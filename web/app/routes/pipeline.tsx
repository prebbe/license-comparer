import { json, ActionFunctionArgs, redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { Action, CheckResult, DataAccess, License, MetaInformation } from "../../../core/dist/index";
import { FunctionComponent } from "react";
import CombinedLicense from "../../../core/dist/entities/CombinedLicense";

import { addLicense, getLicense, checkLicense, resetLicense, toJson, getRecommendations } from '../../pipeline';
import { RecommendationResult } from "../../../core/dist/recommender";

export const loader = () => {
  const dataAccess = new DataAccess();
  const licenses = dataAccess.loadLicenseMetainformations();

  const combinedLicense = getLicense();

  const hasStartedPipeline = !(combinedLicense == null);

  const checkResult = checkLicense();

  const jsonResult = toJson();

  const recommendationResult = getRecommendations();

  return json({ licenses, hasStartedPipeline, combinedLicense, checkResult, jsonResult, recommendationResult });
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
  const { licenses, hasStartedPipeline, combinedLicense, checkResult, jsonResult, recommendationResult } = useLoaderData<typeof loader>();
  
  return (
    <div className="main">
      <h2>License-Aggregation-Pipeline</h2>
        <div className="license-pipeline-container">
            <LicenseSelectorForm licenses={licenses} hasStartedPipeline={hasStartedPipeline} />
            <CombinedLicenseOverview license={combinedLicense} />
        </div>
        <CombinedLicenseCheckDisplay checkResult={checkResult} />
        <CombinedLicenseRecommendations recommendations={recommendationResult} />
        <CombinedLicenseDisplay license={combinedLicense} />
        <CombinedLicenseJsonDisplay json={jsonResult} />
        
    </div>
  )
}

const LicenseSelectorForm : FunctionComponent<{
    licenses: MetaInformation[],
    hasStartedPipeline: boolean
}> = ({ licenses, hasStartedPipeline }) => {
    return (
        <div className="license-pipeline-form">
            <form className="license-pipeline-form-element" method="post">
                <label>
                    <span>License-Name</span>
                    <LicenseSelector licenses={licenses} />
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
    licenses: MetaInformation[]
  }> = ({ licenses }) => {
      return (
          <select name="license">
            {
                licenses.map((license) => (
                    <option>{license.name}</option>
                ))
            }
          </select>
      )
  }

const CombinedLicenseOverview: FunctionComponent<{
    license: (CombinedLicense | null)
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
                    license.licenses.map((license) => (
                        <li>{license.metaInformation.name}</li>
                    ))
                }
            </ul>
        </div>
    )
  }


  const CombinedLicenseCheckDisplay: FunctionComponent<{
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
                    <li>{`${check.name1} x ${check.name2} = `}<CheckIcon value={check.result} />{`(duties: `}<CheckIcon value={check.dutiesCheck} />{`, derivative: `}<CheckIcon value={check.derivativesCheck} />{` ,share-alike: `}<CheckIcon value={check.shareAlikeCheck} />{`, relicensing: `}<CheckIcon value={check.relicensingCheck} /></li>
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

const CombinedLicenseDisplay: FunctionComponent<{
  license: (CombinedLicense | null)
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

const CombinedLicenseRecommendations: FunctionComponent<{
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
                    <CombinedLicenseRecommendation recommendation={recommendation} />
                ))}
              </ul>
          </div>
      )
  }

const CombinedLicenseRecommendation: FunctionComponent<{
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

const CombinedLicenseJsonDisplay: FunctionComponent<{
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
