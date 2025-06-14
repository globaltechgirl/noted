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
                                                <div className="folder-compact-top">
                                                    <div className="folder-top-star" onClick={() => toggleStar(folder.id)}>
                                                        {folder.starred ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-star-svg" viewBox="0 0 24 24">
                                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                                                            </svg>
                                                        )}
                                                    </div>

                                                    <div className="folder-top-menu">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="folder-top-menu-svg" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg>
                                                    </div>
                                                </div>

                                                <div className="folder-compact-image">
                                                    {folder.image ? (
                                                        <img src={folder.image} alt={folder.title} />
                                                    ) : folder.link ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-link-svg" viewBox="0 0 512 512"><path fill="#87868b" d="m138.058 296.404l-40.791-40.791l49.274-49.274c44.561-44.561 117.064-44.56 161.626 0l-40.791 40.791c-22.067-22.068-57.977-22.069-80.045 0z"/><path fill="#696a70" d="M287.656 341.136c-30.527 0-59.227-11.888-80.812-33.475c-44.56-44.56-44.561-117.064 0-161.625l97.892-97.892c21.587-21.586 50.286-33.474 80.813-33.474s59.227 11.888 80.813 33.474s33.474 50.287 33.474 80.813s-11.888 59.227-33.474 80.813l-97.893 97.892c-21.585 21.586-50.284 33.474-80.813 33.474m97.893-268.78c-15.118 0-29.332 5.888-40.023 16.578l-97.892 97.892c-22.068 22.069-22.068 57.977 0 80.045c10.69 10.69 24.904 16.578 40.022 16.578c15.119 0 29.332-5.887 40.022-16.577l97.893-97.893c10.69-10.69 16.578-24.904 16.578-40.022c0-15.119-5.888-29.332-16.578-40.023c-10.69-10.69-24.904-16.578-40.022-16.578"/><path fill="#87868b" d="M343.932 70.414c-5.605 0-11.037-2.976-13.923-8.237c-4.214-7.681-1.403-17.324 6.278-21.538c31.379-17.211 69.118-17.305 98.494-.244c7.576 4.4 10.15 14.109 5.75 21.686c-4.401 7.576-14.108 10.15-21.686 5.75c-19.52-11.338-45.938-11.094-67.299.625a15.8 15.8 0 0 1-7.614 1.958M129.461 499.277c-29.267 0-58.533-11.14-80.813-33.419c-44.56-44.561-44.56-117.066 0-161.627l70.465-70.464l40.79 40.791l-70.465 70.465c-22.068 22.068-22.068 57.977 0 80.045c11.033 11.033 25.53 16.55 40.022 16.551c14.496.002 28.987-5.516 40.023-16.551l97.892-97.893c10.69-10.69 16.578-24.904 16.578-40.022s-5.887-29.332-16.578-40.022l40.791-40.791c44.561 44.561 44.561 117.066 0 161.626l-97.892 97.893c-22.28 22.279-51.546 33.418-80.813 33.418"/></svg>
                                                    ) : (
                                                        <p>{folder.icon}</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="folder-compact-middle">
                                                <div className="middle-text">
                                                    <p>{folder.title}</p>
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
