import React, { useState, useEffect, useRef } from "react";
import Side from "./App/Side";
import Main from "./App/Main";
import { LanguageProvider } from "../Context/LanguageContext.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { DashboardViewProvider } from "./Folder/GridControls/DashboardViewContext.jsx";

function App() {
    // --- View State ---
    const [view, setView] = useState("home");
    const [activeFolder, setActiveFolder] = useState(null);

    // --- Ref for Scrollable Content ---
    const mainContentRef = useRef(null);

    // --- Scroll Tracking State ---
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);

    // --- Effect to Track Scroll Metrics ---
    useEffect(() => {
        const scrollBox = mainContentRef.current;
        if (!scrollBox) return;

        const onScroll = () => {
            setScrollTop(scrollBox.scrollTop);
            setScrollHeight(scrollBox.scrollHeight);
            setClientHeight(scrollBox.clientHeight);
        };

        scrollBox.addEventListener("scroll", onScroll);

        setScrollHeight(scrollBox.scrollHeight);
        setClientHeight(scrollBox.clientHeight);

        return () => {
            scrollBox.removeEventListener("scroll", onScroll);
        };
    }, []);

    // --- Handle Custom Scrollbar Drag ---
    const handleScrollbarChange = (e) => {
        if (!mainContentRef.current) return;
        const newScrollTop = Number(e.target.value);
        mainContentRef.current.scrollTop = newScrollTop;
        setScrollTop(newScrollTop);
    };

    // --- Handle Sidebar Navigation ---
    const handleSectionOrFolderClick = (section) => {
        if (section === "dashboard" || section === "home") {
            setView("home");
            setActiveFolder(null);
        } else if (section === "notes") {
            setView("notes");
            setActiveFolder(null);
        } else if (section === "Media" || section === "media-folder") {
            setView("media-folder");
            setActiveFolder("Media");
        } else if (section === "Links" || section === "link-folder") {
            setView("link-folder");
            setActiveFolder("Links");
        } else if (section === "profile") {
            setView("profile");
            setActiveFolder(null);
        } else if (section === "settings") {
            setView("settings");
            setActiveFolder(null);
        } else {
            setView("one-folder");
            setActiveFolder(section);
        }
    };

    return (
        <LanguageProvider>
            <ThemeProvider>
                <DashboardViewProvider>
                    <div className="app-container">
                        <div className="app-wrapper" style={{ display: "flex", height: "100vh" }}>
                            <Side onSectionClick={handleSectionOrFolderClick} />
                            <div className="main-scroll-container">
                                <div className="main-content">
                                    <div className="main-content-wrapper" ref={mainContentRef}>
                                        <Main
                                            view={view}
                                            activeFolder={activeFolder}
                                            onFolderClick={handleSectionOrFolderClick}
                                            onBack={() => setView("home")}
                                        />
                                    </div>
                                </div>

                                <input
                                    type="range"
                                    min={0}
                                    max={scrollHeight - clientHeight}
                                    value={scrollTop}
                                    onChange={handleScrollbarChange}
                                    className="custom-scrollbar"
                                />
                            </div>
                        </div>
                    </div>
                </DashboardViewProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
