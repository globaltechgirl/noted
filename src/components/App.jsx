import React, { useState, useEffect, useRef } from "react";
import Side from "./App/Side";
import Main from "./App/Main";
import { LanguageProvider } from "../Context/LanguageContext.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { DashboardViewProvider } from "./Folder/GridControls/DashboardViewContext.jsx";

function App() {
    // --- View state ---
    const [view, setView] = useState("home");
    const [activeFolder, setActiveFolder] = useState(null);

    // Scroll reference and metrics
    const mainContentRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30); 

    // Track scroll changes
    useEffect(() => {
        const scrollBox = mainContentRef.current;
        if (!scrollBox) return;

        const updateScrollMetrics = () => {
            setScrollTop(scrollBox.scrollTop);
            setScrollHeight(scrollBox.scrollHeight);
            setClientHeight(scrollBox.clientHeight);
        };

        updateScrollMetrics();
        scrollBox.addEventListener("scroll", updateScrollMetrics);
        window.addEventListener("resize", updateScrollMetrics);

        const timeout = setTimeout(updateScrollMetrics, 100);

        return () => {
            scrollBox.removeEventListener("scroll", updateScrollMetrics);
            window.removeEventListener("resize", updateScrollMetrics);
            clearTimeout(timeout);
        };
    }, [view, activeFolder]);

    // Custom scrollbar handler
    const handleScrollbarChange = (e) => {
        if (!mainContentRef.current) return;
        const newScrollTop = Number(e.target.value);
        mainContentRef.current.scrollTop = newScrollTop;
        setScrollTop(newScrollTop);
    };

    // Handle sidebar clicks
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
        } else if (section === "tasks") {
            setView("tasks");
            setActiveFolder(null);
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
                        <div className="app-wrapper">
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
                                    style={{ 
                                        "--thumb-height": `${thumbHeight}px`,
                                        opacity: scrollHeight > clientHeight ? 1 : 0,
                                        marginLeft: scrollHeight > clientHeight ? "8px" : "0px",
                                        pointerEvents: scrollHeight > clientHeight ? "auto" : "none",
                                    }}
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
