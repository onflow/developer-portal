import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

export type SearchProps = {
    siteName: string,
    apiKey: string,
    indexName: string
}

export function Search({siteName, apiKey, indexName}: SearchProps) {
  return (
    <DocSearch
      appId="R2IYF7ETH7"
      indexName="docsearch"
      apiKey="599cec31baffa4868cae4e79f180729b"
    />
  );
}