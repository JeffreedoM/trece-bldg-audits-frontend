import { columns } from "../components/schools/columns";
import { SchoolTable } from "../components/schools/table";

function getData() {
  // Fetch data from your API here.
  return [
    {
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

function Schools() {
  const data = [
    {
      id: 1,
      school: "Sample School",
    },
    {
      id: 2,
      school: "2 Sample School",
    },
  ];

  return (
    <div className="wrapper">
      Schools
      <SchoolTable columns={columns} data={data} />
    </div>
  );
}

export default Schools;
