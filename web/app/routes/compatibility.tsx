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

import { Link, useLoaderData } from "@remix-run/react";

import { MetaInformation, LicenseFinder, Checker, CompatibilityCheckResult} from "../../../core/dist/index";
import { FunctionComponent } from "react";

export const loader = () => {
  const finder = new LicenseFinder();
  const metaInformations = finder.getLicenses().map((license) => license.metaInformation);

  const checker = new Checker();
  const fullCheck = checker.runCompatibilityChecks();

  return json({ metaInformations, fullCheck });
}

const findResult = (results: CompatibilityCheckResult[], name1: string, name2: string) => {
  let result = results.find((result) => (
    result.name1 == name1 && result.name2 == name2
  ));

  return result;
}

export default function Compatibility() {
  const { metaInformations, fullCheck } = useLoaderData<typeof loader>();
  
  return (
    <div className="main">
      <h2>License-Compatibility</h2>
      <p>This part of the website shows how different licenses are compatible with each other.</p>
      <p>This check compares if two licenses are compatible.</p>

      <CompatibilityTable metaInformations={metaInformations} results={fullCheck}/>

      <h3>Legend</h3>
      {
        metaInformations.length? (
          <ul>
            {metaInformations.map((info) => (
              <li key={info.id}>{`${info.id} - ${info.name}`}</li>
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

const CompatibilityTable: FunctionComponent<{
  metaInformations: MetaInformation[]
  results: CompatibilityCheckResult[]
}> = ({ metaInformations, results }) => {

  if (metaInformations.length <= 0 || results.length <= 0) {
    return (<p>No compatibility results found!</p>);
  }

  return (
    <table className="license-compatibility-table">
      <tr>
        <th className="license-compatibility-table-entry"></th>
        {metaInformations.map((metaInformation) => (
          <th className="license-compatibility-table-entry">{metaInformation.id}</th>
        ))}
      </tr>
      {metaInformations.map((metaInformation1) => (
        <tr>
          <td className="license-compatibility-table-entry">{metaInformation1.id}</td>
          {metaInformations.map((metaInformation2) => (
            <CompatibilityTableEntry result={findResult(results, metaInformation1.name, metaInformation2.name)} />
          ))}
        </tr>
      ))}
    </table>
  );
}

const CompatibilityTableEntry: FunctionComponent<{
  result: CompatibilityCheckResult | undefined
}> = ({ result }) => {

  if (result == null) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-unknown">?</td>);
  }

  if (result.lessRestrictive && result.canBeComposed && result.allowCombination) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-valid">✓</td>);
  }

  if (result.canBeComposed && result.allowCombination) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-composable">✓</td>);
  }

  return (<td className="license-compatibility-table-entry license-compatibility-table-invalid">✕</td>);
}