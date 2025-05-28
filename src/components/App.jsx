import React, { useState } from "react";
import Side from "./App/Side";
import Main from "./App/Main";

function App() {
    const [view, setView] = useState("home");
    
    const [activeFolder, setActiveFolder] = useState(null);

    const handleFolderClick = (folderName) => {
        if (folderName === "all-notes") {
            setView("all-notes");
            setActiveFolder(null);
        } else if (folderName === "Media" || folderName === "media-folder") {
            setView("media-folder");
            setActiveFolder("Media"); 
        } else if (folderName === "Links" || folderName === "link-folder") {
            setView("link-folder");
            setActiveFolder("Links"); 
        } else {
            setView("one-folder");
            setActiveFolder(folderName); 
        }
    };

    return (
        <div className="app-container">
            <Side onSectionClick={(section) => {
                if (section === "note") {
                    setView("home");
                    setActiveFolder(null);
                } else if (section === "all-notes") {
                    setView("all-notes");
                    setActiveFolder(null);
                } else if (section === "media-folder") {
                    setView("media-folder");
                    setActiveFolder(Media);
                } else if (section === "link-folder") {
                    setView("link-folder");
                    setActiveFolder(Links);
                } else {
                    setView("one-folder");
                    setActiveFolder(section);
                }
            }} />

            <Main
                view={view}
                activeFolder={activeFolder}
                onFolderClick={handleFolderClick}
                onBack={() => setView("home")}
            />
        </div>
    );
}

export default App;
