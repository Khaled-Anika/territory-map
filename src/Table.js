import React, { useEffect } from "react";
import { useState } from 'react';
import { useFilters, useTable } from "react-table";

export default function Table({ columns, data, sendData }) {
    const [filterInput, setFilterInput] = useState("");
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter
    } = useTable({
        columns,
        data
    }, useFilters);

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("postCode", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    useEffect(() => {
        console.log("updated searched data", rows.map(row => row.values));
        sendData(rows.map(row => row.values));
    }, [rows]);

    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <>
            <input style={{ width: '100%', marginTop: '20px' }}
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />
            <table {...getTableProps()} className='table'>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                    {!rows || rows.length <= 0 && (
                        <tr>
                            <td colSpan={2}>No areas selected yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}