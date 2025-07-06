import React, { useState } from "react";
import "./Notes.css";
import { useLanguage } from "../../../Context/LanguageContext";
import { folderKeyMap, translations } from "../../../Context/translations";
import { useTheme } from "../../../Context/ThemeContext";

function Notes ({ onFolderClick }) {
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // Theme context
    const { darkMode, toggleTheme } = useTheme();

    const [noteData] = useState([
        {
            id: 1,
            image: "/assets/images/note-light.png",
            title: "Personal",
            theme: "light",
            imgAlt: "Personal Notes",
            keyId: "personal",
            files: 12,
        },
        {
            id: 2,
            image: "/assets/images/note-dark.png",
            title: "Personal",
            theme: "dark",
            imgAlt: "Personal Notes",
            keyId: "personal",
            files: 12,
        },
    ]);

return (
    <div className="note-container">
        <div className="note-wrapper">
            <div className="note-header">
                <div className="note-header-wrapper">
                    <div className="note-logo">
                        <p>Notes</p>
                    </div>

                    <div className="note-icons">
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

            <div className="note-body-wrapper">
                <div className="note-body">
                    {noteData
                        .filter(note => (darkMode ? note.theme === "dark" : note.theme === "light"))
                        .map(note => (
                            <div
                                key={note.id}
                                className={`note ${
                                    darkMode ? "note-light" : "note-dark"
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
                                        <p className="note-text">{note.files} files</p>
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

export default Notes;
