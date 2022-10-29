import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import EventTable from './EventTable';
import LoginButton from '../Auth/LogInButton';
import LogOutButton from '../Auth/LogOutButton';
import Profile from '../Auth/Profile';

import { useAuth0 } from "@auth0/auth0-react";




export const EventScreen = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [events, setEvents]= useState([]);

    const getEvents = async () => {
        const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";
    
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `http://proyecto-base-grupo-24-web-1:8000`,
            scope: "read:events",
          });
    
          const EventsUrl = `http://proyecto-base-grupo-24-web-1:9000/maps/`;
    
          fetch(EventsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then(data => {
            setEvents(data)
          });
    
    
        } catch (e) {
          console.log(e.message);
        }
      };

    
    const peticionGet=async()=>{
        await api.get('events/')
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
            <LoginButton/>
            <LogOutButton/>
            <Profile/>
        </div>
    )
}

export default EventScreen;