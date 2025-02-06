import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import App from "./App.tsx";
import './index.css'
import {AboutComponent} from "./components/About";
import {ProjectsComponent} from "./components/Projects";
import {ProjectComponent} from "./components/Project";
import {CollaboratorsComponent} from "./components/Collaborators";
import {ProfileComponent} from "./components/Profile/Profile.component.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.component.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App render={<AboutComponent/>}/>}/>
            <Route path="/profile" element={<App render={
                <ProtectedRoute>
                    <ProfileComponent/>
                </ProtectedRoute>
            }/>}/>
            <Route path="/projects" element={<App render={
                <ProtectedRoute permission={"read-teams"}>
                    <ProjectsComponent/>
                </ProtectedRoute>}/>}/>
            <Route path="/projects/:id" element={<App render={
                <ProtectedRoute permission={"read-teams"}>
                    <ProjectComponent/>
                </ProtectedRoute>}/>}/>
            <Route path="/collaborators" element={<App render={
                <ProtectedRoute permission={"read-users"}>
                    <CollaboratorsComponent/>
                </ProtectedRoute>}/>}/>
            <Route path="/collaborators/:id" element={<App render={
                <ProtectedRoute permission={"read-users"}>
                    <ProfileComponent/>
                </ProtectedRoute>}/>}/>
            <Route path="/about" element={<App render={
                <ProtectedRoute>
                    <AboutComponent/>
                </ProtectedRoute>}/>}/>
        </Routes>
    </BrowserRouter>
);
