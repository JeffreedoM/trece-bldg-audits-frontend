import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-background fixed top-0 w-full shadow">
      <div className="wrapper flex h-[70px] items-center justify-between">
        <h1 className="text-primary text-lg font-semibold">Building Audits</h1>
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
