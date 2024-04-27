import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schools from "./pages/Schools";
import Barangays from "./pages/Barangays";

import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Building from "./pages/Building.tsx";
import Login from "./pages/Login.jsx";

import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route path="/building/:id" element={<Building />}></Route>
        <Route path="/schools" element={<Schools />}></Route>
        <Route path="/barangays" element={<Barangays />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
