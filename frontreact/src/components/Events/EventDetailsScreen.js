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
            const accessToken = JSON.parse(localStorage.getItem('accessToken'));
      
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
            const accessToken = JSON.parse(localStorage.getItem('accessToken'));
      
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
            const accessToken = JSON.parse(localStorage.getItem('accessToken'));
      
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