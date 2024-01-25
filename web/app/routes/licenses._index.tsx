import { json } from "@remix-run/node";

import { NavLink, useLoaderData } from "@remix-run/react";

import { DataAccess } from "../../../core/dist/index";

export const loader = () => {
  const db = new DataAccess();

  const licenses = db.loadLicenseMetainformations();

  return json({licenses});
}

export default function Licenses() {
  
  const { licenses } = useLoaderData<typeof loader>();
  return (
  <div>
    <h2>License Overview</h2>
    {
      licenses.length? (
        <ul>
          {licenses.map((license) => (
            <li key={license.id}>
              <NavLink
              className={({ isActive, isPending }) =>
                isActive
                ? "active"
                : isPending
                ? "pending"
                : ""
              }
              to={`/licenses/${license.id}`}>
                {(license.shortName && license.shortName != '') ? license.shortName : license.name}
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