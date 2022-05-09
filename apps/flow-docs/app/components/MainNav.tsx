import { Theme, useTheme } from "~/utils/ThemeProvider";

export default function MainNav() {
  const [, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <nav className="">
      <div>flow docks</div>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
    </nav>
  );
}
