import React from "react";
import Note from "../Note/Note";
import Folder from "../Folder/Folder";
import AllFolders from "../Folder/Folders/AllFolders"; 
import OneFolder from "../Folder/Folders/OneFolder";
import MediaFolder from "../Folder/Folders/MediaFolder";
import LinkFolder from "../Folder/Folders/LinkFolder";
import Profile from "../Settings/Profile/Profile"; 
import Settings from "../Settings/Settings/Setting"

function Main({ view, activeFolder, onFolderClick, onBack }) {
    // Render content based on current view
    const renderContent = () => {
        switch (view) {
            case "all-notes":
                return <AllFolders onFolderClick={onFolderClick} />;
            case "one-folder":
                return <OneFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "media-folder":
                return <MediaFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "link-folder":
                return <LinkFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "folder":
                return activeFolder && <Folder folderName={activeFolder} onBack={onBack} />;
            case "profile":
                return <Profile />;
            case "settings":
                return <Settings />;
            default:
                return <Note onFolderClick={onFolderClick} />;
        }
    };

    return <div className="main">{renderContent()}</div>;
}

export default Main;