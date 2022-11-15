import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const handlePermissions = () => {      
    try {

      const tokenChat = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2NoYXQubmFuby5uZXQiLCJpc3MiOiJodHRwczovL2FwaS5uYW5vLm5ldCIsImV4cCI6MTY2ODUzOTU0Nywic3ViIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwiZW50aXR5VVVJRCI6IjliYzkxYTQ4LWYyN2YtNGRmMy1iMWQ3LTEzNmNlNGY3YTVkZCIsInVzZXJVVUlEIjoiNjhhM2FmOTQtNjM4YS0xMWVkLTgxY2UtMDI0MmFjMTIwMDAyIiwibGV2ZWxPbkVudGl0eSI6OTk5LCJpYXQiOjE2Njg0NTMxNDd9.hrR1aHXym6zUb0YFvc-Pv_XJk_Esjz6MymeLatJxiEo'
// en postman este link no nos funciono funciono solo el con fecha
      const UUID = "a5eb3a26-6451-11ed-81ce-0242ac120002" ; //hardcodeado por ahora 
      const permissionsUrl = `http://localhost:7777/rooms/1/members/`;
      fetch(permissionsUrl, {
        method: "PUT",
        mode: 'cors',
        body: JSON.stringify({
          "userUUID": UUID,
          "permissions":"rw",
          "level":100
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenChat}`,
        },
      })
      .then(response => response.json())
      
      .then(data => {
        let permission = data.url;
        });
    } catch (e) {
      console.log(e.message);

    }
    
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
 console.log(handlePermissions().response)
  
  return (
    
    isAuthenticated && (
      <div>
        
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        
      </div>
    )
  );
};

export default Profile;
