import React, { useState, useEffect } from "react";
import Side from "./App/Side";
import Main from "./App/Main";
import { LanguageProvider } from "../Context/LanguageContext.jsx";
import { DashboardViewProvider } from "./Folder/GridControls/DashboardViewContext.jsx";

function App() {
    const [view, setView] = useState("home");
    const [activeFolder, setActiveFolder] = useState(null);

    // --- Theme Toggle (Light/Dark) ---
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    const handleSectionOrFolderClick = (section) => {
        if (section === "note" || section === "home") {
            setView("home");
            setActiveFolder(null);
        } else if (section === "all-notes") {
            setView("all-notes");
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
            <DashboardViewProvider>
                <div className="app-container">
                    <div className="app-wrapper">
                        <Side
                            onSectionClick={handleSectionOrFolderClick}
                            darkMode={darkMode}
                            toggleTheme={toggleTheme}
                        />
                        <Main
                            view={view}
                            activeFolder={activeFolder}
                            onFolderClick={handleSectionOrFolderClick}
                            onBack={() => setView("home")}
                            darkMode={darkMode}
                            toggleTheme={toggleTheme}
                        />
                    </div>
                </div>
            </DashboardViewProvider>
        </LanguageProvider>
    );
}

export default App;
