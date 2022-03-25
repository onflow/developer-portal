import googleAnalytics from "@analytics/google-analytics";

import Analytics from "analytics";

/* Initialize analytics */
const analytics = Analytics({
  app: "my-app-name",
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID
    })
  ]
});

export default analytics;
