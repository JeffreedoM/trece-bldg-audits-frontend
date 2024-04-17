import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schools from "./pages/Schools";
import Barangays from "./pages/Barangays";

import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/schools" element={<Schools />}></Route>
        <Route path="/barangays" element={<Barangays />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
