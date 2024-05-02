import { columns } from "../components/schools/columns";
import { SchoolTable } from "../components/schools/table";
import { schools } from "../data/data";
import axios from "../../api/axios";
import { useState, useEffect } from "react";

function Schools() {
  // const data = [];
  // schools.forEach((school, index) => {
  //   data.push({
  //     id: index, // Increment the index to avoid duplicate ids
  //     school: school.label, // Push the label of the school from the schools array
  //   });
  // });

  const [data, setData] = useState([]); // Initialize state with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/schoolsWithCount");
        const extractedData = response.data; // Extract the inner array
        setData(extractedData); // Update state with extracted data
      } catch (error) {
        console.error(error);
        setData([]); // Set data to an empty array if there's an error
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  console.log(data);

  return (
    <div className="wrapper">
      <SchoolTable columns={columns} data={data} />
    </div>
  );
}

export default Schools;
