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

import { NavLink, useLoaderData } from "@remix-run/react";

import { LicenseFinder } from "../../../core/dist/index";

export const loader = () => {
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