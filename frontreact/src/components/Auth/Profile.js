import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const handlePermissions = () => {      
    try {
      const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhCWGhOd0JpUW84YzlHZVRndzVnSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xOGZydmRveXByMmEweGYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL3Byb3llY3RvLWJhc2UtZ3J1cG8tMjQtd2ViLTE6ODAwMCIsImlhdCI6MTY2NzQyNzcxMCwiZXhwIjoxNjcwMDE5NzEwLCJhenAiOiJkbDBTdzBIR3QyVkdpdHNWdVh0N0NRZWRRcEtjR2RuMCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.AtFfn_3OvOOLRb6wpn2Y9pn-bDRzviBLnteoVGqsqL6A9aaRqmsW8jK85eP21yjehi4vonrhXWntz1yARTjkx_7oIYiBbM9OOls-WwvMMbEy1vxdVrpjP9reCbehpoG9qIpSPUVnJdcG1xzOsP4m82utgRGSV_qngn48PBqGyv1Y8Y4shKYpBP1886rNwEEyjWDyvNv-ZZ8-xgw8x0LSgTWXqaiWCAYSs4fNJXgk0UvF7LlpJtChEQuIiuCyrZeA646T4wpjZzm8LQk1JCYvMZ1epP5sO5K_whtcqAb8Wbg3xb6jKDWBXwWiNewm7zrNLEcn0MFZPhR6-JOz-HjEFA'
// en postman este link no nos funciono funciono solo el con fecha
      const UUID = "cadab196-62ac-11ed-9b6a-0242ac120002" ; //hardcodeado por ahora 
      const permissionsUrl = `http://localhost:7777/rooms/1/members`;
      fetch(messagesUrl, {
        method: "PUT",
        body: JSON.stringify(opts),
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
  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
// <img src={user.picture} alt={user.name} />