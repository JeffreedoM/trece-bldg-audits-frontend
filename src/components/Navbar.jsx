import { Link, NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background shadow">
      <div className="wrapper flex h-[70px] items-center justify-between">
        <Link to="/">
          <h1 className="text-lg font-semibold text-primary">
            Building Audits
          </h1>
        </Link>
        <div className="flex gap-x-20">
          <ul className="flex items-center gap-x-12 text-sm font-semibold uppercase">
            <NavLink to="/">Buildings</NavLink>
            <NavLink to="/schools">Schools</NavLink>
            <NavLink to="/barangays">Barangays</NavLink>
          </ul>
          {/* <Button>Login</Button> */}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
