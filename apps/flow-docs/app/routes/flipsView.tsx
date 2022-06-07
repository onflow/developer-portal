import { fetchFlipsCellProps } from "~/api/fetchFlips";

export default function FlipsView() {
  const flips = fetchFlipsCellProps();
  return (
    <div>
      <h1>FLIPS</h1>
      <div className="w-full">
        {flips.map((flip) => (
          <li id="user-content-fn-1" key={flip.forumLink}>
            Link: {flip.forumLink} - {flip.heading} - {flip.numComments}
          </li>
        ))}
      </div>
    </div>
  );
}
