export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-8">
        <div className="flex-1">
          <a className="text-xl ">correctQ</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>History</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
