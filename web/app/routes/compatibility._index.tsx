import { Link } from "@remix-run/react";

export default function Compatibility() {
  return (
      <div className="main">
        <h2>License-Compatibility</h2>
        <p>This part of the website shows how different licenses are compatible with each other.</p>
        <p>View full compatibility check-results: <Link to={`/compatibility/full`}>View Results</Link></p>
        <p>View partial check-results: <Link to={`/compatibility/partial`}>View Results</Link></p>
        <p>View compatibility checks v2: <Link to={`/compatibility/v2`}>View Results</Link></p>
      </div>
  )
}