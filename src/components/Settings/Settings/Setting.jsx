import React from "react";
import './Setting.css';

function Settings() {
    return (
        <div className="settings-container">
            <div className="settings-wrapper">
                <div className="settings-header">
                    <div className="settings-header-wrapper">
                        <div className="settings-logo">
                            <p className="settings-header-svg-wrapper">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="settings-header-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"/></svg>
                            </p>

                            <p>settings</p>
                        </div>

                        <div className="settings-icons">
                            <div className="settings-search">
                                <svg xmlns="http://www.w3.org/2000/svg" className="settings-header-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-body">
                    <div className="settings-main">
                        <div className="settings">
                            <div className="settings-top">
                                <p className="settings-top-text">
                                    Appearance
                                </p>
                            </div>

                            <div className="settings-bottom">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;