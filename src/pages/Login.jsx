import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="wrapper flex min-h-[90vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-lg flex-col justify-center rounded-lg bg-white p-10"
      >
        <h1 className="mb-6 text-center text-xl font-semibold">Log In</h1>
        <div className="mb-4 flex flex-col">
          <label htmlFor="" className="mb-1 text-sm font-semibold">
            Email
          </label>
          <Input
            type="email"
            placeholder="sample@gmail.com"
            value={email}
            className="rounded border border-gray-500 p-3 px-4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="" className="mb-1 text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="●●●●●●"
              value={password}
              className="w-full rounded border border-gray-500 p-3 px-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? "Show" : "Hide"}
            </button>
          </div>
        </div>
        {error && <div className=" text-red-500">{error}</div>}
        <Button disabled={isLoading}>Log In</Button>
        {/* <p className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link
            to={"/login"}
            className="border-b-2 border-blue-600 font-semibold text-blue-600"
          >
            Login
          </Link>
        </p> */}
      </form>
    </div>
  );
}

export default Login;
