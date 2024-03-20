import { json } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";

import { MetaInformation, LicenseFinder, SingleCheckResult, Checks } from "../../../core/dist/index";
import { FunctionComponent } from "react";

export const loader = () => {
  const finder = new LicenseFinder();
  const metaInformations = finder.getLicenses().map((license) => license.metaInformation);

  const checks = new Checks();
  const fullCheck = checks.runCompatibilityChecks();

  return json({ metaInformations, fullCheck });
}

const findResult = (results: SingleCheckResult[], name1: string, name2: string) => {
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
    </div>
  )
}

const CompatibilityTable: FunctionComponent<{
  metaInformations: MetaInformation[]
  results: SingleCheckResult[]
}> = ({ metaInformations, results }) => {

  if (metaInformations.length <= 0 || results.length <= 0) {
    return (<p>No compatibility results found!</p>);
  }

  return (
    <table className="license-compatibility-table">
      <tr>
        <th className="license-compatibility-table-entry"></th>
        {metaInformations.map((metaInformation) => (
          <th className="license-compatibility-table-entry">{!metaInformation.spdxName ? metaInformation.name : metaInformation.spdxName}</th>
        ))}
      </tr>
      {metaInformations.map((metaInformation1) => (
        <tr>
          <td className="license-compatibility-table-entry">{!metaInformation1.spdxName ? metaInformation1.name : metaInformation1.spdxName}</td>
          {metaInformations.map((metaInformation2) => (
            <CompatibilityTableEntry result={findResult(results, metaInformation1.spdxName, metaInformation2.spdxName)} />
          ))}
        </tr>
      ))}
    </table>
  );
}

const CompatibilityTableEntry: FunctionComponent<{
  result: SingleCheckResult | undefined
}> = ({ result }) => {

  if (result == null) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-unknown">?</td>);
  }

  if (result.result) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-valid">✓</td>);
  }

  return (<td className="license-compatibility-table-entry license-compatibility-table-invalid">✕</td>);
}