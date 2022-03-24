import { useFlags } from "@happykit/flags/client";

export default function Home() {
  const { flags } = useFlags();
  console.log(flags);
  return (
    <div>
      <main>Hello Next Docs</main>
      {flags && flags.hello && <p>Flagged: Local</p>}
    </div>
  );
}
