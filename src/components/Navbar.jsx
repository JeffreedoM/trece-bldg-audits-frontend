import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Separator } from "@/components/ui/separator";

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
          <ul className="flex items-center gap-x-6 text-sm font-semibold">
            {/* <NavLink to="/" className="text-foreground">
              Home
            </NavLink> */}

            <NavLink to="/schools" className="text-foreground">
              Schools
            </NavLink>
            <Separator orientation="vertical" />
            <div className="flex items-center gap-x-3">
              {user && (
                <>
                  <p>Hi, {user.username}!</p>
                  <Button onClick={handleClick}>Log out</Button>
                </>
              )}
              {!user && (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>

            {/* <NavLink to="/barangays" className="text-foreground">
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
