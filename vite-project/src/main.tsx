import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import './index.css'
import {AboutComponent} from "./components/About";
import {ProjectsComponent} from "./components/Projects";
import {ProjectComponent} from "./components/Project";
import {CollaboratorsComponent} from "./components/Collaborators";
import {ProfileComponent} from "./components/Profile/Profile.component.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App render={<AboutComponent />}/>} />
            <Route path="/profile" element={<App render={<ProfileComponent />}/>} />
            <Route path="/projects" element={<App render={<ProjectsComponent />}/>} />
            <Route path="/projects/:id" element={<App render={<ProjectComponent />}/>} />
            <Route path="/collaborators" element={<App render={<CollaboratorsComponent />}/>} />
            <Route path="/collaborators/:id" element={<App render={<ProfileComponent />}/>} />
            <Route path="/about" element={<App render={<AboutComponent />}/>} />
        </Routes>
    </BrowserRouter>
);
