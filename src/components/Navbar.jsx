import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./ModeToggle.tsx";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <nav className="fixed top-0 z-10 w-full bg-background shadow">
      <div className="wrapper flex h-[70px] items-center justify-between">
        <Link to="/">
          <h1 className="text-lg font-semibold text-primary">
            Building Audits
          </h1>
        </Link>
        <div className="flex gap-x-10">
          <ul className="flex items-center gap-x-12 text-sm font-semibold uppercase">
            <NavLink to="/" className="text-foreground">
              Home
            </NavLink>
            {user && (
              <>
                <p>{user.email}</p>
                <Button onClick={handleClick}>Log out</Button>
              </>
            )}
            {!user && (
              <Link to="/login">
                <Link to={"/login"}>Login</Link>
              </Link>
            )}
            {/* <NavLink to="/schools" className="text-foreground">
              Schools
            </NavLink>
            <NavLink to="/barangays" className="text-foreground">
              Barangays
            </NavLink> */}
          </ul>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
