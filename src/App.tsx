import { useState } from 'react';
import { Router, BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import supabase from './supabase/supabase';
import Login from './pages/Auth/components/Login';
import Register from './pages/Auth/components/Register';
import AuthPage from './pages/Auth/AuthPage';
import Homepage from './pages/Homepage/Homepage';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*Authorization*/}
                    <Route
                        path="/login"
                        element={<AuthPage children={<Login />} />}
                    />
                    <Route
                        path="/register"
                        element={<AuthPage children={<Register />} />}
                    />
                    <Route
                        path="/"
                        element={<Homepage />}
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
                        path="/:id/home"
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
