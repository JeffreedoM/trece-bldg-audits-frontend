import { useEffect, useReducer, useState } from "react";
import AddButton from "../components/AddButton";
import BldgForm from "../components/BldgForm";
import Buildings from "../components/Buildings";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBuildingsContext } from "../hooks/useBuildingsContext";
import axios from "../../api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Home() {
  const [openAddBldgForm, setOpenAddBldgForm] = useState(false);
  const { buildings, dispatch } = useBuildingsContext();

  useEffect(() => {
    axios
      .get("/", {})
      .then((response) => {
        dispatch({ type: "SET_BUILDINGS", payload: response.data });
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [buildings]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the buildings based on the search query
  const filteredBuildings = buildings
    ? buildings.filter((building) =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <>
      <Navbar />

      <div className="wrapper pt-6">
        <Input
          type="text"
          placeholder="Search building name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-8 w-full rounded-md border border-gray-300 p-4 py-5 shadow-md"
        />
        {filteredBuildings.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredBuildings.map((building) => (
              <Link key={building._id} to={`/building/${building._id}`}>
                <Buildings building={building} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
      <Dialog open={openAddBldgForm} onOpenChange={setOpenAddBldgForm}>
        <DialogTrigger>
          <AddButton />
        </DialogTrigger>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="max-h-[95vh] w-full max-w-2xl overflow-auto"
        >
          <DialogHeader>
            <DialogTitle>Add Building</DialogTitle>
          </DialogHeader>
          <BldgForm
            openAddBldgForm={openAddBldgForm}
            setOpenAddBldgForm={setOpenAddBldgForm}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
