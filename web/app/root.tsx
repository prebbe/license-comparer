import {
  NavLink,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import appStylesHref from "./app.css";
import licensesStylesHref from "./license.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: licensesStylesHref }
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>License-Checker</h1>
          <nav>
            <ul>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                  isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
                  }
                  to={`/`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                className={({ isActive, isPending }) =>
                  isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
                  }
                  to={`/licenses`}>
                  License-Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                    }
                    to={`/pipeline`}>
                  Pipeline-Simulation
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                    }
                    to={`/compatibility`}>
                  Compatibility-Check
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                    }
                    to={`/aggregation`}>
                  License-Aggregation
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet/>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
