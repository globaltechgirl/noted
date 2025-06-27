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
const menuItems = [
  {
    key: "dashboard",
    label: t.home || "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m0 12h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1m10-4h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1m0-8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1" />
      </svg>
    ),
  },
  {
    key: "notes",
    label: t.allNotes || "Notes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
      </svg>
    ),
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2" />
          <path d="M9 17v-5m3 5v-1m3 1v-3" />
        </g>
      </svg>
    ),
  },
  {
    key: "media-folder",
    label: t.media || "Media",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M15 8h.01M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9" />
          <path d="M3.5 15.5L8 11c.928-.893 2.072-.893 3 0l5 5" />
          <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l2.5 2.5" />
        </g>
      </svg>
    ),
  },
  {
    key: "link-folder",
    label: t.links || "Links",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="m9 15 6-6m-4-3 .463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5-.397.534a5.07 5.07 0 0 1-7.127 0 4.97 4.97 0 0 1 0-7.071L6 11" />
      </svg>
    ),
  },
  {
    key: "settings",
    label: t.settings || "Settings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="side-menu-svg" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <path d="M19.875 6.27A2.23 2.23 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
        </g>
      </svg>
    ),
  },
];




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
                    <ul>
                        {menuItems.map(({ key, label, icon }) => (
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
                        <img src="" alt="" />
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