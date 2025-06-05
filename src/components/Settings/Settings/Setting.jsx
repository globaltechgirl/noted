import React, { useState, useEffect, useRef } from "react";
import './Setting.css';

function Settings() {
    const [username, setUsername] = useState("username");

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

    const [emailSubscription, setEmailSubscription] = useState("Subscribed");
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);
    const emailDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target)) {
                setShowEmailDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [dashboardView, setDashboardView] = useState("Compact");
    const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
    const dashboardDropdownRef = useRef(null);
    const [activeGrid, setActiveGrid] = useState("layout"); // assuming you already have this

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dashboardDropdownRef.current && !dashboardDropdownRef.current.contains(event.target)) {
                setShowDashboardDropdown(false);
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
                            <p className="settings-header-svg-wrapper">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="settings-header-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"/></svg>
                            </p>

                            <p>settings</p>
                        </div>

                        <div className="settings-icons">
                            <div className="settings-search">
                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-header-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g></svg>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-line-icon-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h2.5m4.501 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V17m0 4v1.5m3.031-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75"/></svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>Memory</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>Memory Usage</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>50 MB / 200MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-line-icon-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 21v-2a4 4 0 0 1 4-4h2m10 1c0 4-2.5 6-3.5 6S15 20 15 16c1 0 2.5-.5 3.5-1.5c1 1 2.5 1.5 3.5 1.5M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0"/></svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>Password</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>Password Updated</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 15, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-line-icon-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4m1 4l2 2l4-4"/></svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>Login Info</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>Last Login</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 4, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-line-icon-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4"/></svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>Account</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>Account Created</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>June 1, 2025</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="settings-line">
                                            <div className="settings-line-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-line-icon-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                                            </div>

                                            <div className="settings-line-details">
                                                <div className="settings-line-header">
                                                    <p>Profile</p>
                                                </div>

                                                <div className="settings-line-body">
                                                    <div className="settings-line-body-left">
                                                        <p>Display Name</p>
                                                    </div>

                                                    <div className="settings-line-body-right">
                                                        <p>globaltechgirl</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="settings-save">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-save-svg" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>
                                                <path d="m9 12l2 2l4-4"/>
                                            </g>
                                        </svg>

                                        <p>saving changes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-top-right">
                                <div className="settings-top-right1">
                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                            <p>Membership</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-membership">
                                            <div className="settings-right">
                                                <p>Membership Status</p>
                                            </div>

                                            <div className="settings-right settings-options">
                                                <p>Free Member</p>
                                            </div>                                        
                                        </div>
                                    </div>

                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                            <p>Notifications</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-login">
                                            <div className="settings-right">
                                                <p>Login Notifications</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowLoginDropdown((prev) => !prev)}
                                                ref={loginDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{loginNotification}</p>

                                                {showLoginDropdown && (
                                                    <div className="dropdown-options">
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // prevents re-opening the dropdown
                                                                setLoginNotification("Enabled");
                                                                setShowLoginDropdown(false);
                                                            }}
                                                        >
                                                            Enabled
                                                        </p>
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setLoginNotification("Not Enabled");
                                                                setShowLoginDropdown(false);
                                                            }}
                                                        >
                                                            Not Enabled
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-top-right2">
                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                            <p>Notifications</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-email">
                                            <div className="settings-right">
                                                <p>Email Notifications</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowEmailDropdown((prev) => !prev)}
                                                ref={emailDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{emailSubscription}</p>

                                                {showEmailDropdown && (
                                                    <div className="dropdown-options">
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEmailSubscription("Subscribed");
                                                                setShowEmailDropdown(false);
                                                            }}
                                                        >
                                                            Subscribed
                                                        </p>
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEmailSubscription("Not Subscribed");
                                                                setShowEmailDropdown(false);
                                                            }}
                                                        >
                                                            Not Subscribed
                                                        </p>
                                                    </div>
                                                )}
                                            </div>                                        
                                        </div>
                                    </div>

                                    <div className="settings-details">
                                        <div className="settings-details-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                            <p>Dashboard</p>
                                        </div>

                                        <div className="settings-details-right settings-details-right-options settings-details-dashboard">
                                            <div className="settings-right">
                                                <p>Dashboard View</p>
                                            </div>

                                            <div
                                                className="settings-right settings-options"
                                                onClick={() => setShowDashboardDropdown((prev) => !prev)}
                                                ref={dashboardDropdownRef}
                                                style={{ position: "relative", cursor: "pointer" }}
                                            >
                                                <p>{dashboardView}</p>

                                                {showDashboardDropdown && (
                                                    <div className="dropdown-options">
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("Layout");
                                                                setActiveGrid("layout");
                                                                localStorage.setItem("dashboardView", "layout");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            Layout
                                                        </p>
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("Compact");
                                                                setActiveGrid("compact");
                                                                localStorage.setItem("dashboardView", "compact");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            Compact
                                                        </p>
                                                        <p
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDashboardView("List");
                                                                setActiveGrid("list");
                                                                localStorage.setItem("dashboardView", "list");
                                                                setShowDashboardDropdown(false);
                                                            }}
                                                        >
                                                            List
                                                        </p>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Appearance</p>
                                    </div>

                                    <div className="settings-details-right settings-details-appearance">
                                        <div className="settings-right">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-right-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19h18M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/></svg>
                                            <p>System</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-right-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"/></svg>
                                            <p>Light</p>
                                        </div>

                                        <div className="settings-right">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="settings-right-svg settings-dark-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"/></svg>
                                            <p>Dark</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Language</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-language">
                                        <div className="settings-right">
                                            <p>English</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Enabled</p>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>

                            <div className="settings-bottom-right">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Spellchecker</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-spellchecker">
                                        <div className="settings-right">
                                            <p>American English</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Enabled</p>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Timezone</p>
                                    </div>

                                    <div className="settings-details-right settings-details-right-options settings-details-timezone">
                                        <div className="settings-right">
                                            <p>(GMT +1:00) Lagos</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Enabled</p>
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