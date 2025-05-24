import React, { useState } from "react";
import Note from "./Note/Note";
import Folder from "./Folder/Folder";

function Main() {
    const [activeFolder, setActiveFolder] = useState(null);

    const handleFolderClick = (folderName) => {
        setActiveFolder(folderName);
    };

    const handleBack = () => {
        setActiveFolder(null);
    };

    return (
        <div className="main">
            {activeFolder ? (
                <Folder folderName={activeFolder} onBack={handleBack} />
                    ) : (
                <Note onFolderClick={handleFolderClick} />
            )}
        </div>
    );
}

export default Main;