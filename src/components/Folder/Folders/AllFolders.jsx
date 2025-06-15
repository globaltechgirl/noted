import React, { useState, useEffect } from "react";
import Folder from "../Folder";
import "./AllFolders.css";
import { useLanguage } from "../../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../../Context/translations";
import { useDashboardView } from "../GridControls/DashboardViewContext";

function AllFolders() {
    // --- Language Setup ---
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // --- Dashboard View ---
    const { dashboardView: defaultView } = useDashboardView(); 
    const [localView, setLocalView] = useState(defaultView); 

    // View toggle positions ---
    const [positions, setPositions] = useState({
        List: 1.5,
        Layout: 28,
        Compact: 53.5,
    });

    // --- Star Filter Toggle ---
    const [starredOnly, setStarredOnly] = useState(false);

    const [showSearchPopup, setShowSearchPopup] = useState(false);

    // --- Folder Summary Data ---
    const allFolderData = [
        {
            icon: "F",
            title: t[folderKeyMap["Documents"]] || "Documents",
            count: 24,
            fileType: t[folderKeyMap["Files"]] || "files",
        },
        {
            icon: "F",
            title: t[folderKeyMap["Media"]] || "Media",
            count: 908,
            fileType: t[folderKeyMap["Media"]] || "media",
        },
        {
            icon: "F",
            title: t[folderKeyMap["Links"]] || "Links",
            count: 97,
            fileType: t[folderKeyMap["Links"]] || "links",
        },
        {
            icon: "F",
            title: t[folderKeyMap["Locked"]] || "Locked",
            count: 19,
            fileType: t[folderKeyMap["Locked"]] || "locked",
        },
    ];

    // --- Folder Data ---
    const [folderData, setFolderData] = useState([
        {
            id: 1,
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25",
            starred: false
        },
        {
            id: 2,
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25",
            starred: false
        },
        {
            id: 3,
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25",
            starred: false
        },
        {
            id: 4,
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25",
            starred: false
        },
        {
            id: 5,
            icon: "F",
            title: "Licence Agreement on Waterfall INC",
            filesize: "2.3 MB",
            date: "15.05.25",
            starred: false
        }
    ]);

    // --- Star Toggle Handler ---
    const toggleStar = (id) => {
        setFolderData(prev =>
            prev.map((item) =>
                item.id === id ? { ...item, starred: !item.starred } : item
            )
        );
    };

    // Starred filter
    const filteredData = starredOnly
        ? folderData.filter((item) => item.starred)
        : folderData;

    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-header">
                    <div className="folder-header-wrapper">
                        <div className="folder-logo">
                            <p className="folder-header-svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"/></svg>
                            </p>

                            <p>{t[folderKeyMap["All Notes"]] || "All Notes"}</p>
                        </div>

                        <div className="folder-icons">
                            <div className="folder-add">
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                            </div>

                            <div className="folder-search" onClick={() => setShowSearchPopup(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/>
                                </svg>
                            </div>

                            <div 
                                className={`folder-star ${starredOnly ? "active-star" : ""}`}
                                onClick={() => setStarredOnly((prev) => !prev)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="folder-header-svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill={starredOnly ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {showSearchPopup && (
                        <div className="search-popup-overlay" onClick={() => setShowSearchPopup(false)}>
                            <div className="search-popup" onClick={(e) => e.stopPropagation()}>
                                <div className="search-popup-top">
                                    <div className="search-top-left">
                                        <div className="search-top-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/>
                                            </svg>
                                        </div>

                                        <div className="search-top-input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="search-input"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="search-top-right">
                                        <button onClick={() => setShowSearchPopup(false)} className="close-button">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="close-icon"
                                                viewBox="0 0 24 24"
                                                width="20"
                                                height="20"
                                            >
                                                <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M18 6L6 18M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="search-popup-recent">
                                    <div className="search-recent-header">
                                        <p>Recent</p>
                                    </div>

                                    <div className="search-recent-body">
                                        <div className="search-recent-main">
                                            <div className="recent-main-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="recent-main-icon-svg" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
                                                </svg>
                                            </div>

                                            <div className="recent-main-wrapper">
                                                <div className="recent-main-header">
                                                    <p>Licence Agreement on Waterfall INC</p>
                                                </div>

                                                <div className="recent-main-text">
                                                    <p>License information</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="search-recent-main">
                                            <div className="recent-main-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="recent-main-icon-svg" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
                                                </svg>
                                            </div>

                                            <div className="recent-main-wrapper">
                                                <div className="recent-main-header">
                                                    <p>Licence Agreement on Waterfall INC</p>
                                                </div>

                                                <div className="recent-main-text">
                                                    <p>License information</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="search-recent-main">
                                            <div className="recent-main-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="recent-main-icon-svg" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
                                                </svg>
                                            </div>

                                            <div className="recent-main-wrapper">
                                                <div className="recent-main-header">
                                                    <p>Licence Agreement on Waterfall INC</p>
                                                </div>

                                                <div className="recent-main-text">
                                                    <p>License information</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="search-popup-common">
                                    <div className="search-common-header">
                                        <p>Common actions</p>
                                    </div>

                                    <div className="search-common-body">
                                        <div className="search-common-main">
                                            <div className="common-main-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="common-main-icon-svg" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v3.5M16 19h6m-3-3v6"/>
                                                </svg>
                                            </div>

                                            <div className="common-main-wrapper">
                                                <div className="common-main-header">
                                                    <p>New document</p>
                                                </div>

                                                <div className="common-main-text">
                                                    <p>Create a new blank document</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="search-common-main">
                                            <div className="common-main-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="common-main-icon-svg" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v3.5M19 22v-6m3 3l-3-3l-3 3"/>
                                                </svg>
                                            </div>

                                            <div className="common-main-wrapper">
                                                <div className="common-main-header">
                                                    <p>View documents</p>
                                                </div>

                                                <div className="common-main-text">
                                                    <p>View all documents</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                className={`folder-grid grid-list ${localView === "List" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("List")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-list-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></svg>
                                </div>

                                <div 
                                className={`folder-grid grid-layout ${localView === "Layout" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("Layout")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-layout-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/></svg>
                                </div>

                                <div 
                                className={`folder-grid grid-compact ${localView === "Compact" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("Compact")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="grid-compact-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>
                                </div>
                            </div>

                            <div className="slider">
                                <div
                                    className="ball"
                                    style={{ left: positions[localView] + "px" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div> 

                <Folder view={localView.toLowerCase()} data={filteredData} toggleStar={toggleStar} />
            </div>
        </div>
    );
}

export default AllFolders;
