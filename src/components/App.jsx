import React, { useState } from "react";
import Side from "./App/Side";
import Main from "./App/Main";
import { LanguageProvider } from "../Context/LanguageContext.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { DashboardViewProvider } from "./Folder/GridControls/DashboardViewContext.jsx";

function App() {
    const [view, setView] = useState("home");
    const [activeFolder, setActiveFolder] = useState(null);

    const handleSectionOrFolderClick = (section) => {
        if (section === "dashboard" || section === "home") {
            setView("home");
            setActiveFolder(null);
        } else if (section === "notes") {
            setView("notes");
            setActiveFolder(null);
        } else if (section === "Media" || section === "media-folder") {
            setView("media-folder");
            setActiveFolder("Media");
        } else if (section === "Links" || section === "link-folder") {
            setView("link-folder");
            setActiveFolder("Links");
        } else if (section === "profile") {
            setView("profile");
            setActiveFolder(null);
        } else if (section === "settings") {
            setView("settings");
            setActiveFolder(null);
        } else {
            setView("one-folder");
            setActiveFolder(section);
        }
    };

    return (
        <LanguageProvider>
            <ThemeProvider>
                <DashboardViewProvider>
                    <div className="app-container">
                        <div className="app-wrapper">
                            <Side 
                                onSectionClick={handleSectionOrFolderClick} 
                            />

                            <Main
                                view={view}
                                activeFolder={activeFolder}
                                onFolderClick={handleSectionOrFolderClick}
                                onBack={() => setView("home")}
                            />
                        </div>
                    </div>
                </DashboardViewProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
