import React from "react";
import "./GridList.css"; 

function GridList ({ data = [], toggleStar }) {
    return (
        <div className="folder-container">
            <div className="folder-wrapper">
                <div className="folder-body">
                    <div className="folder-list-wrapper">
                        <div className="folder-list-main">
                            {data.map((folder, index) => {
                                return (
                                    <div key={index} className={`folder ${folder.link ? "folder-link-wrapper" : "folder-list-regular"}`}>
                                        {folder.link ? (
                                            <div className="folder-link-main">
                                                <div className="folder-link-body">
                                                    <div className="folder-link-right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="folder-link-right-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/></svg>
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
                                            <div className="folder-list-body">
                                                <div className="folder-image-wrapper">
                                                    <div className="folder-list-image">
                                                        {folder.image ? (
                                                            <div className="folder-list-img">
                                                                <img src={folder.image} alt={folder.title} />
                                                            </div>
                                                        ) : (
                                                            <div className="folder-list-icon">
                                                                <p>{folder.icon}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="folder-list-left">
                                                        <div className="folder-left-text">
                                                            <p>{folder.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="folder-list-right">                                                
                                                    <div className="folder-right-text">
                                                        <p>{folder.date}</p>
                                                    </div>

                                                    <div className="folder-right-star" onClick={() => toggleStar(folder.id)}>
                                                        {folder.starred ? (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="folder-right-star-svg" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path 
                                                                    fill="currentColor" 
                                                                    d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="folder-right-star-svg" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2" 
                                                                    d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                                                                />
                                                            </svg>
                                                        )}
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

export default GridList;
