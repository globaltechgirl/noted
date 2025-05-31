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
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-header-svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g></svg>
                            </p>

                            <p>Profile</p>
                        </div>

                        <div className="profile-icons">
                            <div className="profile-add">
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-header-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    <div className="profile">
                        <div className="profile-img">
                            <img src="/src/assets/images/user.png" alt="Profile" />
                        </div>

                        <div className="profile-main">
                            <div className="profile-name">
                                <p className="profile-name-text">John Doe</p>
                                <p className="profile-edit">Edit</p>
                            </div>

                            <div className="profile-email">
                                <p className="profile-email-text">
                                    @johndoe@gmail.com
                                </p>

                                <p className="profile-edit">Edit</p>
                            </div>

                            <div className="profile-password">
                                <p className="profile-password-text">
                                    09136251751
                                </p>

                                <p className="profile-edit">Edit</p>
                            </div>
                        </div>   
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Profile;