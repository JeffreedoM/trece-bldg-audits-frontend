import AddButton from "../components/AddButton";
import BldgForm from "../components/BldgForm";
import Buildings from "../components/Buildings";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        Home
        <div className="mx-auto grid grid-cols-4 gap-4">
          <Buildings />
          <Buildings />
          <Buildings />
          <Buildings />
          <Buildings />
        </div>
      </div>
      <Dialog>
        <DialogTrigger>
          <AddButton />
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Building</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <BldgForm />
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
