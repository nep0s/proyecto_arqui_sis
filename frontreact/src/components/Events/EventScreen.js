
import React, { useEffect, useState, useMemo } from 'react';
import api from '../../api';
import EventTable from './EventTable';
import LoginButton from '../Auth/LogInButton';
import LogOutButton from '../Auth/LogOutButton';
import Profile from '../Auth/Profile';

import { useAuth0 } from "@auth0/auth0-react";


const getToken = async (getAccessTokenSilently) => {
  try {
    const accessToken = await getAccessTokenSilently({
      audience: `http://proyecto-base-grupo-24-web-1:8000`
    });
    console.log(accessToken)

  } catch (e) {
    console.log(e.message);
  }
}
const getEvents = async (events, setEvents) => {
  const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";

  // get acces token

  try {
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzVkNjY0MTc0MzNmNGIxMzM2ZDcxOGEiLCJhdWQiOlsiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImh0dHBzOi8vZGV2LXE4ZnJ2ZG95cHIyYTB4ZjMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2ODA5NDc5NiwiZXhwIjoxNjcwNjg2Nzk2LCJhenAiOiJWTlZ6M2E5bHlVdXhlM1hEaXBqTXdDNTRPcGpNd084ayIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpldmVudHMifQ.Ozr424VaHnqM56deM3iCYfV6eEN8hVi0Ixmz6WeOrDgAEpH5KWjIXHdCq1lvY9ayyQAS13EkaGzM2MfXJzKYN4QYcuHERFAJxsE_YWIgqUrbebkKpHopbXlZaNPI2XPeWq68RswRtXl3Ldc50ItBDcK5Ck97vVA4mQnZlDNePJ0Kwy3ljrkqDe5K_E3Xj9aki6MB2aH28x1HSUm8K0_BlFnD1wO9IabSw6AalemlC_PDqEuGrwjpd2M7C9ceQ2bN3cuROWkHsjSL4C0EgIU7GRpXw9dPQuEnWG4VINTdH5plKad3qIVKSQaoH5mbVGqzeZ69TSeD2PUqBQa1VswT8w'
    //const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'

    const eventsUrl = 'https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events';
    //const eventsUrl = 'http://localhost:9000/maps/';

    fetch(eventsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
    

    useMemo(() => {
      if (isAuthenticated) {
        getToken(getAccessTokenSilently);
        getEvents(events, setEvents);
      }
    }, [isAuthenticated])
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