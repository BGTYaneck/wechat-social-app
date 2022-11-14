import { useState } from 'react';
import { Router, BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import supabase from './supabase/supabase';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*Authorization*/}
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    {/*Users*/}
                    <Route
                        path="/user/:id/profile"
                        element={<App />}
                    />
                    <Route
                        path="/user/:id/my-profile"
                        element={<App />}
                    />
                    <Route
                        path="/user/:id/my-profile/edit"
                        element={<App />}
                    />
                    <Route
                        path="/user/:id/home"
                        element={<App />}
                    />
                    {/*Groups*/}
                    <Route
                        path="/group/:id/"
                        element={<App />}
                    />
                    <Route
                        path="/group/:id/edit"
                        element={<App />}
                    />
                    <Route
                        path="/group/create"
                        element={<App />}
                    />
                    <Route
                        path="/group/:id"
                        element={<App />}
                    />
                    <Route
                        path="/group/:id/edit"
                        element={<App />}
                    />
                    {/*Chats*/}
                    <Route
                        path="/group/:id/chat"
                        element={<App />}
                    />
                    <Route
                        path="/user/:id/chats"
                        element={<App />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
