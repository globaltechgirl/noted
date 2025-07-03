import React, { useState, useEffect } from "react";
import Folder from "../Folder";
import img1 from '../../../assets/images/img1.jpg';
import { useLanguage } from "../../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../../Context/translations";
import { useTheme } from "../../../Context/ThemeContext";
import { useDashboardView } from "../GridControls/DashboardViewContext";

function MediaFolder({ folderName }) {    
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // Theme context 
    const { darkMode, toggleTheme } = useTheme();

    // Dashboard view
    const { dashboardView: defaultView } = useDashboardView(); 
    const [localView, setLocalView] = useState(defaultView); 

    // Starred filter toggle
    const [starredOnly, setStarredOnly] = useState(false);

    // Search popup state
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const noMatchFound = searchQuery.trim() !== "" && searchResults.length === 0;

    // Folder data
    const [folderData, setFolderData] = useState([
        {
            id: 1,
            icon: null,
            image: img1,
            title: "Q2 Budget Review Photo",
            mediatype: "Photo",
            date: "12.04.25",
            starred: false
        },
        {
            id: 2,
            icon: null,
            image: img1,
            title: "UX Research Notes Photo",
            mediatype: "Photo",
            date: "10.05.25",
            starred: false
        },
        {
            id: 3,
            icon: null,
            image: img1,
            title: "Project Neon Proposal Video",
            mediatype: "Video",
            date: "08.05.25",
            starred: false
        },
        {
            id: 4,
            icon: null,
            image: img1,
            title: "Brand Guideline 2025 Photo",
            mediatype: "Photo",
            date: "01.05.25",
            starred: false
        },
        {
            id: 5,
            icon: null,
            image: img1,
            title: "Confidential Agreement Video",
            mediatype: "Video",
            date: "15.05.25",
            starred: false
        }
    ]);

    // Star toggle handler
    const toggleStar = (id) => {
        setFolderData(prev =>
            prev.map((item) =>
                item.id === id ? { ...item, starred: !item.starred } : item
            )
        );
    };

    // Add to recent search
    const addToRecentSearches = (doc) => {
        setRecentSearches((prev) => {
            const updated = [doc, ...prev.filter(item => item.id !== doc.id)];
            return updated.slice(0, 3); 
        });
    };

    // Filtered folder data
    const filteredData = starredOnly
        ? folderData.filter((item) => item.starred)
        : folderData;

    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-header">
                    <div className="folder-header-wrapper">
                        <div className="folder-logo">
                           <p>
                                {folderName
                                    ? t[folderKeyMap[folderName] || folderName.toLowerCase()] || folderName
                                    : t.note || "Note"}
                            </p>
                        </div>

                        <div className="folder-icons">
                            <div className="folder-search" onClick={() => setShowSearchPopup(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="folder-header-svg" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/>
                                </svg>
                            </div>

                            <div className="folder-add">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="folder-header-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                    />
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

                            <div className="theme-toggle" onClick={toggleTheme}>
                                <div className={`theme-slider ${darkMode ? "dark" : "light"}`}>
                                    <div className="theme-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="theme-light-svg"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-4 0h.01M12 4v.01M20 12h.01M12 20v.01M6.31 6.31L6.3 6.3m11.41.01l-.01-.01m0 11.4l.01.01M6.3 17.7l.01.01"
                                            />
                                        </svg>
                                    </div>

                                    <div className="theme-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="theme-dark-svg"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
                                            />
                                        </svg>
                                    </div>
                                </div>
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
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    const query = e.target.value;
                                                    setSearchQuery(query);

                                                    if (query.trim() === "") {
                                                        setSearchResults([]);
                                                        setNoMatchFound(false); 
                                                    } else {
                                                        const filtered = folderData.filter((doc) =>
                                                            doc.title.toLowerCase().includes(query.toLowerCase())
                                                        )
                                                        .slice(0, 3);

                                                        setSearchResults(filtered);
                                                        setNoMatchFound(filtered.length === 0);
                                                    }
                                                }}
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

                                {noMatchFound ? (
                                    <div className="no-results-body">
                                        <div className="no-results-main">
                                            <div className="no-results-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="no-results-icon-svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2"
                                                    >
                                                        <path 
                                                            d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"
                                                        />
                                                        <path 
                                                            d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5"
                                                        />
                                                        <path 
                                                            d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>

                                            <div className="no-results-header">
                                                <p>No media found</p>
                                            </div>

                                            <div className="no-results-text">
                                                <p>
                                                    "{searchQuery}" did not match any media. <br/> Please try again or <span>create a new media</span>.
                                                </p>
                                            </div>

                                            <div className="no-results-clear">
                                                <button
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setSearchResults([]);
                                                    }}
                                                >
                                                    Clear search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    ) : (
                                    <>
                                        <div className="search-popup-recent">
                                            <div className="search-recent-header">
                                                <p>{searchQuery.trim() ? "Search results" : "Recent"}</p>
                                            </div>

                                            <div className="search-recent-body">
                                                {(searchQuery.trim() ? searchResults : recentSearches).length === 0 ? (
                                                    <p className="search-recent-empty">
                                                        {searchQuery.trim() ? "No results found" : "No recent searches"}
                                                    </p>
                                                ) : (
                                                    (searchQuery.trim() ? searchResults : recentSearches).map((doc) => (
                                                        <div
                                                            className="search-recent-main"
                                                            key={doc.id}
                                                            onClick={() => {
                                                                addToRecentSearches(doc);
                                                                setShowSearchPopup(false);
                                                            }}
                                                    >
                                                            <div className="recent-main-icon">
                                                                <svg 
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="recent-main-icon-svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <g 
                                                                        fill="none" 
                                                                        stroke="currentColor" 
                                                                        strokeLinecap="round" 
                                                                        strokeLinejoin="round" 
                                                                        strokeWidth="2"
                                                                    >
                                                                        <path 
                                                                            d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"
                                                                        />
                                                                        <path 
                                                                            d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5"
                                                                        />
                                                                        <path 
                                                                            d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </div>

                                                            <div className="recent-main-wrapper">
                                                                <div className="recent-main-header">
                                                                    <p>{doc.title}</p>
                                                                </div>

                                                                <div className="recent-main-text">
                                                                    <p>{doc.mediatype}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        <div className="search-popup-quick">
                                            <div className="search-quick-header">
                                                <p>Quick actions</p>
                                            </div>

                                            <div className="search-quick-body">
                                                <div className="search-quick-main">
                                                    <div className="quick-main-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                            className="quick-main-icon-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <g 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                stroke-linecap="round" 
                                                                stroke-linejoin="round" 
                                                                stroke-width="2"
                                                            >
                                                                <path 
                                                                    d="M12 3c6.8 0 8.4 1.6 8.8 8.2M12 21c-7.2 0-9-1.8-9-9c0-7.2 1.8-9 9-9" 
                                                                />
                                                                <path 
                                                                    d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l4 4" 
                                                                />
                                                                <path 
                                                                    d="m14 14l1-1c.67-.644 1.45-.824 2.182-.54" 
                                                                />
                                                                <path 
                                                                    d="M16 19h6m-3-3v6" 
                                                                />
                                                                <path 
                                                                    d="M15 8h.01" 
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>

                                                    <div className="quick-main-wrapper">
                                                        <div className="quick-main-header">
                                                            <p>New media</p>
                                                        </div>

                                                        <div className="quick-main-text">
                                                            <p>Create new media</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="search-quick-main">
                                                    <div className="quick-main-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                                            className="quick-main-icon-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <g 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                stroke-linecap="round" 
                                                                stroke-linejoin="round" 
                                                                stroke-width="2"
                                                            >
                                                                <path 
                                                                    d="M12 3c6.8 0 8.4 1.6 8.8 8.2M12 21c-7.2 0-9-1.8-9-9c0-7.2 1.8-9 9-9" 
                                                                />
                                                                <path 
                                                                    d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l4 4" 
                                                                />
                                                                <path 
                                                                    d="m14 14l1-1c.67-.644 1.45-.824 2.182-.54" 
                                                                />
                                                                <path 
                                                                    d="m14 14l1-1c.679-.653 1.473-.829 2.214-.526M19 22v-6m3 3l-3-3l-3 3"
                                                                />
                                                                <path 
                                                                    d="M15 8h.01" 
                                                                />
                                                                
                                                            </g>
                                                        </svg>
                                                    </div>

                                                    <div className="quick-main-wrapper">
                                                        <div className="quick-main-header">
                                                            <p>View media</p>
                                                        </div>

                                                        <div className="quick-main-text">
                                                            <p>View all media</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="folder-body">
                    <div className="folder-body-header">
                        <div className="folder-left">
                            <div className="folder-icon">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="folder-icon-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="currentColor" 
                                        d="M9 3a1 1 0 0 1 .608.206l.1.087L12.414 6H19a3 3 0 0 1 2.995 2.824L22 9v8a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V6a3 3 0 0 1 2.824-2.995L5 3z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="folder-right">
                            <div className="folder-grid-wrapper">
                                <div  
                                className={`folder-grid grid-list ${localView === "List" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("List")}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="folder-grid-svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                                        />
                                    </svg>

                                    <span className="folder-grid-name">List</span>

                                    {localView === "List" && (
                                        <div className="slider">
                                            <div className="ball ball-list"></div>
                                        </div>
                                    )}
                                </div>

                                <div 
                                className={`folder-grid grid-layout ${localView === "Layout" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("Layout")}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="folder-grid-svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
                                        />
                                    </svg>

                                    <span className="folder-grid-name">Layout</span>

                                    {localView === "Layout" && (
                                        <div className="slider">
                                            <div className="ball ball-layout"></div>
                                        </div>
                                    )}
                                </div>

                                <div 
                                className={`folder-grid grid-compact ${localView === "Compact" ? "grid-active" : ""}`}
                                onClick={() => setLocalView("Compact")}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="folder-grid-svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                        />
                                    </svg>

                                    <span className="folder-grid-name">Compact</span>

                                    {localView === "Compact" && (
                                        <div className="slider">
                                            <div className="ball ball-compact"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Folder 
                    view={localView.toLowerCase()} 
                    data={filteredData} 
                    toggleStar={toggleStar} 
                />
            </div>
        </div>
    );
}

export default MediaFolder;
