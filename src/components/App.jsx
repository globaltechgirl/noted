import React, { useState } from "react";
import Side from "./Side";
import Main from "./Main";

function App() {
    const [view, setView] = useState("home");
    const [activeFolder, setActiveFolder] = useState(null);

    const handleFolderClick = (folderName) => {
        if (folderName === "all-notes") {
            setView("all-notes");
            setActiveFolder(null);
        } else {
            setView("one-folder");
            setActiveFolder(section); 
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
