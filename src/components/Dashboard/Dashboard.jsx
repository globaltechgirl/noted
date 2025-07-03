import React, { useState } from "react";
import './Dashboard.css';
import { useLanguage } from "../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../Context/translations";
import { useTheme } from "../../Context/ThemeContext";

function Dashboard({ }) {
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // --- Theme Toggle (Light/Dark) --- 
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                <div className="dashboard-header">
                    <div className="dashboard-header-wrapper">
                        <div className="dashboard-logo">
                           <p>Dashboard</p>
                        </div>

                        <div className="dashboard-icon">
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

                <div className="dashboard-body">
                    <div className="dashboard-main">
                        <div className="dashboard-top-main">
                            <div className="dashboard-top">
                                <div className="dashboard-top-left">
                                    <div className="dashboard-top-header">
                                        <p>Total Notes</p>
                                    </div>

                                    <div className="dashboard-top-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="dashboard-top-text">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="dashboard-top-right">
                                    <img src="/public/assets/images/folder1.png" alt="folder-img" />
                                </div>
                            </div>

                            <div className="dashboard-top">
                                <div className="dashboard-top-left">
                                    <div className="dashboard-top-header">
                                        <p>Total Files</p>
                                    </div>

                                    <div className="dashboard-top-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="dashboard-top-text">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="dashboard-top-right">
                                    <img src="/public/assets/images/folder1.png" alt="folder-img" />
                                </div>
                            </div>

                            <div className="dashboard-top">
                                <div className="dashboard-top-left">
                                    <div className="dashboard-top-header">
                                        <p>Total Tasks</p>
                                    </div>

                                    <div className="dashboard-top-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="dashboard-top-text">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="dashboard-top-right">
                                    <img src="/public/assets/images/folder1.png" alt="folder-img" />
                                </div>
                            </div>

                            <div className="dashboard-top">
                                <div className="dashboard-top-left">
                                    <div className="dashboard-top-header">
                                        <p>Total Media</p>
                                    </div>

                                    <div className="dashboard-top-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="dashboard-top-text">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="dashboard-top-right">
                                    <img src="/public/assets/images/folder1.png" alt="folder-img" />
                                </div>
                            </div>

                            <div className="dashboard-top">
                                <div className="dashboard-top-left">
                                    <div className="dashboard-top-header">
                                        <p>Total Links</p>
                                    </div>

                                    <div className="dashboard-top-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="dashboard-top-text">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="dashboard-top-right">
                                    <img src="/public/assets/images/folder1.png" alt="folder-img" />
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-middle">
                            <div className="dashboard-tasks">
                                <div className="tasks-header">
                                    <p>Today's Tasks</p>
                                </div>

                                <div className="tasks-content">
                                    <div className="tasks-content-header">
                                        <ul>
                                            <li>
                                                <p>Task Name</p>
                                            </li>

                                            <li>
                                                <p>Date</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tasks-content-wrapper">
                                        <div className="tasks-content-text">
                                            <ul>
                                                <li>
                                                    <p className="tasks-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="tasks-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tasks-content-text">
                                            <ul>
                                                <li>
                                                    <p className="tasks-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="tasks-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tasks-content-text">
                                            <ul>
                                                <li>
                                                    <p className="tasks-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="tasks-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tasks-content-text">
                                            <ul>
                                                <li>
                                                    <p className="tasks-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="tasks-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-performance">
                                <div className="performance-header">
                                    <p> Performance</p>
                                </div>

                                <div className="performance-text">
                                    <div className="performance-text-figure">
                                        <p>15</p>
                                    </div>

                                    <div className="performance-text-span">
                                        <p>
                                            <span>+5 </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="performance-content">
                                    <div className="bar-chart">
                                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                                            const heights = [40, 60, 80, 50, 90, 30, 70]; // Example values
                                            const percent = (heights[index] / 100) * 100; // Convert to % if needed

                                            return (
                                                <div className="bar-wrapper" key={day}>
                                                    <div className="bar-track">
                                                        <div
                                                            className="bar-fill"
                                                            style={{ height: `${percent}%` }}
                                                        ></div>
                                                    </div>

                                                    <p className="bar-day">{day}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-bottom">
                            <div className="dashboard-projects">
                                <div className="projects-header">
                                    <p>List Projects</p>
                                </div>

                                <div className="projects-content">
                                    <div className="projects-content-header">
                                        <ul>
                                            <li>
                                                <p>Project Name</p>
                                            </li>

                                            <li>
                                                <p>Status</p>
                                            </li>

                                            <li>
                                                <p>Date</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="projects-content-wrapper">
                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="projects-status-svg"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round" 
                                                                strokeWidth={2} 
                                                                d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223"
                                                            ></path>
                                                        </svg>
                                                        
                                                        Completed
                                                    </p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">Completed</p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">Completed</p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>
                                    
                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">Completed</p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">Completed</p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="projects-content-text">
                                            <ul>
                                                <li>
                                                    <p className="projects-name">Finalize homepage design</p>
                                                </li>

                                                <li>
                                                    <p className="projects-status">Completed</p>
                                                </li>

                                                <li>
                                                    <p className="projects-date">12 May 2024</p>
                                                </li>
                                            </ul>
                                        </div>
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

export default Dashboard;
