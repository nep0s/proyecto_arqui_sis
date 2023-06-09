import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';


export default function SignupScreen() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { v4: uuidv4 } = require('uuid');

    const registerUser = async () => {
        const signupURL = "https://dev-q8frvdoypr2a0xf3.us.auth0.com/dbconnections/signup"
        const data = {
            "client_id": "6Z7Uj8y7uPGY1DsN09qsBu0N88nSI5Ji",
            "email": `${mail}`,
            "password": `${password}`,
            "connection": "Username-Password-Authentication",
            "username": `${mail}`,
            "user_metadata": { "UUID": `${uuidv4()}` }
        }

    }

    
    

    return (
        <>
            <div className="form-registrarse">
                <h2 className="titulo">
                    ¡Registrate!
                </h2>
                <form className="signup">
                     <p>
                        <input type="name"
                            className="formulario"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)} required />
                    </p>
                    <p>
                        <input
                            type="text"
                            className="formulario"
                            placeholder="Correo electrónico"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)} required />
                    </p>
                    <p>
                        <input type="password"
                            className="formulario"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </p>
                    <input id="submit-registrarse" type="submit" value="Registrarse" className='Button'/>
                </form>
            </div>
        </>
    );
}



