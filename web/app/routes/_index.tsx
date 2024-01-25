// import { json } from "@remix-run/node";

// import { NavLink, useLoaderData } from "@remix-run/react";

// import { DataAccess } from "../../../core/dist/index";

// export const loader = () => {
//   const db = new DataAccess();

//   const licenses = db.loadLicenseMetainformations();

//   return json({licenses});
// }

export default function Index() {
    //   const { licenses } = useLoaderData<typeof loader>();
    return (
      <div className="main">
        <h1>License-Checker</h1>
        <p>This website contains a simple compatibility-checker and license-aggregator</p>
      </div>
    )
  }