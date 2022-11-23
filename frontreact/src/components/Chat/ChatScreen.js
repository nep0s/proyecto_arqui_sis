import React, { useState, useMemo, useEffect } from 'react'; 
import Pagination from "../Events/Pagination"
import { useParams } from 'react-router-dom';
let PageSize = 1000;
export const ChatScreen = () => {
    // Recibir mensajes del chat
    const { id } = useParams();
    const [messages, setMessages] = useState([""]);
    const [event_data, setEventData] = useState([]);
    const [text, setText] = useState("");
    const [socket, setSocket] = useState(null);
    const handleMessagesChat = () => {      
        try {
          const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ'
          const messagesUrl = `http://localhost:7777/rooms/${id}/messages`;
          fetch(messagesUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            // Revisar si content es lo que tiene los mensajes
            let _messages = data.content;
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
    }, [currentPage, messages]);
    function handleChange(event) {
        setText(event.target.value);
      };
    const handleSendMessage = (text) => {
        console.log(event_data);
        console.log(text);
        if (event_data.data === "CONNECTED"){
        // console.log('Message from server ', JSON.parse(event_data));
        
        console.log("Conectado")
        if(text !== "")
        {
        socket.send(JSON.stringify(
            {
                "type":"message",
                "content":text
            }))};}};
    
    useEffect(() => {
        const _socket = new WebSocket('ws://localhost:7777/chat');
        setSocket(_socket);
    },[])
// Listen for messages
    if(socket !== null){
    socket.addEventListener('message', (event) => {
    let event_data = JSON.parse(event.data);
    setEventData(event_data);
     
    //console.log('Message from server ', event_data);
    if (event_data.data === "START?"){
        socket.send(JSON.stringify(
            {
                "type":"token",
                "content":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MjUzMjc4MjQxMSwic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg3ODI0MTF9.7PWs9qsmUSTJ-EKUzoZkki_devfHxlraKRVhG9B0dbQ"

            }));}
    if (event_data.data === "READY"){
        socket.send(JSON.stringify(
            {
                "type":"select_room",
                "room_id":1
            }));

    }
    })};

    return (

        <div>
        <input name="text" onChange={handleChange} />
        {text.length !== 0?
        <button className="btn btn-link"
            onClick={ () => {handleSendMessage(text) }}>
            Enviar mensaje
        </button>
        :
        null}
         <div className="px-3" >
            {messages.length !== 0?
             <div><table className="table table-striped table-dark">
                 <tbody>
                     <tr>
                         <th scope="col">Id</th>
                         <th scope="col">RoomId</th>
                         <th scope="col">Emitter</th>
                         <th scope="col">Contenido</th>
                         <th scope="col">Fecha</th>
                     </tr>
                     {
                         currentTableData.map((message, index) =>
                             <tr key={index}>
                                 <td>{ message.id }</td>
                                 <td>{ message.room_id }</td>
                                 <td>{ message.emitter }</td>
                                 <td>{ message.content }</td>
                                 <td>{ message.createdAt }</td>
                             </tr>
                         )
                     }
                 </tbody>
             </table>
             <Pagination
                 className="pagination-bar"
                 currentPage={currentPage}
                 totalCount={messages.length}
                 pageSize={PageSize}
                 onPageChange={page => setCurrentPage(page)}
             />
             </div>
             :
            <h1>No hay mensajes aún</h1>}
        </div>
        </div>
    )
}

export default ChatScreen;
