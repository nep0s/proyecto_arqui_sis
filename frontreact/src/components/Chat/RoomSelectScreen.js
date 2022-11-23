import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RoomSelectScreen = () => {
    
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const handleRooms = () => {      
        try {
          const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ'
          const roomsUrl = `http://localhost:7777/rooms/`;
          fetch(roomsUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            // Revisar si content es lo que tiene los mensajes
            let _rooms = data.content;
            setRooms(_rooms);
            console.log(_rooms)
            });
    
        } catch (e) {
          console.log(e.message);
        }
      };
      useEffect(() => {
        handleRooms();
      }, [])
      

    return (
        <div className="px-3" >
            {rooms.length!==0?
            <table className="table table-striped table-dark">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                    </tr>
                    {
                        rooms.map(room =>
                            <tr key={room.id}>
                                <td >{ room.id }</td>
                                <td><button className="btn btn-link"
                                    onClick={ () => {navigate(`/${room.id}`) }}
                                    >
                                    Ingresar al chat
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            : null}
        </div>
    )
}

export default RoomSelectScreen;
// Recibir todas las rooms
//Seleccionar la room 
