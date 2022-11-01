
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
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzMxMzQ4NywiZXhwIjoxNjY3Mzk5ODg3LCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.vIPtLzCPY6Mp1bo9tGbeFr7ojfgU9ZvpebXffv1zQNmgUAN5pdtQZMYhOEMAte8IS2Pu4Dnv39lwU13y7SsjZPl0SwHRA1HcMOsifhR0NWk8-0yiCekX_aXR4jpoeo3BE8Sqr0Otb6LF7n6llCycsvMvY3Txx_eZoAPMp1NMk6cwAui8_o_9s7XK0C3ZZ0NFhDhXoFNjKPR396_-SLVmqLKoZRlpzweUY-2DeUx-iZr9tKCogExExqT9wq_Mfa6qJWtbkGuBWdhOmjS7kzHogTasWso_ChqAZd7trdC2gk4R_DH7zWSH_vVB9dXNn-7hxz4h3B7H_3ibfpk2m8eOpw'

    //const eventsUrl = 'http://18.232.245.49:9000/maps/';
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
      _events.splice(10)
      setEvents(_events);
      console.log(data.body[0]);
      });

  } catch (e) {
    console.log(e.message);
  }
};


export const EventScreen = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [events, setEvents]= useState([]);

    useMemo(() => getEvents(events, setEvents), [])
    /*
    useEffect(() => {
      const getUserMetadata = async () => {
        const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";
    
        try {
          const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzMxMzQ4NywiZXhwIjoxNjY3Mzk5ODg3LCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.vIPtLzCPY6Mp1bo9tGbeFr7ojfgU9ZvpebXffv1zQNmgUAN5pdtQZMYhOEMAte8IS2Pu4Dnv39lwU13y7SsjZPl0SwHRA1HcMOsifhR0NWk8-0yiCekX_aXR4jpoeo3BE8Sqr0Otb6LF7n6llCycsvMvY3Txx_eZoAPMp1NMk6cwAui8_o_9s7XK0C3ZZ0NFhDhXoFNjKPR396_-SLVmqLKoZRlpzweUY-2DeUx-iZr9tKCogExExqT9wq_Mfa6qJWtbkGuBWdhOmjS7kzHogTasWso_ChqAZd7trdC2gk4R_DH7zWSH_vVB9dXNn-7hxz4h3B7H_3ibfpk2m8eOpw'
    
          //const eventsUrl = 'http://18.232.245.49:9000/maps/';
          const eventsUrl = 'https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events';
    
          fetch(eventsUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(typeof data.body);
            let _events = data.body
            _events.splice(10)
            setEvents(_events);
            console.log(data.body[0].id);
            });
    
        } catch (e) {
          console.log(e.message);
        }
      };

      getUserMetadata();
    }, [events]);
  */

/*
    const getEvents = async () => {
      console.log(isAuthenticated)
        let accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzIzODk2NCwiZXhwIjoxNjY3MzI1MzY0LCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.to5wR2POWot8QlzVsf_ZNElPTh8hZT4aimLsdhpHXg8L7fMn8BN9bxbxw7ipaMn_mQ9Bgh3RyIM0PwG4-W7Cp_GYdtuMjQkLm3HBeT-EvjK-an9hOeXm-hVM-LPcC3jJQMAIDUBZlFi92YQSwUZnVOCudpQ_OVGTgm9WbvxK_D-Cce7gUKybABWmriyNdL3VzSZKLYItLlcbL0F0J1Z3jSUlwRazALCEvxtKmK9vklPiTJuaKHJQW3oHYhbA-xT0jFanEWP7pYDrQ3_qrgtjYslXQtCg-9K6KPsCQOM0P-NCI34YonQ4dHhkvlCgfbFyAZ4QBC6jvgpLPxWCRrABCg'

        const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";

        try {
          accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          });} catch (e) {
            console.log(e.message);
          };


        try {
          fetch('https://dev-q8frvdoypr2a0xf3.us.auth0.com/oauth/token', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: {
              "client_id":"VNVz3a9lyUuxe3XDipjMwC54OpjMwO8k",
              "client_secret":"R06OdCwjKWE-ilrvKXhXf28gock2e-6jmIPJp8zfq5n3YQ3FAU5YF9qe0uMqLk4I",
              "audience":"http://proyecto-base-grupo-24-web-1:8000",
              "grant_type":"client_credentials"
            },
          }).then(data => {
            console.log(data)
            setEvents(data)
          });
    
          //const EventsUrl = `http://localhost:9000/maps/`;
          const EventsUrl = `http://proyecto-base-grupo-24-web-1:9000/maps/`;
    
          fetch(EventsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then(data => {
            console.log(data)
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
     getEvents();
     */
    
    
    return (
      <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
          
          {events.length !== 0?
          events.map( (event) => (
            <div> {event.id} {event.message}</div>
          ))
          :
          <h1>No hay eventos aun</h1>}
      </div>
  )
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