import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';
export const EventDetailsScreen = () => {
    const [event, setEvent]= useState([]);
    const { id } = useParams();
    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";
      
          try {
            const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzMxMzQ4NywiZXhwIjoxNjY3Mzk5ODg3LCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.vIPtLzCPY6Mp1bo9tGbeFr7ojfgU9ZvpebXffv1zQNmgUAN5pdtQZMYhOEMAte8IS2Pu4Dnv39lwU13y7SsjZPl0SwHRA1HcMOsifhR0NWk8-0yiCekX_aXR4jpoeo3BE8Sqr0Otb6LF7n6llCycsvMvY3Txx_eZoAPMp1NMk6cwAui8_o_9s7XK0C3ZZ0NFhDhXoFNjKPR396_-SLVmqLKoZRlpzweUY-2DeUx-iZr9tKCogExExqT9wq_Mfa6qJWtbkGuBWdhOmjS7kzHogTasWso_ChqAZd7trdC2gk4R_DH7zWSH_vVB9dXNn-7hxz4h3B7H_3ibfpk2m8eOpw'
      
            const eventsUrl = `https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events/${id}`;
      
            fetch(eventsUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(response => response.json())
            .then(data => {
              let _event = data.body;
              setEvent(_event);
              });
      
          } catch (e) {
            console.log(e.message);
          }
        };
  
        getUserMetadata();
      }, [event]);
  
    

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