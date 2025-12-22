export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-8 fixed top-0 ">
        <div className="flex-1">
          <a className="text-4xl font-bold">correctQ</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-4 items-center">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>History</a>
            </li>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content bg-base-300 rounded-box z-1 w-26 p-2 shadow-2xl"
              >
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Default"
                    value="default"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Retro"
                    value="retro"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Forest"
                    value="forest"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Valentine"
                    value="valentine"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Aqua"
                    value="aqua"
                  />
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
