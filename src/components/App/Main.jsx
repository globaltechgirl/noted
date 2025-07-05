import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Folder from "../Folder/Folder";
import Notes from "../Folder/Folders/Notes"; 
import OneFolder from "../Folder/Folders/OneFolder";
import MediaFolder from "../Folder/Folders/MediaFolder";
import LinkFolder from "../Folder/Folders/LinkFolder";
import Tasks from "../Tasks/Tasks"; 
import Profile from "../Profile/Profile"; 
import Settings from "../Settings/Setting";

function Main({ view, activeFolder, onFolderClick, onBack }) {
    const renderContent = () => {
        switch (view) {
            case "notes":
                return <Notes onFolderClick={onFolderClick} />;
            case "one-folder":
                return <OneFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "media-folder":
                return <MediaFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "link-folder":
                return <LinkFolder folderName={activeFolder} onFolderClick={onFolderClick} />;
            case "folder":
                return activeFolder && <Folder folderName={activeFolder} onBack={onBack} />;
            case "tasks":
                return <Tasks />;
            case "profile":
                return <Profile />;
            case "settings":
                return <Settings />;
            default:
                return <Dashboard onFolderClick={onFolderClick} />;
        }
    };

    return (
        <div className="main" >
            {renderContent()}
        </div>
    );
}

export default Main;
