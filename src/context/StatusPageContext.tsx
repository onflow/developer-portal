import React, { createContext, useState } from "react";
import useSWR from "swr";

export const MAINNET = "mainnet";
export const TESTNET = "testnet";
export const CANARYNET = "canarynet";
export const HEALTHY = "HEALTHY";
export const DEGRADED = "DEGRADED";
export const UNAVAILABLE = "UNAVAILABLE";
export const UNDER_MAINTENANCE = "UNDER MAINTENANCE";
export const FORUM_ADDRESS = "https://forum.onflow.org/t/";
export const MAINNET_STATUSPAGE_ID = "fqvhhbc3hdw8";
export const TESTNET_STATUSPAGE_ID = "g9d7vtywpdfq";
export const CANARYNET_STATUSPAGE_ID = "s4z9n7p9pm3s";
export const STATUSPAGE_API_URL =
  "https://api.statuspage.io/v1/pages/ytw5bdg6zr13/components";
export const BREAKING_CHANGES_RESOURCE =
  "https://forum.onflow.org/c/announcements/breaking-changes/30.json";
export const MAINNET_SPORK =
  "https://forum.onflow.org/c/mainnet-sporks/36.json";

export const statusPageStatuses = {
  operational: HEALTHY,
  degraded_performance: UNDER_MAINTENANCE,
  partial_outage: UNAVAILABLE,
  major_outage: UNAVAILABLE,
  under_maintenance: UNDER_MAINTENANCE
};

export const StatusContext = createContext({
  mainnetStatus: "loading",
  testnetStatus: "loading",
  canaryNetStatus: "loading"
});

function getStatusValues(status) {
  if (status && !status.error) {
    return {
      mainnetStatus: status?.filter((s) => s.id === MAINNET_STATUSPAGE_ID)[0]
        .status,
      testnetStatus: status?.filter((s) => s.id === TESTNET_STATUSPAGE_ID)[0]
        .status,
      canaryNetStatus: status?.filter(
        (s) => s.id === CANARYNET_STATUSPAGE_ID
      )[0].status
    };
  }

  return {
    mainnetStatus: "No connection",
    testnetStatus: "No connection",
    canaryNetStatus: "No connection"
  };
}

export const StatusContextProvider = (props) => {
  const [status, setStatus] = useState(null);

  useSWR(
    `${STATUSPAGE_API_URL}`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `OAuth ${process.env.GATSBY_STATUSPAGE_API_KEY}`
        }
      }).then((r) => r.json()),
    {
      refreshInterval: 100000,
      onSuccess: (result) => {
        setStatus(result);
      }
    }
  );

  const values = getStatusValues(status);

  return (
    <StatusContext.Provider value={values}>
      {props.children}
    </StatusContext.Provider>
  );
};
