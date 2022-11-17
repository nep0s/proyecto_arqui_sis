
import React, { useEffect, useState, useMemo } from 'react';
import api from '../../api';
import EventTable from './EventTable';
import LoginButton from '../Auth/LogInButton';
import LogOutButton from '../Auth/LogOutButton';
import Profile from '../Auth/Profile';
import { useNavigate } from 'react-router-dom';


import { useAuth0 } from "@auth0/auth0-react";


const handlePermissions = () => {      
  try {

    const tokenChat = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MTY2ODUzOTU0Nywic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg0NTMxNDd9.hrR1aHXym6zUb0YFvc-Pv_XJk_Esjz6MymeLatJxiEo'
// en postman este link no nos funciono funciono solo el con fecha
    const UUID = "a5eb3a26-6451-11ed-81ce-0242ac120002" ; //hardcodeado por ahora 
    const permissionsUrl = `http://localhost:7777/rooms/1/members/`;
    fetch(permissionsUrl, {
      method: "PUT",
      mode: 'cors',
      body: JSON.stringify({
        "userUUID": UUID,
        "permissions":"rw",
        "level":100
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenChat}`,
      },
    })
    .then(response => response.json(), console.log("response"))
    
    .then(data => {
      let permission = data.url; console.log("permission")
      });
  } catch (e) {
    console.log("error");
    console.log(e.message);
    


  }
  
};
console.log(handlePermissions())


const getToken = async (getAccessTokenSilently) => {
  try {
    const accessToken = await getAccessTokenSilently({
      audience: `http://proyecto-base-grupo-24-web-1:8000`
    });
    return accessToken

  } catch (e) {
    console.log(e.message);
  }
}

const getEvents = async (events, setEvents, token) => {
  const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";

  // get acces token

  try {
    //const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzVkNjY0MTc0MzNmNGIxMzM2ZDcxOGEiLCJhdWQiOlsiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImh0dHBzOi8vZGV2LXE4ZnJ2ZG95cHIyYTB4ZjMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2ODA5NDc5NiwiZXhwIjoxNjcwNjg2Nzk2LCJhenAiOiJWTlZ6M2E5bHlVdXhlM1hEaXBqTXdDNTRPcGpNd084ayIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpldmVudHMifQ.Ozr424VaHnqM56deM3iCYfV6eEN8hVi0Ixmz6WeOrDgAEpH5KWjIXHdCq1lvY9ayyQAS13EkaGzM2MfXJzKYN4QYcuHERFAJxsE_YWIgqUrbebkKpHopbXlZaNPI2XPeWq68RswRtXl3Ldc50ItBDcK5Ck97vVA4mQnZlDNePJ0Kwy3ljrkqDe5K_E3Xj9aki6MB2aH28x1HSUm8K0_BlFnD1wO9IabSw6AalemlC_PDqEuGrwjpd2M7C9ceQ2bN3cuROWkHsjSL4C0EgIU7GRpXw9dPQuEnWG4VINTdH5plKad3qIVKSQaoH5mbVGqzeZ69TSeD2PUqBQa1VswT8w'
    //const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzVkNjY0MTc0MzNmNGIxMzM2ZDcxOGEiLCJhdWQiOlsiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImh0dHBzOi8vZGV2LXE4ZnJ2ZG95cHIyYTB4ZjMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2ODY5Njc5NywiZXhwIjoxNjcxMjg4Nzk3LCJhenAiOiJWTlZ6M2E5bHlVdXhlM1hEaXBqTXdDNTRPcGpNd084ayIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpldmVudHMifQ.uYNYks_yYaP46PfQQ-3DGEnTLXjOlxqDzemCbGfBHiDyuSoM32lF-jwrB8Jpa4PteUO5pqesEbsg2B-neS9Kdx15g84wB-DO6_gQkUbUQOo6-DGtg17ezRdX6OC50hL5IgQcx5cyIGbAWawlciR7Da2BoyqQpr6bZNmQVRMfsdHTcC2WFxorcetVJAA9jYyM4axvZAgtLxXSoSL6U0u54NH2JetHrZwIMw9ywJ-NtC68XWvBf_RLx8JRAKdFeeL6Sa0Go4yer3_IKcVNvfjw6elKLUBWM8DYib4O4kaViTt0rMgNOcxslAMcwZ1Y6LZs7_MwY-KEpYlU_zJbxeO4fA'

    const eventsUrl = 'https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events';
    //const eventsUrl = 'http://localhost:9000/maps/';
    //console.log(token)

    fetch(eventsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    /* Para ver errores:
    .then(response => response.text())
    .then(data => console.log(data))
    */
    
    .then(response => response.json())
    .then(data => {
      let _events = data.body;
      setEvents(_events);
      });
    

  } catch (e) {
    console.log(e.message);
  }
};


export const EventScreen = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [events, setEvents]= useState([]);
    const navigate = useNavigate();

    useMemo(() => {
      if (isAuthenticated) {
        getToken(getAccessTokenSilently).then(token => {
          
          getEvents(events, setEvents, token);
        });
      }
    }, [isAuthenticated])
    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
            {isAuthenticated?
            <button className="btn btn-link"
            onClick={ () => {navigate(`/chat/1`) }}
            >
            Ir a sala de Chat General 
            </button>
            :
            <h1>Registrate para chatear</h1>}
            {events.length !== 0?
            <EventTable events={ events } />
            :
            <h1>No hay eventos aun</h1>}
        </div>
    )
}

export default EventScreen;