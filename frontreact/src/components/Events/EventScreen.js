import React, { useEffect, useState } from 'react';
import api from '../../api';
import EventTable from './EventTable';


export const EventScreen = () => {
    const [events, setEvents]= useState([]);

    const peticionGet=async()=>{
        await api.get('maps/')
            .then(response=>{
                setEvents(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
            
    useEffect(()=>{
        peticionGet();
        },[])
    

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
            {events.length !== 0?
            <EventTable events={ events } />
            :
            <h1>No hay eventos aun</h1>}
        </div>
    )
}

export default EventScreen;