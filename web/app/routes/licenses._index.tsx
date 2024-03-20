import { json } from "@remix-run/node";

import { NavLink, useLoaderData } from "@remix-run/react";

import { DataAccess } from "../../../core/dist/index";
import { LicenseFinder } from "../../../core/dist/index";

export const loader = () => {
  const db = new DataAccess();
  const finder = new LicenseFinder();

  const licenses = finder.getLicenses();
  const metaInformation = licenses.map((license) => license.metaInformation);

  return json({metaInformation});
}

export default function Licenses() {
  
  const { metaInformation } = useLoaderData<typeof loader>();
  return (
  <div>
    <h2>License Overview</h2>
    {
      metaInformation.length? (
        <ul>
          {metaInformation.map((info) => (
            <li key={info.id}>
              <NavLink
              className={({ isActive, isPending }) =>
                isActive
                ? "active"
                : isPending
                ? "pending"
                : ""
              }
              to={`/licenses/${info.id}`}>
                {info.name}
              </NavLink>
            </li>
          ))
          }
        </ul>
      ) : (
        <p>No licenses found</p>
      )
    }   
  </div>
  )
}