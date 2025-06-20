import React from "react";
import "./GridCompact.css"; 

function GridCompact ({ data = [], toggleStar }) {
    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-body">
                    <div className="folder-compact-wrapper">
                        <div className="folder-compact-main">
                           {data.map((folder, index) => {
                                return (
                                    <div key={index} className={`folder ${folder.link ? "folder-link-wrapper" : "folder-compact-regular"}`}>
                                        {folder.link ? (
                                            <div className="folder-link-main">
                                                <div className="folder-link-body">
                                                    <div className="folder-link-left">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="folder-link-left-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/></svg>
                                                    </div>

                                                    <div className="folder-link-right">
                                                        <a href={folder.link} target="_blank">
                                                            <p className="folder-link-title">{folder.title}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                        <>
                                            <div className="folder-image-wrapper">
                                                <div className="folder-compact-dots">
                                                    <div className="folder-compact-dot">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="folder-compact-dot-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path 
                                                                fill="currentColor" 
                                                                d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="folder-compact-dot">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="folder-compact-dot-svg" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path 
                                                                fill="currentColor" 
                                                                d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="folder-compact-image">
                                                    {folder.image ? (
                                                        <div className="folder-compact-img">
                                                            <img src={folder.image} alt={folder.title} />
                                                        </div>
                                                    ) : (
                                                        <div className="folder-compact-icon">
                                                            <svg
                                                                className="folder-compact-icon-svg"
                                                                viewBox="0 0 100 100"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path 
                                                                    fill="#1f1f21" 
                                                                    stroke="rgba(255, 255, 255, 0.05)" 
                                                                    stroke-linecap="round" 
                                                                    stroke-linejoin="round" 
                                                                    stroke-width="0.5" 
                                                                    d="m13.163 2.168l8.021 5.828c.694.504.984 1.397.719 2.212l-3.064 9.43a1.98 1.98 0 0 1-1.881 1.367H7.042a1.98 1.98 0 0 1-1.881-1.367l-3.064-9.43a1.98 1.98 0 0 1 .719-2.212l8.021-5.828a1.98 1.98 0 0 1 2.326 0"
                                                                />
                                                                <text
                                                                    x="12"
                                                                    y="13.5"
                                                                    textAnchor="middle"
                                                                    alignmentBaseline="middle"
                                                                    className="folder-compact-icon-text"
                                                                >
                                                                    {folder.icon}
                                                                </text>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={`folder-compact-div ${folder.image ? 'has-image' : ''}`}>
                                                <div className="folder-compact-top">
                                                    <div className="folder-top-text">
                                                        <p>{folder.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default GridCompact;
