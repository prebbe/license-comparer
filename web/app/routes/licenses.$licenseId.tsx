import invariant from "tiny-invariant";

import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";

import type { FunctionComponent } from "react";

import type { Action, License } from "../../../core/dist/index";
import { DataAccess } from "../../../core/dist/index";

export const loader = ({params}: LoaderFunctionArgs) => {
    invariant(params.licenseId, "Missing licenseId");
    const db = new DataAccess();
    const license = db.loadLicenseById(Number(params.licenseId));

    if (license == null) {
        throw new Response("Not found", {status: 404})
    }

    return json({license});
}

export default function License() {
    const { license } = useLoaderData<typeof loader>();

    if (license == null) {
        return (
            <p>This license does not exist. Please try again :)</p>
        )
    }

     return (
        <div>
            <Link to={`/licenses`} className="go-back-link">← Go back</Link>
            <h2>{license.metaInformation.name}</h2>

            <LicenseInformation license={license} />

            <LicenseDetails license={license}/>
        </div>
    );
}

const LicenseInformation: FunctionComponent<{
    license: Pick<License, 'metaInformation'>
}> = ({ license }) => {
    const metaInformation = license.metaInformation;

    return (
        <div className="license-metainformation">
            <h3>Meta-Information</h3>
            <ul>
                <li>Internal Id: {metaInformation.id}</li>
                <li>Short-Name: {metaInformation.shortName}</li>
                <li>Link: <a href={metaInformation.sourceLink} target="_blank">{metaInformation.sourceLink}↗</a></li>
            </ul>
            {(metaInformation.description !== '') ? <p>{metaInformation.description}</p> : "" }
        </div>
    )
}

const LicenseDetails: FunctionComponent<{
    license: License
}> = ({ license }) => {
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
                                    <li className="license-permission"><ActionElement action={permission} /></li>)
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
                                    <li className="license-prohibition"><ActionElement action={prohibition} /></li>)
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
                                    <li className="license-duty"><ActionElement action={duty} /></li>)
                                )
                            }
                        </ul>) : ('')
                    }
                </div>
            </div>
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