export function InternalPage() {
  return (
    <div className="mdx-content">
      <table>
        <thead>
          <tr>
            <th align="left">Node Operator</th>
            <th align="left">SDKs</th>
            <th align="left">TOOLS</th>
            <th align="left">Left-aligned</th>
            <th align="center">Center-aligned</th>
            <th align="right">Right-aligned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">git status</td>
            <td align="center">git status</td>
            <td align="right">git status</td>
          </tr>
          <tr>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">Text</td>
            <td align="left">git diff</td>
            <td align="center">git diff</td>
            <td align="right">git diff</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
