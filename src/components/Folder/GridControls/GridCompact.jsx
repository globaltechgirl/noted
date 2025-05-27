import React from "react";
import "./GridCompact.css";

function GridCompact ({ data = [] }) {
    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-body">
                    <div className="folder-compact-wrapper">
                        <div className="folder-compact-main">
                            {data.map((folder, index) => (
                                <div key={index} className="folder folder-compact">
                                    <div className="folder-compact-top">
                                        <div className="folder-top-star">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                                        </div>

                                        <div className="folder-top-menu">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                                        </div>
                                    </div>
                                    
                                    <div className="folder-compact-middle">
                                        <div className="middle-icon">
                                            {folder.image ? (
                                                <img src={folder.image} alt={folder.title} />
                                            ) : (
                                                <p>{folder.icon}</p>
                                            )}
                                        </div>

                                        <div className="middle-text">
                                            <p>{folder.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default GridCompact;
