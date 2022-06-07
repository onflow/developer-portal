
export type MainNavProps = {
    toggleTheme(): void
};

function MainNav({ toggleTheme }: MainNavProps) {
    return (
      <nav className="flex px-4 py-6">
        <div>flow docs</div>
        <button onClick={toggleTheme} className="ml-auto">
          Toggle Dark Mode
        </button>
      </nav>
    );
  }


export default MainNav;
