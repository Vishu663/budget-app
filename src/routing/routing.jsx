import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";

export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home/:name" element={<Home />} /> {/* Include the name parameter */}
            </Routes>
        </Router>
    );
}
