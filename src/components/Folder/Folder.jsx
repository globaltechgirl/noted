import React from "react";
import './Folder.css';

function Folder({ folderName, onBack }) {
  return (
    <div className="folder-wrapper">
        <div className="folder-body">
            <div className="folder-header">
                <div className="folder-left">
                    <div className="folder-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="folder-icon-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3a1 1 0 0 1 .608.206l.1.087L12.414 6H19a3 3 0 0 1 2.995 2.824L22 9v8a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V6a3 3 0 0 1 2.824-2.995L5 3z"/></svg>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>

                    <div className="folder-tag">
                        <p>Daily Files</p>
                    </div>
                </div>

                <div className="folder-right">
                    <div className="folder-grid grid-list">
                        <svg xmlns="http://www.w3.org/2000/svg" className="grid-list-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></svg>
                    </div>

                    <div className="folder-grid grid-layout grid-active">
                        <svg xmlns="http://www.w3.org/2000/svg" className="grid-layout-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/></svg>
                    </div>

                    <div className="folder-grid grid-compact">
                        <svg xmlns="http://www.w3.org/2000/svg" className="grid-compact-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>
                    </div>
                </div>
            </div>

            <div className="folder-main">
                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>

                <div className="folder">
                    <div className="folder-top">
                        <div className="folder-top-star">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                        </div>

                        <div className="folder-top-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                        </div>
                    </div>

                    <div className="folder-middle">
                        <div className="middle-icon">
                            <p>F</p>
                        </div>

                        <div className="middle-text">
                            <p>Licence Agreemenet on Waterfall INC</p>
                        </div>
                    </div>

                    <div className="folder-hr">
                        <i className="bi bi-plus"></i>
                        <div className="line"></div>
                        <i className="bi bi-plus"></i>
                    </div>

                    <div className="folder-bottom">
                        <div className="bottom-title">
                            <p>Filesize</p>
                        </div>

                        <div className="bottom-text">
                            <p>2.3MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Folder;
