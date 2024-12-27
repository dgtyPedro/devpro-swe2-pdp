import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import './index.css'
import {AboutComponent} from "./components/About";
import {ProjectsComponent} from "./components/Projects";
import {TeamsComponent} from "./components/Teams";
import {CollaboratorsComponent} from "./components/Collaborators";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App render={<AboutComponent />}/>} />
            <Route path="/projects" element={<App render={<ProjectsComponent />}/>} />
            <Route path="/teams" element={<App render={<TeamsComponent />}/>} />
            <Route path="/collaborators" element={<App render={<CollaboratorsComponent />}/>} />
        </Routes>
    </BrowserRouter>
);
