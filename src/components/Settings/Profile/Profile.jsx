import React from "react";
import './Profile.css';

function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-header">
                    <div className="profile-header-wrapper">
                        <div className="profile-logo">
                            <p className="profile-header-svg-wrapper">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="profile-header-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"/></svg>
                            </p>

                            <p>Profile</p>
                        </div>

                        <div className="profile-icons">
                            <div className="profile-search">
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-header-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    <div className="profile">
                        <div className="profile-top">
                            <div className="profile-background">
                                <img src="/src/assets/images/background2.jpg" alt="Profile Background" />
                            </div>

                            <div className="profile-pic">
                                <img src="/src/assets/images/user2.png" alt="Profile" />
                            </div>
                        </div>

                        <div className="profile-main">
                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Full name</p>

                                    <p className="profile-placeholder-text">Your display name.</p>
                                </div>

                                <div className="profile-details">
                                    <p className="profile-text profile-name-text">John Doe</p>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Username</p>

                                    <p className="profile-placeholder-text">A unique name for your profile.</p>
                                </div>

                                <div className="profile-details profile-details-specific">
                                    <p className="profile-tag profile-username-tag">noted.com/</p>
                                    <p className="profile-text profile-username-text">John Doe</p>
                                </div>
                            </div>
 
                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Email</p>

                                    <p className="profile-placeholder-text">Your email address.</p>
                                </div>

                                <div className="profile-details">
                                    <p className="profile-text profile-email-text">johndoe@gmail.com</p>
                                </div>
                            </div>

                            <div className="profile-main-wrapper">
                                <div className="profile-placeholder">
                                    <p className="profile-placeholder-title">Connect your socials</p>
                                    <p className="profile-placeholder-text">Add your social links.</p>
                                </div>

                                <div className="profile-email-wrapper">
                                    <div className="profile-details profile-details-socials">
                                        <div className="profile-tag profile-socials-tag">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="profile-socials-tag-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0m7.5-4.5v.01"/></g></svg>
                                            <p className="profile-socials-tag-text">instagram.com/</p>
                                        </div>

                                        <p className="profile-text profile-socials-text">John Doe</p>
                                    </div>

                                    <div className="profile-details profile-details-socials">
                                        <div className="profile-tag profile-socials-tag">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="profile-socials-tag-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7.917v4.034A9.95 9.95 0 0 1 16 10v4.5a6.5 6.5 0 1 1-8-6.326V12.5a2.5 2.5 0 1 0 4 2V3h4.083A6.005 6.005 0 0 0 21 7.917"/></svg>
                                            <p className="profile-socials-tag-text">tiktok.com/</p>
                                        </div>

                                        <p className="profile-text profile-socials-text">John Doe</p>
                                    </div>

                                    <div className="profile-details profile-details-socials">
                                        <div className="profile-tag profile-socials-tag">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="profile-socials-tag-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 4.01c-1 .49-1.98.689-3 .99c-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4c0 0-4.182 7.433 4 11c-1.872 1.247-3.739 2.088-6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58-1.04 6.522-3.723 7.651-7.742a13.8 13.8 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z"/></svg>
                                            <p className="profile-socials-tag-text">twitter.com/</p>
                                        </div>

                                        <p className="profile-text profile-socials-text">John Doe</p>
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