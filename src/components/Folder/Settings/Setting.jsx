import React, { useState, useEffect, useRef } from "react";
import './Setting.css';
import { useLanguage } from "../../../Context/LanguageContext.jsx";
import { settingsKeyMap, translations } from  "../../../Context/translations.js";
import { useTheme } from "../../../Context/ThemeContext";
import { useDashboardView } from "../GridControls/DashboardViewContext.jsx";

function Settings() {  
    // --- Theme Toggle (Light/Dark) --- 
    const { darkMode, toggleTheme } = useTheme();
      
    // --- Username ---
    const [username, setUsername] = useState("username");

    // --- Login Notification ---
    const [loginNotification, setLoginNotification] = useState("Enabled");
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const loginDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutsideDropdown(event) {
            if (
                loginDropdownRef.current &&
                !loginDropdownRef.current.contains(event.target)
            ) {
                setShowLoginDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, []);

    // --- Email Subscription ---
    const [emailSubscription, setEmailSubscription] = useState("Subscribed");
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);
    const emailDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emailDropdownRef.current &&
                !emailDropdownRef.current.contains(event.target)
            ) {
                setShowEmailDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // --- Dashboard View ---
    const { dashboardView, setDashboardView } = useDashboardView();
    const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
    const dashboardDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dashboardDropdownRef.current &&
                !dashboardDropdownRef.current.contains(event.target)
            ) {
                setShowDashboardDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // --- Language Selection ---
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const { selectedLanguage, setSelectedLanguage, languages } = useLanguage();
    const languageDropdownRef = useRef(null);
    const t = translations[selectedLanguage]?.settings || {};

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                languageDropdownRef.current &&
                !languageDropdownRef.current.contains(event.target)
            ) {
                setShowLanguageDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="settings-container">
            <div className="settings-wrapper">
                <div className="settings-header">
                    <div className="settings-header-wrapper">
                        <div className="settings-logo">
                           <p>Settings</p>
                        </div>

                        <div className="settings-icon">
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

                <div className="settings-body">
                    <div className="settings-main">
                        <div className="settings-top">
                            <div className="settings-top-left">
                                <div className="settings-user-wrapper">
                                    <div className="settings-user">
                                        <img src="/src/assets/images/user.png" alt="user-png" />
                                    </div>
                                </div>

                                <div className="settings-line-wrapper">
                                    <div className="settings-line-main">
                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="settings-line-icon-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h2.5m4.501 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V17m0 4v1.5m3.031-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>{t[settingsKeyMap["Memory"]] || "Memory"}</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>{t[settingsKeyMap["Memory Usage"]] || "Memory Usage"}</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>50 MB / 200MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="settings-line-icon-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M6 21v-2a4 4 0 0 1 4-4h2m10 1c0 4-2.5 6-3.5 6S15 20 15 16c1 0 2.5-.5 3.5-1.5c1 1 2.5 1.5 3.5 1.5M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>{t[settingsKeyMap["Password"]] || "Password"}</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>{t[settingsKeyMap["Password Updated"]] || "Password Updated"}</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 15, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="settings-line-icon-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4m1 4l2 2l4-4"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>{t[settingsKeyMap["Login Info"]] || "Login Info"}</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>{t[settingsKeyMap["Last Login"]] || "Last Login"}</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 4, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="settings-line-icon-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>{t[settingsKeyMap["Account"]] || "Account"}</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>{t[settingsKeyMap["Account Created"]] || "Account Created"}</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 1, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="settings-line-icon-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none"
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>{t[settingsKeyMap["Profile"]] || "Profile"}</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>{t[settingsKeyMap["Display Name"]] || "Display Name"}</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>globaltechgirl</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-save">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="settings-save-svg" 
                                            viewBox="0 0 24 24"
                                        >
                                            <g 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2"
                                            >
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>
                                                <path d="m9 12l2 2l4-4"/>
                                            </g>
                                        </svg>

                                        <p>{t[settingsKeyMap["Saving Changes"]] || "Saving Changes"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-top-right">
                                <div className="settings-top-right1">
                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-left-svg" 
                                                viewBox="0 0 16 16"
                                            >
                                                <path 
                                                    fill="currentColor" 
                                                    fillRule="evenodd" 
                                                    d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Membership"]] || "Membership"}</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-membership">
                                            <div className="settings-right">
                                                <p>{t[settingsKeyMap["Membership Status"]] || "Membership Status"}</p>
                                            </div>

                                            <div className="settings-right settings-options">
                                                <p>{t[settingsKeyMap["Free Member"]] || "Free Member"}</p>
                                            </div>                                        
                                        </div>
                                    </div>

                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-left-svg" 
                                                viewBox="0 0 16 16"
                                            >
                                                <path 
                                                    fill="currentColor" 
                                                    fillRule="evenodd" 
                                                    d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Notifications"]] || "Notifications"}</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-login">
                                            <div className="settings-right">
                                                <p>{t[settingsKeyMap["Login Notifications"]] || "Login Notifications"}</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowLoginDropdown((prev) => !prev)}
                                                ref={loginDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{t[settingsKeyMap[loginNotification]] || loginNotification}</p>

                                                {showLoginDropdown && (
                                                    <div className="dropdown-options">
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation(); 
                                                                setLoginNotification("Enabled");
                                                                setShowLoginDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Enabled"]] || "Enabled"}
                                                        </div>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setLoginNotification("Not Enabled");
                                                                setShowLoginDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Not Enabled"]] || "Not Enabled"}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-top-right2">
                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-left-svg" 
                                                viewBox="0 0 16 16"
                                            >
                                                <path 
                                                    fill="currentColor" 
                                                    fillRule="evenodd" 
                                                    d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Notifications"]] || "Notifications"}</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-email">
                                            <div className="settings-right">
                                                <p>{t[settingsKeyMap["Email Notifications"]] || "Email Notifications"}</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowEmailDropdown((prev) => !prev)}
                                                ref={emailDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{t[settingsKeyMap[emailSubscription]] || emailSubscription}</p>

                                                {showEmailDropdown && (
                                                    <div className="dropdown-options">
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEmailSubscription("Subscribed");
                                                                setShowEmailDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Subscribed"]] || "Subscribed"}
                                                        </div>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEmailSubscription("Not Subscribed");
                                                                setShowEmailDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Not Subscribed"]] || "Not Subscribed"}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>                                        
                                        </div>
                                    </div>

                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-left-svg" 
                                                viewBox="0 0 16 16"
                                            >
                                                <path 
                                                    fill="currentColor" 
                                                    fillRule="evenodd" 
                                                    d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Dashboard"]] || "Dashboard"}</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-dashboard">
                                            <div className="settings-right">
                                                <p>{t[settingsKeyMap["Dashboard View"]] || "Dashboard View"}</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowDashboardDropdown(prev => !prev)}
                                                ref={dashboardDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{t[settingsKeyMap[dashboardView]] || dashboardView}</p>

                                                {showDashboardDropdown && (
                                                    <div className="dropdown-options">
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("List");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["List"]] || "List"}
                                                        </div>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("Layout");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Layout"]] || "Layout"}
                                                        </div>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("Compact");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            {t[settingsKeyMap["Compact"]] || "Compact"}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="settings-bottom"> 
                            <div className="settings-bottom-left">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="settings-left-svg" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path 
                                                fill="currentColor" 
                                                fillRule="evenodd" 
                                                d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <p>{t[settingsKeyMap["Appearance"]] || "Appearance"}</p>
                                    </div>

                                    <div className="settings-details-right settings-details-appearance">
                                        <div className="settings-right">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-right-svg" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M3 19h18M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["System"]] || "System"}</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-right-svg" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Light"]] || "Light"}</p>
                                        </div>

                                        <div className="settings-right">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="settings-right-svg settings-dark-svg" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
                                                />
                                            </svg>

                                            <p>{t[settingsKeyMap["Dark"]] || "Dark"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="settings-left-svg" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path 
                                                fill="currentColor" 
                                                fillRule="evenodd" 
                                                d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <p>{t[settingsKeyMap["Language"]] || "Language"}</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-language">
                                        <div className="settings-right">
                                            <p>{languages.find(lang => lang.code === selectedLanguage)?.label || selectedLanguage}</p>
                                        </div>

                                        <div
                                            className="settings-right settings-options"
                                            onClick={() => setShowLanguageDropdown((prev) => !prev)}
                                            ref={languageDropdownRef}
                                            style={{ position: "relative", cursor: "pointer" }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={e => {
                                                if (e.key === "Enter" || e.key === " ") setShowLanguageDropdown(prev => !prev);
                                            }}
                                        >
                                            <p>{t[settingsKeyMap["Enabled"]] || "Enabled"}</p>

                                            {showLanguageDropdown && (
                                                <div className="dropdown-options">
                                                    {languages.map((lang) => (
                                                        <div
                                                            key={lang}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedLanguage(lang.code);
                                                                setShowLanguageDropdown(false);
                                                            }}
                                                            role="button"
                                                            tabIndex={0}
                                                            onKeyDown={e => {
                                                                if (e.key === "Enter" || e.key === " ") {
                                                                    e.stopPropagation();
                                                                    setSelectedLanguage(lang.code);
                                                                    setShowLanguageDropdown(false);
                                                                }
                                                            }}
                                                            className={lang.code === selectedLanguage ? "selected" : ""}
                                                        >
                                                            {lang.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-bottom-right">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="settings-left-svg" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path 
                                                fill="currentColor" 
                                                fillRule="evenodd" 
                                                d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <p>{t[settingsKeyMap["Spellchecker"]] || "Spellchecker"}</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-spellchecker">
                                        <div className="settings-right">
                                            <p>American English</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>{t[settingsKeyMap["Enabled"]] || "Enabled"}</p>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="settings-left-svg" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path 
                                                fill="currentColor" 
                                                fillRule="evenodd" 
                                                d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" 
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        
                                        <p>{t[settingsKeyMap["Timezone"]] || "Timezone"}</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-timezone">
                                        <div className="settings-right">
                                            <p>(GMT +1:00) Lagos</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>{t[settingsKeyMap["Enabled"]] || "Enabled"}</p>
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

export default Settings;