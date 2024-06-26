import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { HomeIcon } from "@heroicons/react/24/solid"

export default function Login() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const home = () => {
        if (name.trim() !== "") {
            navigate(`/home/${name}`); // Include the name in the URL path
        } else {
            alert("Please enter your name");
        }
    }

    return (
        <div className="login-container">
            <div className="login-main">
                
                <h2><HomeIcon className="home-icon"/>Budget-up</h2>
                <h1>Please Enter your Name and get started</h1>
                <input 
                    type="text" 
                    placeholder="name eg. john" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button onClick={home}>Login</button>
            </div>
        </div>
    );
}
