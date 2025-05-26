import React from "react";
import Note from "./Note/Note";
import Folder from "./Folder/Folder";
import AllFolders from "./Folder/AllFolders"; 
import OneFolder from "./Folder/OneFolder"; 

function Main({ view, activeFolder, onFolderClick, onBack }) {
    return (
        <div className="main">
            {view === "folder" && activeFolder ? (
                <Folder folderName={activeFolder} onBack={onBack} />
            ) : view === "all-notes" ? (
                <AllFolders onFolderClick={onFolderClick} />
            ) : view === "one-folder" ? (
                <OneFolder folderName={activeFolder} onFolderClick={onFolderClick} />
            ) : (
                <Note onFolderClick={onFolderClick} />
            )}
        </div>
    );
}

export default Main;
