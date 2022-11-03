
import React, { useEffect, useState, useMemo } from 'react';
import api from '../../api';
import EventTable from './EventTable';
import LoginButton from '../Auth/LogInButton';
import LogOutButton from '../Auth/LogOutButton';
import Profile from '../Auth/Profile';

import { useAuth0 } from "@auth0/auth0-react";


const getEvents = (events, setEvents) => {
  const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";

  // get acces token
  try {
    const opts = {
      client_id: 'dl0Sw0HGt2VGitsVuXt7CQedQpKcGdn0',
      client_secret: '3Uc6g7J8nelvwyJDHj8n2EGQrGTjV-dOMp3EeYrFdeN3E4wfAkFI15-sS_9kurIc',
      audience: 'http://proyecto-base-grupo-24-web-1:8000\\',
      grant_type: 'client_credentials',
    };
    //scope: 'read:events',
    let token = ''
    //const eventsUrl = 'https://dev-q8frvdoypr2a0xf3.us.auth0.com';
    const eventsUrl = 'https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/auth0';

    fetch(eventsUrl, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(opts),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      });

  } catch (e) {
    console.log(e.message);
  }

  try {
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'

    const eventsUrl = 'https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events';

    fetch(eventsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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

    useMemo(() => getEvents(events, setEvents), [])
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