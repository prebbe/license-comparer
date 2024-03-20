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
                  <td>{aggregate.licenses[0].spdxName}</td>
                  <td>{aggregate.licenses[1].spdxName}</td>
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