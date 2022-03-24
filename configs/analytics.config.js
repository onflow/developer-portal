import googleAnalytics from "@analytics/google-analytics";

import Analytics from "analytics";

/* Initialize analytics */
const analytics = Analytics({
  app: "my-app-name",
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: "UA-000000000"
    })
  ]
});

export default analytics;
