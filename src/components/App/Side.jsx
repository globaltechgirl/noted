import React, { useState } from "react";

function Side({ onSectionClick }) {
    const [activeSection, setActiveSection] = useState("note");

    const handleClick = (sectionName) => {
        setActiveSection(sectionName);
        if (onSectionClick) onSectionClick(sectionName); 
    };

    return (
        <div className = "side">
            <div className="side-header">
                <div className="side-header-wrapper">
                    <div className="side-logo">
                        <img src="/src/assets/images/logo.png" />
                    </div>

                    <div className="side-user-max" onClick={() => handleClick("profile")} style={{ cursor: "pointer" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="side-user-max-svg" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>
                                <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="side-body-wrapper">
                <div className="side-body">
                    <ul>
                        <li onClick={() => handleClick("note")} className={activeSection === "note" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="m19 8.71l-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.67 2.67 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105"/>
                                    <path d="M16 15c-2.21 1.333-5.792 1.333-8 0"/>
                                    </g>
                                </svg>
                                <span>Home</span>
                            </div>
                            {activeSection === "note" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("all-notes")} className={activeSection === "all-notes" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>
                                <span>All Notes</span>
                            </div>
                            {activeSection === "all-notes" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("daily")} className={activeSection === "daily" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>
                                <span>Daily</span>
                            </div>
                            {activeSection === "daily" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("personal")} className={activeSection === "personal" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>
                                <span>Personal</span>
                            </div>
                            {activeSection === "personal" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("work")} className={activeSection === "work" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>
                                <span>Work</span>
                            </div>
                            {activeSection === "work" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("media-folder")} className={activeSection === "media-folder" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"/><path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5"/><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5"/></g></svg>
                                <span>Media</span>
                            </div>
                            {activeSection === "media-folder" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("link-folder")} className={activeSection === "link-folder" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/></svg>
                                <span>Links</span>
                            </div>
                            {activeSection === "link-folder" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>

                        <li onClick={() => handleClick("settings")} className={activeSection === "settings" ? "active" : ""}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="side-body-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g></svg>
                                <span>Settings</span>
                            </div>
                            {activeSection === "settings" && <svg xmlns="http://www.w3.org/2000/svg" className="side-active-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/></svg>}
                        </li>
                    </ul>
                </div>
            </div>

            <div
                className={`side-user ${activeSection === "profile" ? "active" : ""}`}
                onClick={() => handleClick("profile")}
                style={{ cursor: "pointer" }}
            >
                <div className="side-user-wrapper">
                    <div className="side-user-main">
                        <div className="side-user-image">
                            <img src="/src/assets/images/user.png" alt="user" />
                        </div>

                        <div className="side-user-details">
                            <div className="side-user-name">
                                <p>Mike Storm</p>
                            </div>

                            <div className="side-user-title">
                                <p>Free</p>
                            </div>
                        </div>
                    </div>

                    <div className="side-user-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="side-user-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Side;