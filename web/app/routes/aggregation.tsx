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

import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";

import { Aggregator, Action } from "../../../core/dist/index";
import { FunctionComponent } from "react";

export const loader = () => {
  const aggregator = new Aggregator();
  
  const aggregates = aggregator.runFullAggregation();

  return json({aggregates});
}

export default function Aggregation() {
  const { aggregates } = useLoaderData<typeof loader>();
  
  return (
      <div className="main">
          <h2>License-Aggregator</h2>
          {aggregates.length? 
            (
              <table>
              <tr>
                <th>License 1</th>
                <th>License 2</th>
                <th>Permissions</th>
                <th>Prohibitions</th>
                <th>Duties</th>
              </tr>
              {aggregates.map((aggregate) => (
                <tr>
                  <td>{aggregate.metainformations[0].spdxName}</td>
                  <td>{aggregate.metainformations[1].spdxName}</td>
                  <td>
                    <LicenseActionList actions={aggregate.permissions} />
                  </td>
                  <td>
                    <LicenseActionList actions={aggregate.prohibitions} />
                  </td>
                  <td>
                    <LicenseActionList actions={aggregate.duties} />
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <p>No aggregates found :/</p>
          )
        }  
      </div>
  )
}


const LicenseActionList: FunctionComponent<{
  actions: Action[]
}> = ({ actions }) => {

    if (actions.length <= 0) {
      return (<p>-</p>);
    }

    return (
      <ul>
      {actions.map((action) => (
        <li><ActionElement action={action} /></li>
      ))}
      </ul>
    );
}

const ActionElement: FunctionComponent<{
  action: Action
}> = ({ action }) => {

    return (
        <span title={action.description}>{action.displayName}</span>
    )
}