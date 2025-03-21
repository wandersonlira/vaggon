import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Item from "./pages/Item";
import Cadastrar from "./pages/Login/Cadastrar";
import NewItem from "./pages/NewItem";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastrar" element={<Cadastrar/>} />
                <Route path="/registros" element={<Item/>} />
                <Route path="/registros/new/:bookId" element={<NewItem/>} />                
            </Routes>
        </Router>
    );
}