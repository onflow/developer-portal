import React from "react"
import { DocSearch } from '@docsearch/react';
import '../../../../styles/docsearch.css';

export type SearchProps = {
  appId: string;
  apiKey: string;
  indexName: string;
};

export function Search({ appId, apiKey, indexName }: SearchProps) {
  return (
    <DocSearch
      appId="QE0LM9XKDG"
      indexName="search-index"
      apiKey="74700aee1bcb782c019adc7bc92fde31"
      placeholder="Search Documentation..."
    />
  );
}
