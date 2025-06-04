import React, { useState, useEffect, useRef } from "react";
import './Setting.css';

function Settings() {
    const [username, setUsername] = useState("username");

    const [editingField, setEditingField] = useState(null);

    // Hide input editing field on outside click
    useEffect(() => {
        function handleClickOutsideField(event) {
            if (
                editingField === "fullName" &&
                fullNameRef.current &&
                !fullNameRef.current.contains(event.target)
            ) {
                setEditingField(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutsideField);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideField);
        };
    }, [editingField]);

    // Edit icon component
    function EditIcon({ field }) {
        return (
            <div
                className="profile-details-edit"
                onClick={() => setEditingField(field)}
                title="Edit"
                style={{ cursor: "pointer" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="profile-edit-svg" viewBox="0 0 24 24">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4M16 19h6"
                    />
                </svg>
            </div>
        );
    }

    // Save field and close editing
    const handleSave = (field) => {
        setEditingField(null);
    };
    
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
                        <div className="settings">
                            <div className="settings-headers">
                                <p className="settings-headers-text">
                                    Account Settings
                                </p>
                            </div>

                            <div className="settings-details-wrapper">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>On Startup</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>Default Page</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Last visited page</p>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Dashboard</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>Default Dashboard View</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Compact</p>
                                        </div>                                        
                                    </div>
                                </div>

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
                            </div>
                        </div>
                        
                        <div className="settings">
                            <div className="settings-headers">
                                <p className="settings-headers-text">
                                    Account Settings
                                </p>
                            </div>

                            <div className="settings-details-wrapper">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Notifications</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>Login Notifications</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Enabled</p>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Notifications</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>Email Notifications</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Subscribed</p>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Membership</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>Membership Status</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Free Member</p>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="settings">
                            <div className="settings-headers">
                                <p className="settings-headers-text">
                                    Preferences
                                </p>
                            </div>

                            <div className="settings-details-wrapper">
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Language</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
                                        <div className="settings-right">
                                            <p>English</p>
                                        </div>

                                        <div className="settings-right settings-options">
                                            <p>Enabled</p>
                                        </div>                                        
                                    </div>
                                </div>
                                
                                <div className="settings-details">
                                    <div className="settings-details-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="settings-left-svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 6.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M12 8a3 3 0 1 0-2.905-3.75H1.75a.75.75 0 0 0 0 1.5h7.345A3 3 0 0 0 12 8m-6.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m1.405.75A3.001 3.001 0 0 1 1 11a3 3 0 0 1 5.905-.75h7.345a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/></svg>
                                        <p>Spellchecker</p>
                                    </div>

                                    <div className="settings-details-right settings-details-language">
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

                                    <div className="settings-details-right settings-details-timezone">
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