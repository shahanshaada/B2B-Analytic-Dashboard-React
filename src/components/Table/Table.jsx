import { useState } from "react";
import "./Table.css";

const PAGE_SIZE = 5;

export default function Table({
  data = [],
  columns = [],
  searchPlaceholder = "Search...",
  pageSize = PAGE_SIZE
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);

  function getValue(row, column) {
    if (column.accessor) return column.accessor(row);
    return row[column.key];
  }

  //filter rows by search text
  let rows = data;
  if (search.trim()) {
    const query = search.trim().toLowerCase();
    rows = rows.filter((row) =>
      columns.some((col) => String(getValue(row, col) ?? "").toLowerCase().includes(query))
    );
  }

  // sort the filtered rows
  if (sortKey) {
    const column = columns.find((c) => c.key === sortKey);
    if (column) {
      rows = [...rows].sort((a, b) => {
        const valueA = getValue(a, column);
        const valueB = getValue(b, column);

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
        }
        const result = String(valueA).localeCompare(String(valueB));
        return sortDirection === "asc" ? result : -result;
      });
    }
  }

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function toggleSort(column) {
    if (!column.sortable) return;
    if (sortKey === column.key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(column.key);
      setSortDirection("asc");
    }
  }

  function getSortArrow(column) {
    if (!column.sortable) return null;
    if (sortKey !== column.key) return <span className="sort-arrow"> ↕</span>;
    const arrow = sortDirection === "asc" ? " ↑" : " ↓";
    return <span className="sort-arrow is-active">{arrow}</span>;
  }

  return (
    <div className="table-box">
      <input
        type="text"
        className="table-search"
        placeholder={searchPlaceholder}
        value={search}
        onChange={handleSearchChange}
      />

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col)}
                  className={col.sortable ? "is-sortable" : ""}
                >
                  {col.label}
                  {getSortArrow(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="empty-cell">
                  No results found.
                </td>
              </tr>
            )}
            {pageRows.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row) : getValue(row, col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}