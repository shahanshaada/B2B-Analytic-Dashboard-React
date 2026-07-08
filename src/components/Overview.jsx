import MetricCards from "./MetricCards.jsx";
import Chart from "./Chart/Chart.jsx";
import Table from "./Table/Table.jsx";
import { useEffect, useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 5200 },
  { month: "Feb", revenue: 6100 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 7300 },
  { month: "May", revenue: 6900 },
  { month: "Jun", revenue: 8100 },
  { month: "Jul", revenue: 9100 },
  { month: "Aug", revenue: 8500 },
];

const userColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  {
    key: "company",
    label: "Company",
    sortable: true,
    accessor: (row) => row.company?.name,
    render: (row) => row.company?.name,
  },
  {
    key: "city",
    label: "City",
    sortable: true,
    accessor: (row) => row.address?.city,
    render: (row) => row.address?.city,
  },
];

export default function Overview() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setUsers(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MetricCards />

      <Chart
        title="Revenue by Month"
        data={revenueData}
        xKey="month"
        yKey="revenue"
      />

      {loading && <p className="state-message">Loading data...</p>}
      {error && (
        <p className="state-message state-message-error">Error: {error}</p>
      )}
      {!loading && !error && (
        <Table
          data={users || []}
          columns={userColumns}
          searchPlaceholder="Search by name..."
        />
      )}
    </>
  );
}
