import React, { useState, useEffect } from "react";
import "./Notes.css";
import { useLanguage } from "../../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../../Context/translations";
import { useTheme } from "../../../Context/ThemeContext";

function AllFolders() {   
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // --- Theme Toggle (Light/Dark) --- 
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-header">
                    <div className="folder-header-wrapper">
                        <div className="folder-logo">
                            <p>{t[folderKeyMap["Notes"]] || "Notes"}</p>
                        </div>

                        <div className="folder-icons">
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
                </div>
                
        <div className="note-container">
            <div className="note-wrapper">
                <div className="note-body">
                    <div className="note note-white"
                    onClick={() => onFolderClick && onFolderClick("all-notes")}
                    style={{ cursor: "pointer" }}
                    >
                        <div className="note-img">
                            <img src="/src/assets/images/note-white.png" />  

                            <div className="note-overlay-text">
                                <p className="note-overlay-p">128 Notes</p>  
                            </div>
                        </div>

                        <div className="note-main">
                            <p className="note-title">All Notes</p>
                            <p className="note-text">Friday</p>
                        </div>
                    </div>

                    <div className="note note-black note-overlay"
                    onClick={() => onFolderClick && onFolderClick("personal")}
                    style={{ cursor: "pointer" }}
                    >
                        <div className="note-img">
                            <img src="/src/assets/images/note-lock.png" />  

                            <div className="note-overlay-text">
                                <p className="note-overlay-svg">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <g 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="1.5"
                                        >
                                            <path 
                                                d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z"
                                            />
                                            <path 
                                                d="M14.004 10.947V8.925c0-2.641-4.008-2.491-4.008 0v2.021m-.994 0h5.996c.553 0 1.002.453 1.002 1.011v3.032c0 .558-.449 1.011-1.002 1.011H9.002A1.006 1.006 0 0 1 8 14.99v-3.033c0-.558.449-1.01 1.002-1.01"
                                            />
                                        </g>
                                    </svg>
                                </p>

                                <p className="note-overlay-p">43 Notes</p>  
                            </div>
                        </div>

                        <div className="note-main">
                            <p className="note-title">Personal</p>
                            <p className="note-text">Wednesday</p>
                        </div>
                    </div>

                    <div className="note note-black"  
                    onClick={() => onFolderClick && onFolderClick("work")}
                    style={{ cursor: "pointer" }}
                    >
                        <div className="note-img">
                            <img src="/src/assets/images/note-black.png" />  

                            <div className="note-overlay-text">
                                <p className="note-overlay-p">65 Notes</p>  
                            </div>
                        </div>

                        <div className="note-main">
                            <p className="note-title">Work</p>
                            <p className="note-text">2/06/25</p>
                        </div>
                    </div>

                    <div className="note note-black note-overlay note-new"
                    onClick={() => onFolderClick && onFolderClick("one-folder")}
                    style={{ cursor: "pointer" }}
                    >
                        <div className="note-img">
                            <img src="/src/assets/images/note-black.png" />  

                            <div className="note-overlay-text">
                                <p className="note-overlag-svg">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
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
                                </p>

                                <p className="note-overlay-p">Create Note</p>  
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
            </div>
        </div>
    );
}

export default AllFolders;
