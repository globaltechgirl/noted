import React from "react";
import "./GridList.css"; 

function GridList ({ data = [] }) {
    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-body">
                    <div className="folder-list-wrapper">
                        <div className="folder-list-main">
                            {data.map((folder, index) => (
                                <div key={index} className="folder folder-list">
                                    <div className="folder-list-left">
                                        <div className="left-icon">
                                            {folder.image ? (
                                                <img src={folder.image} alt={folder.title} />
                                            ) : (
                                                <p>{folder.icon}</p>
                                            )}
                                        </div>

                                        <div className="left-text">
                                            <p>{folder.title}</p>
                                        </div>
                                    </div>

                                    <div className="folder-list-middle">
                                        <div className="middle-text">
                                            <p>{folder.date}</p>
                                        </div>
                                    </div>

                                    <div className="folder-list-right">
                                        <div className="folder-top-star">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                                        </div>

                                        <div className="folder-top-menu">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
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

export default GridList;
