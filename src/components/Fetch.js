import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";

import Data from "./Data.json";
import Search from "./Search";
import Chart from "./Chart";

function Fetch() {
  const data = useMemo(
    () => [
      {
        col1: Data[0].Name,
        col2: Data[0].Description,
        col3: Data[0].Address,
        col4: Data[0].MarketCapitalization,
        col5: Data[0].DividendYield,
      },
      {
        col1: Data[1].Name,
        col2: Data[1].Description,
        col3: Data[1].Address,
        col4: Data[1].MarketCapitalization,
        col5: Data[2].DividendYield,
      },
      {
        col1: Data[2].Name,
        col2: Data[2].Description,
        col3: Data[2].Address,
        col4: Data[2].MarketCapitalization,
        col5: Data[2].DividendYield,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Description",
        accessor: "col2",
      },
      {
        Header: "Address",
        accessor: "col3",
      },
      {
        Header: "Dividend Yield",
        accessor: "col4",
      },
      {
        Header: "Market Capitalization",
        accessor: "col5",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <>
      <Search filter={globalFilter} setFilter={setGlobalFilter} />
      <Chart />
      <div>
        <table {...getTableProps()} style={{ margin: "40px 20px" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      color: "black",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Fetch;
