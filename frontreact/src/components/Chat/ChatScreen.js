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
          const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'
    // en postman este link no nos funciono funciono solo el con fecha 
          const messagesUrl = `http://localhost:7777/rooms/${id}/messages`;
          fetch(messagesUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            let _messages = data.url.body;
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

    return (
        <div className="px-3" >
            <table className="table table-striped table-dark">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">RoomId</th>
                        <th scope="col">Contenido</th>
                        <th scope="col">Fecha</th>
                    </tr>
                    {
                        currentTableData.map(message =>
                            <tr key={message.id}>
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
    )
}

export default ChatScreen;