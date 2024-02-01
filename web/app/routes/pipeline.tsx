import { json, ActionFunctionArgs, redirect } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { CheckResult, DataAccess, License, MetaInformation } from "../../../core/dist/index";
import { FunctionComponent } from "react";
import CombinedLicense from "../../../core/dist/entities/CombinedLicense";

import {addLicense, getLicense, checkLicense, resetLicense, toJson } from '../../pipeline';

export const loader = () => {
  const dataAccess = new DataAccess();
  const licenses = dataAccess.loadLicenseMetainformations();

  const combinedLicense = getLicense();

  const hasStartedPipeline = !(combinedLicense == null);

  const checkResult = checkLicense();

  const jsonResult = toJson();

  return json({ licenses, hasStartedPipeline, combinedLicense, checkResult, jsonResult});
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
  const { licenses, hasStartedPipeline, combinedLicense, checkResult, jsonResult } = useLoaderData<typeof loader>();
  
  return (
    <div className="main">
      <h2>License-Aggregation-Pipeline</h2>
        <div className="license-pipeline-container">
            <LicenseSelectorForm licenses={licenses} hasStartedPipeline={hasStartedPipeline} />
            <CombinedLicenseOverview license={combinedLicense} />
        </div>
        <CombinedLicenseCheckDisplay checkResult={checkResult} />
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
              <p>Overall-Result: {checkResult.result ? '✓': '✕'}</p>
              <ul>
                {checkResult.checks.map((check) => (
                    
                    <li>{`${check.name1} x ${check.name2} = ${check.result ? '✓': '✕'} (duties: ${check.dutiesCheck ? '✓': '✕'}, derivative: ${check.derivativesCheck ? '✓': '✕'} ,share-alike:${check.shareAlikeCheck ? '✓': '✕'}, relicensing: ${check.relicensingCheck ? '✓': '✕'}) `}</li>
                ))}
              </ul>
          </div>
      )
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
                                    <li className="license-permission">{permission.name}</li>)
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
                                    <li className="license-prohibition">{prohibition.name}</li>)
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
                                    <li className="license-duty">{duty.name}</li>)
                                )
                            }
                        </ul>) : ('')
                    }
                </div>
            </div>
        </div>
    )
}

const CombinedLicenseJsonDisplay: FunctionComponent<{
    json: string
  }> = ({ json }) => {
  
      return (
          <div className="license-actions">
              <h3>JSON-Result</h3>
              <code>{json}</code>
          </div>
      )
  }