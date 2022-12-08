import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/components/Login';
import Register from './pages/Auth/components/Register';
import AuthPage from './pages/Auth/AuthPage';
import Homepage from './pages/Homepage/Homepage';
import CompleteProfile from './pages/CompleteProfile/CompleteProfile';
import Error from './pages/Error';
import Success from './pages/CompleteProfile/components/Success';
import Redirect from './pages/Auth/Redirect';
import ProfileError from './pages/CompleteProfile/components/Error';
import Profile from './pages/Profile/Profile';

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
                        path="/auth/redirect"
                        element={<Redirect />}
                    />
                    {/*Account completion*/}
                    <Route
                        path="/complete-profile"
                        element={<CompleteProfile />}
                    />
                    <Route
                        path="/complete-profile/success"
                        element={<Success />}
                    />
                    <Route
                        path="/complete-profile/error"
                        element={<ProfileError />}
                    />
                    {/*Main page*/}
                    <Route
                        path="/"
                        element={<Homepage />}
                    />
                    {/*Profile*/}
                    <Route
                        path="/user/:id"
                        element={<Profile />}
                    />
                    <Route
                        path="/user"
                        element={<Profile />}
                    />
                    {/*Not found*/}
                    <Route
                        path="/error"
                        element={<Error />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
