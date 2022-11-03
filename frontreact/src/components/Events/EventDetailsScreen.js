import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';
export const EventDetailsScreen = () => {
    const [event, setEvent]= useState([]);
    const [complexity, setComplexity] = useState(0);
    const [map, setMap] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";
      
          try {
            const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'
      
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
    const handleEventPDF = () => {      
          try {
            const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'
      
            const eventsUrl = `https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/smartcitiespdf`;
      
            fetch(eventsUrl, {
              method: "POST",
              body: JSON.stringify(event),
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(response => response.json())
            .then(data => {
              let _map = data.url.body;
              setMap(_map);
              });
      
          } catch (e) {
            console.log(e.message);
          }
        };
    const handleEventComplexity = () => {
      
          try {
            const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'
      
            const eventsUrl = `https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/events/${id}`;
      
            fetch(eventsUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then(response => response.json())
            .then(data => {
              let _complexity = data.body;
              setComplexity(_complexity);
              });
      
          } catch (e) {
            console.log(e.message);
          };
    }
  
    

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
                        <th scope='col'>Generar PDF</th>
                        <th scope='col'>Calcular complejidad</th>
                    </tr>
                    <tr>
                        <td>{ event.id }</td>
                        <td>{ event.type1 }</td>
                        <td>{ event.lat }</td>
                        <td>{ event.lon }</td>
                        <td>{ event.location }</td>
                        <td>{ event.message }</td>
                        <td>{ event.level }</td>
                        <td><button className="btn btn-link"
                                    onClick={ handleEventPDF }
                                    >
                                    Generar PDF
                                    </button>
                        </td>
                        <td><button className="btn btn-link"
                                    onClick={ handleEventComplexity }
                                    >
                                    Calcular complejidad
                                    </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1>Complejidad = {complexity}</h1>
            {map !== 0?
            <a target="_blank" href={map}>Descargar PDF</a>
            :
            <h1>Click en el botón para generar PDF</h1>
            }
            
        </div>
    )
}

export default EventDetailsScreen;