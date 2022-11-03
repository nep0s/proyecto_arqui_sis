import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginScreen() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className="form-entrar">
                <h2 className="titulo">
                    ¡Bienvenido de vuelta!
                </h2>
                <form className="login">
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
                    <input id="submit-login" type="submit" value="Iniciar Sesión" className='Button'/>
                </form>
            </div>
        </>
    );
}
