import React, { useState, useEffect } from "react";
import Folder from "../Folder";
import "./AllFolders.css";

function AllFolders() {

    const [activeGrid, setActiveGrid] = useState("layout");

    const [positions, setPositions] = useState({
        list: 1.5,
        layout: 33,
        compact: 63.5,
    });

    const allFolderData = [
        { 
            icon: "F", 
            title: "Documents",
            count: 24,
            fileType: "files"
        },
        { 
            icon: "F", 
            title: "Media",
            count: 908,
            fileType: "media"
        },
        { 
            icon: "F", 
            title: "Links",
            count: 97,
            fileType: "links"
        },
        { 
            icon: "F", 
            title: "Locked",
            count: 19,
            fileType: "locked"
        },
    ];

    const folderData = [
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        },
        {
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25"
        }
    ];

    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-header">
                    <div className="folder-header-wrapper">
                        <div className="folder-logo">
                            <p className="folder-header-svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"/></svg>
                            </p>

                            <p>All Notes</p>
                        </div>

                        <div className="folder-icons">
                            <div className="folder-add">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                            </div>

                            <div className="folder-search">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/></svg>
                            </div>

                            <div className="folder-star">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="all-folders-wrapper">
                    <div className="folder-body">
                        <div className="folder-body-header">
                            <div className="folder-left">
                                <div className="folder-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-icon-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3a1 1 0 0 1 .608.206l.1.087L12.414 6H19a3 3 0 0 1 2.995 2.824L22 9v8a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V6a3 3 0 0 1 2.824-2.995L5 3z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="all-folders">
                        {allFolderData.map((item, index) => (
                            <div className="all-folder" key={index}>
                                <div className="all-folder-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="all-folder-svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M9 3a1 1 0 0 1 .608.206l.1.087L12.414 6H19a3 3 0 0 1 2.995 2.824L22 9v8a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V6a3 3 0 0 1 2.824-2.995L5 3z"/>
                                    </svg>
                                </div>

                                <div className="all-folder-name">
                                    <p>{item.title}</p>
                                </div>

                                <div className="all-folder-text">
                                    <p>{item.count} {item.fileType}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            
                <div className="folder-body folder-body-main">
                    <div className="folder-body-header">
                        <div className="folder-left">
                            <div className="folder-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-icon-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3a1 1 0 0 1 .608.206l.1.087L12.414 6H19a3 3 0 0 1 2.995 2.824L22 9v8a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V6a3 3 0 0 1 2.824-2.995L5 3z"/></svg>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>

                            <div className="folder-tag">
                                <p>Daily Files</p>
                            </div>
                        </div>

                        <div className="folder-right">
                            <div className="folder-grid-wrapper">
                                <div  
                                className={`folder-grid grid-list ${activeGrid === "list" ? "grid-active" : ""}`}
                                onClick={() => setActiveGrid("list")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-list-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></svg>
                                </div>

                                <div 
                                className={`folder-grid grid-layout ${activeGrid === "layout" ? "grid-active" : ""}`}
                                onClick={() => setActiveGrid("layout")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-layout-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/></svg>
                                </div>

                                <div 
                                className={`folder-grid grid-compact ${activeGrid === "compact" ? "grid-active" : ""}`}
                                onClick={() => setActiveGrid("compact")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-compact-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>
                                </div>
                            </div>

                            <div class="slider">
                                <div
                                    className="ball"
                                    style={{ left: positions[activeGrid] + "px" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div> 

                <Folder view={activeGrid} data={folderData} />
            </div>
        </div>
    );
}

export default AllFolders;
