import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';
export const EventDetailsScreen = () => {
    const [event, setEvent]= useState([]);
    const { id } = useParams();
    const peticionGet=async()=>{
        await api.get(`maps/${id}`)
            .then(response=>{
                setEvent(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
    useEffect(()=>{
        peticionGet();
        },[])
    

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
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
                    </tr>
                    <tr>
                        <td>{ event.id }</td>
                        <td>{ event.type }</td>
                        <td>{ event.lat }</td>
                        <td>{ event.lon }</td>
                        <td>{ event.location }</td>
                        <td>{ event.message }</td>
                        <td>{ event.level }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EventDetailsScreen;