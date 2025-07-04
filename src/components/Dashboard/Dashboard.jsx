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

    const dashboardStats = [
        {
            title: "Total Notes",
            figure: 15,
            change: "+ 15",
            imgLight: "/assets/images/notes-light.png",
            imgDark: "/assets/images/notes-dark.png",
        },
        {
            title: "Total Files",
            figure: 15,
            change: "+ 15",
            imgLight: "/assets/images/notes-light.png",
            imgDark: "/assets/images/notes-dark.png",
        },
        {
            title: "Total Tasks",
            figure: 15,
            change: "+ 15",
            imgLight: "/assets/images/notes-light.png",
            imgDark: "/assets/images/notes-dark.png",
        },
        {
            title: "Total Media",
            figure: 15,
            change: "+ 15",
            imgLight: "/assets/images/notes-light.png",
            imgDark: "/assets/images/notes-dark.png",
        },
        {
            title: "Total Links",
            figure: 15,
            change: "+ 15",
            imgLight: "/assets/images/notes-light.png",
            imgDark: "/assets/images/notes-dark.png",
        },
    ];

    const taskList = [
        {
            name: "Finalize homepage design",
            due: "12 December 2024",
            status: {
            label: "Completed",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tasks-status-svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2}
                    >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path>
                        <path d="m9 12l2 2l4-4"></path>
                    </g>
                </svg>
            ),
            },
        },
        {
            name: "Design dashboard UI",
            due: "19 May 2024",
            status: {
            label: "In Progress",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tasks-status-svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223"
                    />
                </svg>
            ),
            },
        },
        {
            name: "Update landing page content",
            due: "22 September 2024",
            status: {
            label: "On Hold",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tasks-status-svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20.777a9 9 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a9 9 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A9 9 0 0 1 10 3.223M12 8v4m0 4v.01"
                    />
                </svg>
            ),
            },
        },
        {
            name: "Finalize homepage design",
            due: "12 May 2024",
            status: {
            label: "Completed",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tasks-status-svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2}
                    >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path>
                        <path d="m9 12l2 2l4-4"></path>
                    </g>
                </svg>
            ),
            },
        },
    ];

    const performanceStats = {
        figure: 15,
        change: "+ 5",
    };

    const performanceChartData = [
        { day: "Mon", height: 40 },
        { day: "Tue", height: 60 },
        { day: "Wed", height: 80 },
        { day: "Thu", height: 50 },
        { day: "Fri", height: 90 },
        { day: "Sat", height: 30 },
        { day: "Sun", height: 70 },
    ];

    const fileList = [
        {
            name: "Finalize homepage design",
            date: "12 December 2024",
            source: {
                label: "Work",
                svg: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="file-source-svg"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"
                        ></path>
                    </svg>
                ),
            },
        },
        {
            name: "Design dashboard UI",
            date: "19 May 2024",
            source: {
                label: "Personal",
                svg: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="file-source-svg"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"
                        ></path>
                    </svg>
                ),
            },
        },
        {
            name: "Update landing page content",
            date: "22 September 2024",  
            source: {
                label: "Daily",
                svg: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="file-source-svg"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"
                        ></path>
                    </svg>
                ),
            },
        },
        {
            name: "Design dashboard UI",
            date: "19 May 2024",
            source: {
                label: "Personal",
                svg: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="file-source-svg"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"
                        ></path>
                    </svg>
                ),
            },
        },
        {
            name: "Update landing page content",
            date: "22 September 2024",  
            source: {
                label: "Daily",
                svg: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="file-source-svg"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="m5 19l2.757-7.351A1 1 0 0 1 8.693 11H21a1 1 0 0 1 .986 1.164l-.996 5.211A2 2 0 0 1 19.026 19za2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v2"
                        ></path>
                    </svg>
                ),
            },
        },
    ];

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
                            {dashboardStats.map((item, index) => (
                                <div className="dashboard-top" key={index}>
                                    <div className="dashboard-top-icons">
                                        <img
                                            src={darkMode ? item.imgDark : item.imgLight}
                                            alt={`${item.title.toLowerCase()} image`}
                                        />

                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className ="dashboard-svg"
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

                                    <div className="dashboard-top-info">
                                        <div className="dashboard-top-header">
                                            <p>{item.title}</p>
                                        </div>

                                        <div className="dashboard-text">
                                            <div className="dashboard-figure">
                                                <p>{item.figure}</p>
                                            </div>

                                            <div className="dashboard-change">
                                                <p>{item.change}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                                <p>Status</p>
                                            </li>

                                            <li>
                                                <p>Due</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tasks-content-wrapper">
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const task = taskList[index];
                                            return task ? (
                                                <div className="tasks-content-text" key={index}>
                                                    <ul>
                                                        <li>
                                                            <p className="tasks-name">{task.name}</p>
                                                        </li>

                                                        <li>
                                                            <p className="tasks-status">
                                                                {task.status.svg}
                                                                {task.status.label}
                                                            </p>
                                                        </li>
                                                        
                                                        <li>
                                                            <p className="tasks-due">{task.due}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="tasks-content-text add-task" key={`add-${index}`}>
                                                    <ul>
                                                        <li className="add-task-wrapper">
                                                            <p className="add-task-message">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="add-task-svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m6 0h6m-3-3v6"
                                                                    />
                                                                </svg>
                                                                
                                                                Add Task
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-performance">
                                <div className="performance-header">
                                    <p> Performance</p>
                                </div>

                                <div className="performance-text">
                                    <div className="performance-text-figure">
                                        <p>{performanceStats.figure}</p>
                                    </div>

                                    <div className="performance-text-span">
                                        <p>
                                            <span>{performanceStats.change}% </span>
                                            vs last month
                                        </p>
                                    </div>
                                </div>

                                <div className="performance-content">
                                    <div className="bar-chart">
                                        {performanceChartData.map(({ day, height }) => (
                                            <div className="bar-wrapper" key={day}>
                                                <div className="bar-track">
                                                    <div
                                                        className="bar-fill"
                                                        style={{ height: `${height}%` }}
                                                    ></div>
                                                </div>

                                                <p className="bar-day">{day}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-bottom">
                            <div className="dashboard-file">
                                <div className="file-header">
                                    <p>File List</p>
                                </div>

                                <div className="file-content">
                                    <div className="file-content-header">
                                        <ul>
                                            <li>
                                                <p>File Name</p>
                                            </li>

                                            <li>
                                                <p>Source</p>
                                            </li>

                                            <li>
                                                <p>Date</p>
                                            </li>
                                        </ul>
                                    </div>
 
                                    <div className="file-content-wrapper">
                                        {fileList.slice(0, 10).map((file, index) => (
                                            <div className="file-content-text" key={index}>
                                                <ul>
                                                    <li>
                                                        <p className="file-name">{file.name}</p>
                                                    </li>

                                                    <li>
                                                        <p className="file-source">
                                                            {file.source.svg}
                                                            {file.source.label}
                                                        </p>
                                                    </li>

                                                    <li>
                                                        <p className="file-date">{file.date}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
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
