import React, { useState, useEffect, useRef } from "react";
import Side from "./App/Side";
import Main from "./App/Main";
import { LanguageProvider } from "../Context/LanguageContext.jsx";
import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { DashboardViewProvider } from "./Folder/GridControls/DashboardViewContext.jsx";

function App() {
  const [view, setView] = useState("home");
  const [activeFolder, setActiveFolder] = useState(null);

  const mainContentRef = useRef(null);

  // Scroll state
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // On scroll update scrollTop state & sizes
  useEffect(() => {
    const scrollBox = mainContentRef.current;
    if (!scrollBox) return;

    const onScroll = () => {
      setScrollTop(scrollBox.scrollTop);
      setScrollHeight(scrollBox.scrollHeight);
      setClientHeight(scrollBox.clientHeight);
    };

    scrollBox.addEventListener("scroll", onScroll);

    // Initialize sizes
    setScrollHeight(scrollBox.scrollHeight);
    setClientHeight(scrollBox.clientHeight);

    return () => {
      scrollBox.removeEventListener("scroll", onScroll);
    };
  }, []);

  // When custom scrollbar moves, update main content scrollTop
  const handleScrollbarChange = (e) => {
    if (!mainContentRef.current) return;
    const newScrollTop = Number(e.target.value);
    mainContentRef.current.scrollTop = newScrollTop;
    setScrollTop(newScrollTop);
  };

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

              {/* Main content container */}
              <div
                className="main-scroll-container"
                style={{
                  flexGrow: 1,
                  display: "flex",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="main-content"
                  style={{
                    flexGrow: 1,
                    borderRadius: "0.5rem",
                    border: "0.5px solid var(--border-primary)",
                    background: "var(--bg-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden", // hide native scrollbar
                  }}
                >
                  <div
                    className="main-content-wrapper"
                    ref={mainContentRef}
                    style={{
                      flex: 1,
                      overflowY: "scroll",
                      padding: "1rem",
                      boxSizing: "border-box",
                      // Hide native scrollbar on WebKit browsers
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE 10+
                    }}
                  >
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