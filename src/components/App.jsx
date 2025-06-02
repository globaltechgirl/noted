import React, { useState } from "react";
import Side from "./App/Side";
import Main from "./App/Main";

function App() {
    const [view, setView] = useState("home");

    const [activeFolder, setActiveFolder] = useState(null);

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
        <div className="app-container">
            <Side onSectionClick={handleSectionOrFolderClick} />

            <Main
                view={view}
                activeFolder={activeFolder}
                onFolderClick={handleSectionOrFolderClick}
                onBack={() => setView("home")}
            />
        </div>
    );
}

export default App;
