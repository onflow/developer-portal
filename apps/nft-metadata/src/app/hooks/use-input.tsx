import { useState } from "react";

export function useInput() {
    const [value, setValue] = useState("");
    const input = <input value={"bob"} onChange={e => console.log('val is', e.target.value)} type="text" />;
    return [value, input];
  }