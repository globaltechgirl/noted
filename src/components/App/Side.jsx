import React, { useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { translations } from  "../../Context/translations";

function Side({ onSectionClick }) {
    // Active Section State
    const [activeSection, setActiveSection] = useState("note");

    // --- Language Selection ---
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.side || {};

    // Menu Item Click
    const handleClick = (sectionName) => {
        setActiveSection(sectionName);
        if (onSectionClick) onSectionClick(sectionName); 
    };

    // Side Menu Items

    const groupedMenuItems = {
        top: [
            {
                key: "dashboard",
                label: t.home || "Dashboard",
                icon:       
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <g 
                            fill="currentColor"
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2}
                        >
                            <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path>
                            <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"></path>
                        </g>
                    </svg>,
            },
        ],
        middle: [
            {
                key: "notes",
                label: t.allNotes || "Notes",
                icon: (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
                    </svg>
                ),
            },
            {
                key: "tasks",
                label: "Tasks",
                icon: (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                            <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"></path>
                        </g>
                    </svg>
                ),
            },
            {
                key: "link-folder",
                label: t.links || "Links",
                icon: (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="m9 15 6-6m-4-3 .463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5-.397.534a5.07 5.07 0 0 1-7.127 0 4.97 4.97 0 0 1 0-7.071L6 11" />
                    </svg>
                ),
            },
            {
                key: "media-folder",
                label: t.media || "Media",
                icon: (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"></path>
                            <path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5"></path>
                            <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3"></path>
                        </g>
                    </svg>
                ),
            },
        ],
        bottom: [
            {
              key: "profile",
              label: "Profile",
              icon: (
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="side-menu-svg" 
                      viewBox="0 0 24 24"
                  >
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                          <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"></path>
                      </g>
                  </svg>
              ),
            },
            {
                key: "settings",
                label: t.settings || "Settings",
                icon: (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="side-menu-svg" 
                        viewBox="0 0 24 24"
                    >
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z"></path>
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"></path>
                        </g>
                    </svg>
                ),
            },
        ],
    };

0



const subMenus = {
  notes: [
    {
      key: "daily",
      label: "Daily",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <path fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
        </svg>
      ),
    },
    {
      key: "personal",
      label: "Personal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <path fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
        </svg>
      ),
    },
    {
      key: "work",
      label: "Work",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <path fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>
        </svg>
      ),
    },
  ],
  daily: [
    {
      key: "dailyTasks",
      label: "Daily Tasks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <g fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2"/>
            <path d="M9 17v-5m3 5v-1m3 1v-3"></path>
          </g>
        </svg>
      ),
    },
    {
      key: "workTasks",
      label: "Work Tasks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <g fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2"/>
            <path d="M9 17v-4m3 4v-2m3 2v-3"></path>
          </g>
        </svg>
      ),
    },
  ],
  settings: [
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <g fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z"/>
            <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
          </g>
        </svg>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <path fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"/>
        </svg>
      ),
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="side-submenu-svg" viewBox="0 0 24 24">
          <path fill="#bcbdbf" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11c0-3.07-1.64-5.64-5-6.32V4a1 1 0 0 0-2 0v.68C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1h6z"/>
        </svg>
      ),
    },
  ],
};

    return (
        <div className = "side">
            <div className="side-menu">
                <div className="side-header">
                    <div className="side-header-wrapper">
                        <div className="side-logo">
                            <img src="/src/assets/images/noted.png" />
                        </div>

                        <div className="side-logo-svgs">
                            <div className="side-user-max" onClick={() => handleClick("profile")} style={{ cursor: "pointer" }}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="side-user-max-svg" 
                                    viewBox="0 0 24 24">
                                    <g 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2"
                                    >
                                        <path 
                                            d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"
                                        />
                                        <path 
                                            d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="side-menu-body">
                    <ul className="side-menu-section">
                        {groupedMenuItems.top.map(({ key, label, icon }) => (
                            <li
                                key={key}
                                onClick={() => handleClick(key)}
                                className={activeSection === key ? "active" : ""}
                            >
                                <div className="side-menu-item">
                                    {icon}
                                    <span className="side-menu-label">{label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <ul className="side-menu-section">
                        {groupedMenuItems.middle.map(({ key, label, icon }) => (
                            <li
                                key={key}
                                onClick={() => handleClick(key)}
                                className={activeSection === key ? "active" : ""}
                            >
                                <div className="side-menu-item">
                                  {icon}
                                  <span className="side-menu-label">{label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <ul className="side-menu-section">
                        {groupedMenuItems.bottom.map(({ key, label, icon }) => (
                            <li
                                key={key}
                                onClick={() => handleClick(key)}
                                className={activeSection === key ? "active" : ""}
                            >
                                <div className="side-menu-item">
                                    {icon}
                                    <span className="side-menu-label">{label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="side-menu-user">
                    <div className="side-menu-user-img">
                        <img src="/src/assets/images/user.png" alt="user-png" />
                    </div>
                </div>
            </div>

            <div className="submenu">
                {subMenus[activeSection] && (
                    <div className="side-submenu-body">
                        <ul>
                            {subMenus[activeSection].map(({ key, label, icon }) => (
                                <li
                                    key={key}
                                    onClick={() => handleClick(key)}
                                    className={activeSection === key ? "active" : ""}
                                >
                                    <div className="side-submenu-item">
                                        {icon}
                                        <span>{label}</span>

                                        <div className="side-submenu-figure">
                                            <p>20</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Side;