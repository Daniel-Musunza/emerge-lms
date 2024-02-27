// import node module libraries
import React, { Fragment, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'

// import custom components
import GlobalFilter from './GlobalFilter';
import Pagination from './Pagination';

const TanstackTable = ({ data, columns, filter = false, pagination = false, filterPlaceholder, exportButton = false }) => {
    const [filtering, setFiltering] = useState('')
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
            rowSelection
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setFiltering,
        debugTable: false,
    })

    return (
        <Fragment>

            {!exportButton && filter && <div className=" overflow-hidden">
                <Row>
                    <Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
                        <GlobalFilter filtering={filtering} setFiltering={setFiltering} placeholder={filterPlaceholder} />
                    </Col>
                </Row>
            </div>}

            {exportButton && filter && <Row>
                <Col className="mb-lg-0 mb-2 ps-5 py-4">
                    <GlobalFilter filtering={filtering} setFiltering={setFiltering} placeholder={filterPlaceholder} />
                </Col>
                <Col xs="auto" className="mb-lg-0 mb-2 pe-5 py-4">
                    <Link to="#" className="btn btn-secondary">
                        Export CSV
                    </Link>
                </Col>
            </Row>}

            <div className="border-0 overflow-y-hidden">
                <Table hover responsive className="text-nowrap table-centered">
                    <thead className="table-light">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {pagination && <Pagination table={table} />}

        </Fragment>
    )
}

export default TanstackTable