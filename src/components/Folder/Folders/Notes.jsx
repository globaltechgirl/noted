import React, { useState } from "react";
import "./Notes.css";
import { useLanguage } from "../../../Context/LanguageContext";
import { folderKeyMap, translations } from "../../../Context/translations";
import { useTheme } from "../../../Context/ThemeContext";
import imgLight from "../../../assets/images/note-dark.png";
import imgLock from "../../../assets/images/note-lock.png";
import imgBlack from "../../../assets/images/note-light.png";

function AllFolders({ onFolderClick }) {
  // Language context
  const { selectedLanguage } = useLanguage();
  const t = translations[selectedLanguage]?.folders || {};

  // Theme context
  const { darkMode, toggleTheme } = useTheme();

  const [folderData] = useState([
    {
      id: 1,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 2,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 3,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 4,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 5,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 6,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 7,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 8,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 9,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 10,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 11,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 12,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 13,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 14,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
    {
      id: 15,
      image: imgLight,
      title: "Notes",
      theme: "dark",
      imgAlt: "Notes",
      keyId: "notes",
    },
    {
      id: 16,
      image: imgBlack,
      title: "Personal",
      theme: "light",
      imgAlt: "Personal Notes",
      keyId: "personal",
    },
]);

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
                <div className="note-body">
                    {folderData
                        .filter(note => (darkMode ? note.theme === "dark" : note.theme === "light"))
                        .map(note => (
                            <div
                                key={note.id}
                                className={`note ${
                                    darkMode ? "note-white" : "note-black"
                                } ${note.isNew ? "note-new note-overlay" : ""} ${
                                    !darkMode && note.isNew ? "note-overlay" : ""
                                }`}
                                onClick={() => onFolderClick && onFolderClick(note.keyId)}
                                style={{ cursor: "pointer" }}
                                >

                                <div className="note-main">
                                    <div className="note-img">
                                        <img src={note.image} alt={note.imgAlt} />
                                    </div>

                                    <div className="note-details">
                                        <p className="note-title">{note.title} Notes</p>
                                        <p className="note-text">12 files</p>
                                    </div>
                                </div>
                            </div>
                    ))  }
                </div>
            </div>
        </div>
    </div>
  );
}

export default AllFolders;
