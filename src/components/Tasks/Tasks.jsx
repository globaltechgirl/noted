import React, { useState } from "react";
import './Tasks.css';
import { useLanguage } from "../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../Context/translations";
import { useTheme } from "../../Context/ThemeContext";

function Tasks ({ }) {
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // Theme context
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="tasks-container">
            <div className="tasks-wrapper">
                <div className="tasks-header">
                    <div className="tasks-header-wrapper">
                        <div className="tasks-logo">
                           <p>Tasks</p>
                        </div>

                        <div className="tasks-icons">
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

                <div className="tasks-body">
                    <div className="tasks-body-header">
                        <div className="tasks-left">
                            <div className="tasks-icon">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-icon-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <g 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                    >
                                        <path 
                                            d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
                                        ></path>
                                        <path 
                                            d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="tasks-right">
                            <div className="tasks-toggle">
                                <p>Last month</p>

                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-toggle-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="m6 9l6 6l6-6"
                                    ></path>
                                </svg>
                            </div>

                            <div className="tasks-search">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-search-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                                    ></path>
                                </svg>
                            </div>

                            <div className="tasks-menu">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-menu-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="tasks-main">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
