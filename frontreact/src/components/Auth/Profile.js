import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  
  const getToken = async (getAccessTokenSilently) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `http://proyecto-base-grupo-24-web-1:8000`,
        scope: "read:current_user",
      });
      return accessToken

    } catch (e) {
      console.log(e.message);
    };
  };

  useEffect(() => {
  const getUserMetadata = async () => {
    const domain = "dev-q8frvdoypr2a0xf3.us.auth0.com";
    const userUrl = "https://dev-q8frvdoypr2a0xf3.us.auth0.com/userinfo"

    try {
      /*
      const token = getToken(getAccessTokenSilently)
      fetch(userUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      /* Para ver errores:
      .then(response => response.text())
      .then(data => console.log(data))
      
      
      .then(response => response.json())
      .then(data => {
        let _events = data.body;
        console.log(_events);
        });
      */
      
    } catch (e) {
      console.log(e.message);
    }
  };

  getUserMetadata();
}, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
