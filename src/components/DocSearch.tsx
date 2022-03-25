import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

function App() {
  return (
    <DocSearch
      appId="YOUR_APP_ID"
      indexName="YOUR_INDEX_NAME"
      apiKey="YOUR_SEARCH_API_KEY"
    />
  );
}

export default App;
