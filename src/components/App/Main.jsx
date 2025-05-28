import React from "react";
import Note from "../Note/Note";
import Folder from "../Folder/Folder";
import AllFolders from "../Folder/Folders/AllFolders"; 
import OneFolder from "../Folder/Folders/OneFolder";
import MediaFolder from "../Folder/Folders/MediaFolder";
import LinkFolder from "../Folder/Folders/LinkFolder";

function Main({ view, activeFolder, onFolderClick, onBack }) {
    return (
        <div className="main">
            {view === "folder" && activeFolder ? (
                <Folder folderName={activeFolder} onBack={onBack} />
            ) : view === "all-notes" ? (
                <AllFolders onFolderClick={onFolderClick} />
            ) : view === "one-folder" ? (
                <OneFolder folderName={activeFolder} onFolderClick={onFolderClick} />
            ) : view === "media-folder" ? (
                <MediaFolder folderName={activeFolder} onFolderClick={onFolderClick} />
            ) : view === "link-folder" ? (
                <LinkFolder folderName={activeFolder} onFolderClick={onFolderClick} />
            ) : (
                <Note onFolderClick={onFolderClick} />
            )}
        </div>
    );
}

export default Main;
