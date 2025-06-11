import React from "react";
import "./GridLayout.css"; 
import { useDashboardView } from "../GridControls/DashboardViewContext.jsx";

function GridLayout ({ data = [] }) {
    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-body">
                    <div className="folder-layout-wrapper">
                        <div className="folder-layout-main">
                            {data.map((folder, index) => (
                                <div key={index} className={`folder ${folder.link ? "folder-link-wrapper" : "folder-layout-regular"}`}>
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

                                            <div className="folder-layout-top folder-link-side">
                                                <div className="folder-top-star">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                                                </div>

                                                <div className="folder-top-menu">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                    <>
                                        <div className="folder-image-wrapper">
                                            <div className="folder-layout-top">
                                                <div className="folder-top-star">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                                                </div>

                                                <div className="folder-top-menu">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                                                </div>
                                            </div>

                                            <div className="folder-layout-image">
                                                {folder.image ? (
                                                    <img src={folder.image} alt={folder.title} />
                                                ) : (
                                                    <p>{folder.icon}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="folder-layout-middle">
                                            <div className="middle-text">
                                                <p>{folder.title}</p>
                                            </div>
                                        </div>

                                        <div className="folder-layout-body-hr">
                                            <i className="bi bi-plus"></i>
                                            <div className="line"></div>
                                            <i className="bi bi-plus"></i>
                                        </div>

                                        <div className="folder-layout-bottom">
                                            <div className="bottom-title">
                                                <p>Filesize</p>
                                            </div>
                                            
                                            <div className="bottom-text">
                                                <p>{folder.filesize}</p>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default GridLayout;
