import React, { useState, useMemo } from 'react'; 
import Pagination from "../Events/Pagination"
import { useParams } from 'react-router-dom';
let PageSize = 1000;
export const ChatScreen = () => {
    // Recibir mensajes del chat
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const handleMessagesChat = () => {      
        try {
          const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ'
    // en postman este link no nos funciono funciono solo el con fecha 
          const messagesUrl = `http://localhost:7777/rooms/1/messages`;
          fetch(messagesUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            let _messages = data.url;
            setMessages(_messages);
            });
    
        } catch (e) {
          console.log(e.message);
        }
      };
    useMemo(() => handleMessagesChat(), []);
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return messages.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
// // Create WebSocket connection.

    const socket = new WebSocket('ws://localhost:7777/chat');

//Connection opened
// socket.addEventListener('open', (event) => {
    
//     console.log('Message from server ', event);
//     socket.send(JSON.stringify(
//         {
//         "type":"token",
//         "content":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MTY2ODUzOTU0Nywic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg0NTMxNDd9.hrR1aHXym6zUb0YFvc-Pv_XJk_Esjz6MymeLatJxiEo"
//         }));
//     socket.send(JSON.stringify(
//         {
//             "type":"select_room",
//             "room_id":1
//         }));
// });
   


// Listen for messages
    socket.addEventListener('message', (event) => {
    
     
    let event_data =JSON.parse(event.data);
    //console.log('Message from server ', event_data);
    if (event_data.data == "START?"){
        console.log("start 1")
        socket.send(JSON.stringify(
            {
                "type":"token",
                "content":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ"
            
            }));
        // socket.send(JSON.stringify(
        // {
        //     "type":"select_room",
        //     "room_id":1
        // }));
        console.log("start 2")}

    if (event_data.data === "READY"){
        console.log("hola")
        socket.send(JSON.stringify(
            {
                "type":"select_room",
                "room_id":1
            }));
        console.log("hola2")

    }
// //PARA MANDAR MENSAJES REMPLAZAR EN CONTENT EL MENSAJE

    // if (event_data.data === "CONNECTED"){
    // // console.log('Message from server ', JSON.parse(event.data));
    
    // // console.log("Conectado")
    // // socket.send(JSON.stringify(
    // //     {
    // //         "type":"message",
    // //         "content":"Fueled up and ready to go"
    // //     }));}

  
    });


    return (

        <h1>hola</h1>
        // <div className="px-3" >
        //     <table className="table table-striped table-dark">
        //         <tbody>
        //             <tr>
        //                 <th scope="col">Id</th>
        //                 <th scope="col">RoomId</th>
        //                 <th scope="col">Contenido</th>
        //                 <th scope="col">Fecha</th>
        //             </tr>
        //             {
        //                 currentTableData.map(message =>
        //                     <tr key={message.id}>
        //                         <td>{ message.room_id }</td>
        //                         <td>{ message.emitter }</td>
        //                         <td>{ message.content }</td>
        //                         <td>{ message.createdAt }</td>
        //                     </tr>
        //                 )
        //             }
        //         </tbody>
        //     </table>
        //     <Pagination
        //         className="pagination-bar"
        //         currentPage={currentPage}
        //         totalCount={messages.length}
        //         pageSize={PageSize}
        //         onPageChange={page => setCurrentPage(page)}
        //     />
        // </div>
    )
}

export default ChatScreen;
