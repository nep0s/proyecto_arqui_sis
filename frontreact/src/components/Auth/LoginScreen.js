import React, { useEffect, useState } from 'react';
import api from '../../api';


export const LoginScreen = () => {
    const [events, setEvents]= useState([]);

    // const peticionGet=async()=>{
    //     await api.get('maps/')
    //         .then(response=>{
    //             setEvents(response.data);
    //         }).catch(error=>{
    //             console.log(error);
    //         })
    //     }
            
    // useEffect(()=>{
    //     peticionGet();
    //     },[])
    

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1%" }}>
            LOGIN
        </div>
    )
}

export default LoginScreen;