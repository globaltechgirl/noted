import React, { useState, useRef, useEffect } from "react";

import Folder from "../Folder";
import { useTheme } from "../../../Context/ThemeContext";
import { useDashboardView } from "../GridControls/DashboardViewContext";

function OneFolder({ folderName }) {
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
            icon: "F",
            title: "Q2 Budget Review for International Holdings Ltd",
            subtitle: "Finance department internal audit summary",
            date: "12.04.25",
            starred: false
        },
        {
            id: 2,
            icon: "F",
            title: "UX Research Notes from Multi-Country Study Phase",
            subtitle: "User testing insights from April rollout",
            date: "10.05.25",
            starred: false
        },
        {
            id: 3,
            icon: "F",
            title: "Project Neon Proposal for Long-Term Infrastructure",
            subtitle: "Initial pitch deck and scope documentation",
            date: "08.05.25",
            starred: false
        },
        {
            id: 4,
            icon: "F",
            title: "Brand Guideline 2025 – Visual Identity Expansion",
            subtitle: "Updated brand colors, typography, and icons",
            date: "01.05.25",
            starred: false
        },
        {
            id: 5,
            icon: "F",
            title: "Confidential Agreement For NovaTech CeloCorp",
            subtitle: "Signed legal documentation with NDAs enclosed",
            date: "15.05.25",
            starred: false
        },
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

            const [searchStep, setSearchStep] = useState(0);
            const [taskStep, setTaskStep] = useState(0);
const touchStartXRef = useRef(0);
const touchEndXRef = useRef(0);
    const [taskInputs, setTaskInputs] = useState([""]);
    const [editingIndex, setEditingIndex] = useState(null);


    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-header">
                    <div className="folder-header-wrapper">
                        <div className="folder-logo">
                            <p>{folderName || "Note"}</p>
                        </div>

                        <div className="folder-icons">
                            <div className="folder-search" onClick={() => setShowSearchPopup(true)}>
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
                                        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                                    />
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
                                <div className="search-popup-content">
                                    <div className={`search-popup-top ${searchStep === 1 ? "hide-search-top" : ""}`}>
                                        <div className="search-popup-input">
                                             <div className="search-input-box">
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
                                    </div>

                                    <div className="search-popup-middle">
                                        <div className="search-popup-middle-wrapper">
                                            <div 
                                                className="popup-middle-slider"
                                                style={{
                                                    transform: `translateX(-${searchStep * 100}%)`,
                                                }}
                                                onTouchStart={(e) => {
                                                    touchStartXRef.current = e.touches[0].clientX;
                                                }}
                                                onTouchMove={(e) => {
                                                    touchEndXRef.current = e.touches[0].clientX;
                                                }}
                                                onTouchEnd={() => {
                                                    const deltaX = touchEndXRef.current - touchStartXRef.current;

                                                    if (deltaX > 30 && searchStep > 0) {
                                                        setSearchStep((prev) => prev - 1);
                                                    }

                                                    if (deltaX < -30 && searchStep < 1) {
                                                        setSearchStep((prev) => prev + 1);
                                                    }

                                                    touchStartXRef.current = 0;
                                                    touchEndXRef.current = 0;
                                                }}
                                            >
                                                <div className="middle-slider-page middle-slider-list">
                                                    <div className="search-popup-text">
                                                        <div className="popup-text-header">
                                                            <p>Search Results</p>

                                                            <div className="popup-text-header-icons">
                                                                <div onClick={() => setShowSearchPopup(false)} className="close-icon">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="popup-text-header-svg"
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
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="popup-text-contents-wrapper">
                                                            {searchQuery.trim() === "" || noMatchFound ? (
                                                                <div className="popup-no-body">
                                                                    <div className="popup-no-main">
                                                                        <div className="popup-no-icon">
                                                                            <img
                                                                                src={darkMode 
                                                                                    ? "/assets/images/notes-dark.png" 
                                                                                    : "/assets/images/notes-light.png"}
                                                                                alt="Notes illustration"
                                                                            />
                                                                        </div>

                                                                        <div className="popup-no-header">
                                                                            <p>
                                                                                {searchQuery.trim()
                                                                                    ? "No results found"
                                                                                    : "No search results"}
                                                                            </p>
                                                                        </div>

                                                                        <div className="popup-no-text">
                                                                            <p>
  {searchQuery.trim() ? (
    <>
      "{searchQuery}" didn’t match any files in this note.{" "}
      <span
        onClick={() => navigate("./Notes.jsx")}
        style={{ color: "#3b82f6", cursor: "pointer", textDecoration: "underline" }}
      >
        Check a different note.
      </span>
    </>
  ) : (
    "Type a keyword in the search bar above to search within this note."
  )}
</p>

                                                                        </div>

                                                                        <div className="popup-no-clear">
                                                                            <button
                                                                                onClick={() => {
                                                                                    setSearchQuery("");
                                                                                    setSearchResults([]);
                                                                                }}
                                                                            >
                                                                                {searchQuery.trim() ? "Clear search" : "Start search"}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                searchResults.map((doc) => (
                                                                    <div
                                                                        className="popup-text-contents"
                                                                        key={doc.id}
                                                                        onClick={() => {
                                                                            addToRecentSearches(doc);
                                                                            setShowSearchPopup(false);
                                                                        }}
                                                                    >
                                                                        <div className="popup-text-item">
                                                                            <p className="popup-text-item-p">{doc.title}</p>
                                                                            <p className="popup-text-sub">{doc.subtitle}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div> 
                                                </div>

                                                <div className="middle-slider-page middle-slider-list">
                                                    <div className="search-popup-text">
                                                        <div className="popup-text-header">
                                                            <p>Recent Searches</p>

                                                            <div className="popup-text-header-icons">
                                                                <div onClick={() => setShowSearchPopup(false)} className="close-icon">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="popup-text-header-svg"
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
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="popup-text-contents-wrapper">
                                                            {(searchQuery.trim() ? searchResults : recentSearches).length === 0 ? (
                                                               <div className="popup-no-body">
                                                                    <div className="popup-no-main">
                                                                        <div className="popup-no-icon">
                                                                            <img
                                                                                src={darkMode 
                                                                                    ? "/assets/images/notes-dark.png" 
                                                                                    : "/assets/images/notes-light.png"
                                                                                }
                                                                                alt="Notes illustration"
                                                                            />
                                                                        </div>

                                                                        <div className="popup-no-header">
                                                                            <p>No recent searches</p>
                                                                        </div>

                                                                        <div className="popup-no-text">
                                                                            <p>
                                                                                You have no recent searches. <br />
                                                                                Enter a keyword in the search bar.  
                                                                            </p>
                                                                        </div>

                                                                        <div className="popup-no-clear">
                                                                            <button
                                                                                onClick={() => setSearchStep(0)}
                                                                            >
                                                                                Start search
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                (searchQuery.trim() ? searchResults : recentSearches).map((doc) => (
                                                                    <div
                                                                        className="popup-text-contents"
                                                                        key={doc.id}
                                                                        onClick={() => {
                                                                            addToRecentSearches(doc);
                                                                            setShowSearchPopup(false);
                                                                        }}
                                                                    >
                                                                        <div className="popup-text-item">
                                                                            <p className="popup-text-item-p">{doc.title}</p>
                                                                            <p className="popup-text-sub">{doc.subtitle}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                   <div className="tasks-popup-bottom">
                                        {searchStep === 0 ? (
                                            <div 
                                                className="tasks-slider-button" 
                                                onClick={() => setSearchStep(1)}
                                            >
                                                <p>Recent searches</p>
                                            </div>
                                        ) : (
                                            <div 
                                                className="tasks-slider-button" 
                                                onClick={() => setSearchStep(0)}
                                            >
                                                <p>Search results</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
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

export default OneFolder;
