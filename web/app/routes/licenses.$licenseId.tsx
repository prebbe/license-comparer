// Copyright 2024 Philip Rebbe

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import invariant from "tiny-invariant";

import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";

import type { FunctionComponent } from "react";

import type { Action, License } from "../../../core/dist/index";
import { LicenseFinder } from "../../../core/dist/index";

export const loader = ({params}: LoaderFunctionArgs) => {
    invariant(params.licenseId, "Missing licenseId");

    const finder = new LicenseFinder();

    let license = finder.getLicenseById(Number(params.licenseId));

    if (license == undefined) {
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
                <li>Short-Name: {metaInformation.spdxName}</li>
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