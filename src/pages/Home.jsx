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

export default function Home() {
  const [openAddBldgForm, setOpenAddBldgForm] = useState(false);
  const { buildings, dispatch } = useBuildingsContext();

  useEffect(() => {
    axios
      .get("/", {})
      .then((response) => {
        dispatch({ type: "SET_BUILDINGS", payload: response.data });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        Home
        <div className="mx-auto grid grid-cols-4 gap-4">
          {buildings &&
            buildings.map((building) => {
              return <Buildings key={building._id} building={building} />;
            })}
        </div>
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
