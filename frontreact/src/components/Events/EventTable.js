import React, { useState, useMemo } from 'react';
import "./EventTable.css"; 
import Pagination from "./Pagination"
import { useNavigate } from 'react-router-dom';
let PageSize = 25;
export const EventTable = ({ events }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo((events) => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return events.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    const navigate = useNavigate();
    const handleEventDetails = (id) => {
        navigate(`/${id}`);
    }

    return (
        <div className="px-3" >
            <table className="table table-striped table-dark">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Latitud</th>
                        <th scope="col">Longitud</th>
                        <th scope="col">Locación</th>
                        <th scope="col">Mensaje</th>
                        <th scope="col">Level</th>
                        <th scope="col"> Details</th>
                    </tr>
                    {
                        currentTableData.map(event =>
                            <tr>
                                <td>{ event.id }</td>
                                <td>{ event.type }</td>
                                <td>{ event.lat }</td>
                                <td>{ event.lon }</td>
                                <td>{ event.location }</td>
                                <td>{ event.message }</td>
                                <td>{ event.level }</td>
                                <td><button className="btn btn-link"
                                    onClick={ handleEventDetails(event.id) }
                                    >
                                    Ver detalles
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={events.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}

export default EventTable;