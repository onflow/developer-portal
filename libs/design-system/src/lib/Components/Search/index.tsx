import { DocSearch } from '@docsearch/react';
import '../../../../styles/docsearch.css';

export type SearchProps = {
  indexName: string;
  placeholder?: string;
};

export function Search({ placeholder, indexName }: SearchProps) {
  const placeholderVal = placeholder ?? 'Search Documentation';
  const indexNameVal = indexName ?? 'search-index';
  return (
    /* TODO: Replace the testing credentials with real keys using .env and dotenv package */
    <DocSearch
      appId="R2IYF7ETH7" // Testing Credentials
      apiKey="599cec31baffa4868cae4e79f180729b" // Testing Credentials
      indexName={indexNameVal}
      placeholder={placeholderVal}
    />
  );
}
