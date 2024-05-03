import { useParams, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Buildings from "../components/Buildings";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

function School() {
  const { id } = useParams();

  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    axios
      .get("/getBldgsBySchool", {
        params: {
          school: id,
        },
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
      })
      .then((response) => {
        console.log(response.data);
        setBuildings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wrapper pt-4">
      <div className="w-full rounded-md bg-muted p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/schools">Schools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-auto mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {buildings &&
          buildings.map((building) => (
            <Link key={building._id} to={`/building/${building._id}`}>
              <Buildings building={building} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default School;
