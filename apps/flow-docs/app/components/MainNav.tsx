import { Theme, useTheme } from "~/utils/ThemeProvider";

export default function MainNav() {
  // const [, setTheme] = useTheme();

  const toggleTheme = () => {
    // setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <nav className="flex py-6 px-4">
      <div>flow docs</div>
      <button onClick={toggleTheme} className="ml-auto">
        Toggle Dark Mode
      </button>
    </nav>
  );
}
