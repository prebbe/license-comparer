import { json } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";

import { CompatibilityChecker, DataAccess, License, LicenseCompatibilityCheckResult } from "../../../core/dist/index";
import { FunctionComponent } from "react";

export const loader = () => {
  const dataAccess = new DataAccess();
  const licenses = dataAccess.loadLicenseMetainformations();

  const checker = new CompatibilityChecker();

  const partialCheck = checker.runFullCompatibilityCheck();

  return json({licenses, partialCheck});
}

const findResult = (results: LicenseCompatibilityCheckResult[], id1: number, id2: number) => {
  let result = results.find((result) => (
    result.license1.metaInformation.id == id1 && 
    result.license2.metaInformation.id == id2
  ));

  return result;
}

export default function Compatibility() {
  const { licenses, partialCheck } = useLoaderData<typeof loader>();
  
  return (
    <div className="main">
      <Link to={`/compatibility`} className="go-back-link">← Go back</Link>
      <h3>Partial-Compatibility-Check</h3>
      <p>This check compares if two licenses have some common permissions and could potentially be aggregated.</p>
      <CompatibilityTable licenses={licenses} results={partialCheck}/>
    </div>  
  )
}

const CompatibilityTable: FunctionComponent<{
  licenses: License[]
  results: LicenseCompatibilityCheckResult[]
}> = ({ licenses, results }) => {

  if (licenses.length <= 0 || results.length <= 0) {
    return (<p>No compatibility results found!</p>);
  }

  return (
    <table className="license-compatibility-table">
      <tr>
        <th className="license-compatibility-table-entry"></th>
        {licenses.map((license) => (
          <th className="license-compatibility-table-entry">{!license.shortName ? license.name : license.shortName}</th>
        ))}
      </tr>
      {licenses.map((license1) => (
        <tr>
          <td className="license-compatibility-table-entry">{!license1.shortName ? license1.name : license1.shortName}</td>
          {licenses.map((license2) => (
            <CompatibilityTableEntry result={findResult(results, license1.id, license2.id)} />
          ))}
        </tr>
      ))}
    </table>
  );
}

const CompatibilityTableEntry: FunctionComponent<{
  result: LicenseCompatibilityCheckResult | undefined
}> = ({ result }) => {

  if (result == null) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-unknown">?</td>);
  }

  if (result.verdict) {
    return (<td className="license-compatibility-table-entry license-compatibility-table-valid">✓</td>);
  }

  return (<td className="license-compatibility-table-entry license-compatibility-table-invalid">✕</td>);
}