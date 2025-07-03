import React, { useState, useEffect, useRef } from "react";
import './Profile.css';
import { useTheme } from "../../../Context/ThemeContext";
import { allCountries } from "country-telephone-data";

function Profile() {
    // Theme context
    const { darkMode, toggleTheme } = useTheme();
    
   // Profile information state
    const [fullName, setFullName] = useState("First Last");
    const [username, setUsername] = useState("username");
    const [email, setEmail] = useState("name@gmail.com");
    const [password, setPassword] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
    const [birthday, setBirthday] = useState("Month 00, Year");

    // Social media handles
    const [instagramHandle, setInstagramHandle] = useState("username_ig");
    const [tiktokHandle, setTiktokHandle] = useState("username_tt");
    const [twitterHandle, setTwitterHandle] = useState("username_tw");

    // Phone information
    const [phonePrefix, setPhonePrefix] = useState("+234");
    const [phoneNumber, setPhoneNumber] = useState("913625175");

    // Editing field state
    const [editingField, setEditingField] = useState(null);
    const fullNameRef = useRef(null);

    // Profile image state
    const [profileImage, setProfileImage] = useState("/src/assets/images/user.png");
    const fileInputRef = useRef(null);

    // Background customization state
    const [backgroundImage, setBackgroundImage] = useState("/src/assets/images/background.png");
    const [backgroundType, setBackgroundType] = useState("image");
    const [backgroundColor, setBackgroundColor] = useState("#fcd5ce");
    const backgroundInputRef = useRef(null);

    // UI tab & popup state
    const [activeTab, setActiveTab] = useState("gallery");
    const [showBackgroundPopup, setShowBackgroundPopup] = useState(false);
    const popupRef = useRef(null);

    // Handle outside click: close background popup
    useEffect(() => {
        function handleClickOutsidePopup(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowBackgroundPopup(false);
            }
        }

        if (showBackgroundPopup) {
            document.addEventListener("mousedown", handleClickOutsidePopup);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsidePopup);
        };
    }, [showBackgroundPopup]);

    // Handle outside click: close input field editing
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

    // Save edited field
    const handleSave = (field) => {
        setEditingField(null);
    };

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // Handle background image change
    const handleBackgroundChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-header">
                    <div className="profile-header-wrapper">
                        <div className="profile-logo">
                           <p>Profile</p>
                        </div>

                        <div className="profile-icon">
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

                <div className="profile-body">
                    <div className="profile">
                        <div className="profile-top">
                            <div className="profile-background-wrapper">
                                <div className="profile-background" style={{ backgroundColor: backgroundType === 'color' ? backgroundColor : undefined }}>
                                    {backgroundType === 'image' && (
                                        <img src={backgroundImage} alt="Profile Background" />
                                    )}

                                    <div className="background-edit-icon" onClick={() => setShowBackgroundPopup(prev => !prev)} itle="Edit Background">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="camera-svg" 
                                            viewBox="0 0 24 24"
                                        >
                                            <g 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2"
                                            >
                                                <path 
                                                    d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"
                                                />
                                                <path 
                                                    d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0"
                                                />
                                            </g>
                                        </svg>
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={backgroundInputRef}
                                        onChange={handleBackgroundChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                
                                {showBackgroundPopup && (
                                    <div className="background-popup" ref={popupRef}>
                                        <div className="popup-tabs-wrapper">
                                            <div className="popup-tabs">
                                                <button
                                                    className={activeTab === "gallery" ? "active" : ""}
                                                    onClick={() => setActiveTab("gallery")}
                                                >
                                                    Gallery
                                                </button>

                                                <button
                                                    className={activeTab === "upload" ? "active" : ""}
                                                    onClick={() => setActiveTab("upload")}
                                                >
                                                    Upload
                                                </button>
                                            </div>

                                            <button className="remove-bg-button" onClick={() => {
                                                setBackgroundImage(null);
                                                setBackgroundColor("");
                                                setBackgroundType(null);
                                            }}>
                                                Remove
                                            </button>
                                        </div>

                                        {activeTab === "gallery" && (
                                            <div className="popup-section">
                                                <div className="color-options">
                                                    {["#fcd5ce", "#ffe5b4", "#fff9b0", "#d0f4de", "#cfe7f5", "#dcd0ff", "#f3c7e9", "#e2e2e2"].map(color => (
                                                        <div
                                                            key={color}
                                                            className={`color-circle ${backgroundColor === color ? "active" : ""}`}
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => {
                                                                setBackgroundColor(color);
                                                                setBackgroundType("color");
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "upload" && (
                                            <div className="popup-section">
                                                <button
                                                        onClick={() => {
                                                        setBackgroundType("image");
                                                        backgroundInputRef.current.click();
                                                    }}
                                                >
                                                    Upload Image
                                                </button>

                                                <p className="popup-section-text">
                                                    Images wider than 400 pixels works best.
                                                </p>

                                                <p className="popup-section-text">
                                                    The maximum size per file is 5MB.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="profile-pic">
                                <img src={profileImage} alt="Profile Pic" className="profile-img" />

                                <div className="icon camera-icon" onClick={() => fileInputRef.current.click()} title="Change Profile Picture">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="camera-svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <g 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2"
                                        >
                                            <path 
                                                d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"
                                            />
                                            <path 
                                                d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0"
                                            />
                                        </g>
                                    </svg>
                                </div>

                                <div
                                    className="icon delete-icon"
                                    onClick={() => setProfileImage(null)}
                                    title="Remove Profile Picture"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="delete-svg" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                                        ></path>
                                    </svg>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="profile-main">
                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Full name</p>

                                    <p className="profile-placeholder-text">Your display name</p>
                                </div>

                                <div className="profile-details">
                                    <div className="profile-details-left">
                                        {editingField === "fullName" ? (
                                            <>
                                                <input  
                                                    type="text" 
                                                    value={fullName} 
                                                    onChange={(e) => setFullName(e.target.value)} 
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setEditingField(null);
                                                        }
                                                    }}
                                                    className="profile-input"
                                                    autoFocus
                                                />

                                                <div 
                                                    className="profile-details-save"
                                                    onClick={() => setEditingField(null)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="profile-save-svg" 
                                                        viewBox="0 0 24 24"
                                                    >
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
                                                                d="m9 12l2 2l4-4"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-fullname-text">{fullName}</p>
                                                <EditIcon field="fullName" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Username</p>

                                    <p className="profile-placeholder-text">A unique name for your profile</p>
                                </div>

                                <div className="profile-details-specific">
                                    <div className="profile-details-left">
                                        <p className="profile-tag profile-username-tag">noted.com/</p>
                                    </div>

                                    <div className="profile-details-right">
                                        {editingField === "username" ? (
                                            <>
                                                <input 
                                                    type="text" 
                                                    value={username} 
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setEditingField(null);
                                                        }
                                                    }}
                                                    className="profile-input"
                                                    autoFocus
                                                />

                                                <div 
                                                    className="profile-details-save"
                                                    onClick={() => setEditingField(null)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="profile-save-svg" 
                                                        viewBox="0 0 24 24"
                                                    >
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
                                                                d="m9 12l2 2l4-4"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-username-text">{username}</p>
                                                <EditIcon field="username" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
 
                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Email</p>

                                    <p className="profile-placeholder-text">Your email address</p>
                                </div>

                                <div className="profile-details">
                                    <div className="profile-details-left">
                                        {editingField === "email" ? (
                                            <>
                                                <input  
                                                    type="text" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setEditingField(null);
                                                        }
                                                    }}
                                                    className="profile-input"
                                                    autoFocus
                                                />

                                                <div 
                                                    className="profile-details-save"
                                                    onClick={() => setEditingField(null)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="profile-save-svg" 
                                                        viewBox="0 0 24 24"
                                                    >
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
                                                                d="m9 12l2 2l4-4"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-email-text">{email}</p>
                                                <EditIcon field="email" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Password</p>

                                    <p className="profile-placeholder-text">Your secret password</p>
                                </div>

                                <div className="profile-details">
                                    <div className="profile-details-left">
                                       {editingField === "password" ? (
                                            <>
                                                <div className="profile-password-input-wrapper">
                                                    <input 
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                setEditingField(null);
                                                            }
                                                        }}
                                                        className="profile-input"
                                                        autoFocus
                                                    />
                                                </div>

                                                <div className="profile-actions-inline">
                                                    <div
                                                        className="toggle-password-visibility"
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                        title={showPassword ? "Hide Password" : "Show Password"}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {showPassword ? (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="eye-icon" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth="2" 
                                                                    d="M3 3l18 18M10.73 10.73a3 3 0 0 0 4.24 4.24M9.88 5.63A9.77 9.77 0 0 1 12 5c5.523 0 10 4.03 10 7s-4.477 7-10 7a9.77 9.77 0 0 1-3.01-.47M6.24 6.24C4.318 7.39 2 9.45 2 12c0 .918.39 1.786 1.06 2.537"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="eye-icon" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth="2"
                                                                >
                                                                    <path 
                                                                        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                                                                    />
                                                                    <circle 
                                                                        cx="12" 
                                                                        cy="12" 
                                                                        r="3"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>

                                                    <div 
                                                        className="profile-details-save"
                                                        onClick={() => setEditingField(null)}
                                                        title="Save"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-save-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                                    d="m9 12l2 2l4-4"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-password-text">
                                                    {showPassword ? password : "•".repeat(password.length)}
                                                </p>

                                                <div className="profile-actions-inline">
                                                    <div
                                                        className="toggle-password-visibility"
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                        title={showPassword ? "Hide Password" : "Show Password"}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {showPassword ? (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="eye-icon" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth="2" 
                                                                    d="M3 3l18 18M10.73 10.73a3 3 0 0 0 4.24 4.24M9.88 5.63A9.77 9.77 0 0 1 12 5c5.523 0 10 4.03 10 7s-4.477 7-10 7a9.77 9.77 0 0 1-3.01-.47M6.24 6.24C4.318 7.39 2 9.45 2 12c0 .918.39 1.786 1.06 2.537"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="eye-icon" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeWidth="2"
                                                                >
                                                                    <path 
                                                                        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                                                                    />
                                                                    <circle 
                                                                        cx="12" 
                                                                        cy="12" 
                                                                        r="3"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>

                                                    <EditIcon field="password" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Date of birth</p>

                                    <p className="profile-placeholder-text">Your birthday</p>
                                </div>

                                <div className="profile-details">
                                    <div className="profile-details-left">
                                        {editingField === "birthday" ? (
                                            <>
                                                <input 
                                                    type="text" 
                                                    value={birthday} 
                                                    onChange={(e) => setBirthday(e.target.value)} 
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setEditingField(null);
                                                        }
                                                    }}
                                                    className="profile-input"
                                                    autoFocus
                                                />

                                                <div 
                                                    className="profile-details-save"
                                                    onClick={() => setEditingField(null)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="profile-save-svg" 
                                                        viewBox="0 0 24 24"
                                                    >
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
                                                                d="m9 12l2 2l4-4"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-birthday-text">{birthday}</p>
                                                <EditIcon field="birthday" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Phone number</p>

                                    <p className="profile-placeholder-text">Your phone number</p>
                                </div>

                                <div className="profile-details-specific">
                                    <div className="profile-details-left">
                                        <div className="profile-phone-dropdown-wrapper">
                                            <select
                                                className="profile-phone-tag"
                                                value={phonePrefix}
                                                onChange={(e) => setPhonePrefix(e.target.value)}
                                            >
                                                {allCountries.map((country, index) => (
                                                    <option key={index} value={`+${country.dialCode}`}>
                                                        +{country.dialCode}
                                                    </option>
                                                ))}
                                            </select>

                                            <svg 
                                                className="custom-dropdown-arrow" 
                                                viewBox="0 0 24 24" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 9l6 6 6-6" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    fill="none" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="profile-details-right">
                                        {editingField === "phoneNumber" ? (
                                            <>
                                                <input 
                                                    type="text" 
                                                    value={phoneNumber} 
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            setEditingField(null);
                                                        }
                                                    }}
                                                    className="profile-input"
                                                    autoFocus
                                                />

                                                <div 
                                                    className="profile-details-save"
                                                    onClick={() => setEditingField(null)}
                                                    style={{ cursor: "pointer" }}
                                                    title="Save"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="profile-save-svg" 
                                                        viewBox="0 0 24 24"
                                                    >
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
                                                                d="m9 12l2 2l4-4"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="profile-text profile-phone-text">{phoneNumber}</p>
                                                <EditIcon field="phoneNumber" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Connect your socials</p>

                                    <p className="profile-placeholder-text">Add your social links</p>
                                </div>

                                <div className="profile-socials-wrapper">
                                    <div className="profile-details-specific">
                                        <div className="profile-details-left">
                                            <div className="profile-tag profile-socials-tag">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="profile-socials-tag-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2"
                                                    >
                                                        <path 
                                                            d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
                                                        />
                                                        <path 
                                                            d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0m7.5-4.5v.01"
                                                        />
                                                    </g>
                                                </svg>
                                                
                                                <p className="profile-socials-tag-text">instagram.com/</p>
                                            </div>
                                        </div>

                                        <div className="profile-details-right">
                                            {editingField === "instagram" ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={instagramHandle}
                                                        onChange={(e) => setInstagramHandle(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                                                        className="profile-input"
                                                        autoFocus
                                                    />

                                                    <div className="profile-details-save" onClick={() => setEditingField(null)} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-save-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                                    d="m9 12l2 2l4-4"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="profile-text profile-socials-text">{instagramHandle}</p>

                                                    <div className="profile-details-edit" onClick={() => setEditingField("instagram")} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-edit-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="profile-details-specific">
                                        <div className="profile-details-left">
                                            <div className="profile-tag profile-socials-tag">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="profile-socials-tag-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M21 7.917v4.034A9.95 9.95 0 0 1 16 10v4.5a6.5 6.5 0 1 1-8-6.326V12.5a2.5 2.5 0 1 0 4 2V3h4.083A6.005 6.005 0 0 0 21 7.917"
                                                    />
                                                </svg>

                                                <p className="profile-socials-tag-text">tiktok.com/</p>
                                            </div>
                                        </div>

                                        <div className="profile-details-right">
                                            {editingField === "tiktok" ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={tiktokHandle}
                                                        onChange={(e) => setTiktokHandle(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                                                        className="profile-input"
                                                        autoFocus
                                                    />
                                                    <div className="profile-details-save" onClick={() => setEditingField(null)} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-save-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                                    d="m9 12l2 2l4-4"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="profile-text profile-socials-text">{tiktokHandle}</p>

                                                    <div className="profile-details-edit" onClick={() => setEditingField("tiktok")} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-edit-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="profile-details-specific">
                                        <div className="profile-details-left">
                                            <div className="profile-tag profile-socials-tag">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="profile-socials-tag-svg" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M22 4.01c-1 .49-1.98.689-3 .99c-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4c0 0-4.182 7.433 4 11c-1.872 1.247-3.739 2.088-6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58-1.04 6.522-3.723 7.651-7.742a13.8 13.8 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z"
                                                    />
                                                </svg>

                                                <p className="profile-socials-tag-text">twitter.com/</p>
                                            </div>
                                        </div>

                                        <div className="profile-details-right">
                                            {editingField === "twitter" ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={twitterHandle}
                                                        onChange={(e) => setTwitterHandle(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                                                        className="profile-input"
                                                        autoFocus
                                                    />

                                                    <div className="profile-details-save" onClick={() => setEditingField(null)} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-save-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                                    d="m9 12l2 2l4-4"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="profile-text profile-socials-text">{twitterHandle}</p>

                                                    <div className="profile-details-edit" onClick={() => setEditingField("twitter")} style={{ cursor: "pointer" }}>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="profile-edit-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
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
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Danger zone</p>

                                    <p className="profile-placeholder-text">Delete account</p>
                                </div>

                                <div className="profile-danger-wrapper">
                                    <div className="profile-details profile-details-danger profile-danger-logout">
                                        <p className="profile-text profile-danger-text">Logout</p>
                                    </div>

                                    <div className="profile-details profile-details-danger profile-danger-delete">
                                        <p className="profile-text profile-danger-text">Delete</p>
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

export default Profile;