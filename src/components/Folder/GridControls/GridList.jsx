import React from "react";
import "./GridList.css"; 

function GridList ({ 
    data = [],
    toggleStar,
    handleCopy,
    copiedId,
    editedTitle,
    setEditedTitle,
    editedLink,
    setEditedLink,
    setEditingTitleId,
    setEditingLinkId,
    editingId,
    setEditingId,
    handleSave,
    handleDelete,
}) {
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
                                            <>
                                                <div className="folder-list-link-container">
                                                    <div className="folder-list-link-main">
                                                        <div className="folder-list-link-wrapper">
                                                            <div className="folder-link-body">
                                                                <div className="folder-link-left">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="folder-link-left-svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/></svg>
                                                                </div>

                                                                <div className="folder-link-right">
                                                                    <p className="folder-link-title">{folder.title}</p>
                                                                </div>
                                                            </div>

                                                            <div className="folder-list-bottom folder-link-bottom">                                                
                                                                <div className="folder-link-bottom-icon folder-link-bottom-star" onClick={() => toggleStar(folder.id)}>
                                                                    {folder.starred ? (
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            className="folder-bottom-icon-click-svg" 
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
                                                                    ) : (
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            className="folder-bottom-icon-svg" 
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

                                                                    <p  className="folder-bottom-icon-text">Star</p>
                                                                </div>

                                                                <div className="folder-link-bottom-icon folder-link-bottom-copy" onClick={() => handleCopy(folder.id, folder.link)}>
                                                                    {copiedId === folder.id ? (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="folder-bottom-icon-click-svg" 
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path 
                                                                                fill="none"
                                                                                d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414"
                                                                            ></path>
                                                                        </svg>
                                                                    ) : (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="folder-bottom-icon-svg"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <g
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                            >
                                                                                <path 
                                                                                    d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" 
                                                                                />
                                                                                <path 
                                                                                    d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" 
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    )}

                                                                    <p className="folder-bottom-icon-text">
                                                                        {copiedId === folder.id ? "Copied" : "Copy"}
                                                                    </p>
                                                                </div>

                                                                <div 
                                                                    className="folder-link-bottom-icon folder-link-bottom-edit"   
                                                                    onClick={() => {
                                                                        if (editingId === folder.id) {
                                                                            setEditingId(null);
                                                                        } else {
                                                                            setEditingId(folder.id);
                                                                            setEditedTitle(folder.title || "");
                                                                            setEditedLink(folder.link || "");
                                                                        }
                                                                    }}
                                                                >
                                                                    <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" 
                                                                        className="folder-bottom-icon-svg" 
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path 
                                                                            fill="none" 
                                                                            stroke="currentColor" 
                                                                            strokeLinecap="round" 
                                                                            strokeLinejoin="round" 
                                                                            strokeWidth={2} 
                                                                            d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4M16 19h6"
                                                                        >
                                                                        </path>
                                                                    </svg>

                                                                    <p  className="folder-bottom-icon-text">Edit</p>
                                                                </div>

                                                                <div className="folder-link-bottom-icon folder-link-bottom-delete" onClick={() => handleDelete(folder.id)}>
                                                                    <svg 
                                                                        xmlns="http://www.w3.org/2000/svg" 
                                                                        className="folder-bottom-icon-svg" 
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path 
                                                                            fill="none" 
                                                                            stroke="currentColor" 
                                                                            strokeLinecap="round" 
                                                                            strokeLinejoin="round" 
                                                                            strokeWidth={2} 
                                                                            d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                                                                        ></path>
                                                                    </svg>

                                                                    <p  className="folder-bottom-icon-text">Delete</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={`folder-list-edit-toggle-wrapper${editingId === folder.id ? " show" : ""}`}>
                                                        <div className="folder-edit-toggle-main">
                                                            <div className="folder-edit-toggle-icons">
                                                                <div className="folder-edit-toggle-save" onClick={() => {
                                                                    setEditedTitle(folder.title);
                                                                    setEditedLink(folder.link); 
                                                                }}>
                                                                    <div className="folder-edit-save-wrapper">
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            className="folder-edit-reverse-svg" 
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path 
                                                                                d="M12.207 2.293a1 1 0 0 1 0 1.414L10.914 5H12.5c4.652 0 8.5 3.848 8.5 8.5S17.152 22 12.5 22S4 18.152 4 13.5a1 1 0 1 1 2 0c0 3.548 2.952 6.5 6.5 6.5s6.5-2.952 6.5-6.5S16.048 7 12.5 7h-1.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0"
                                                                           ></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>

                                                                <div className="folder-edit-toggle-save" onClick={() => {
                                                                    handleSave(folder.id, editedTitle, editedLink);
                                                                    setEditingId(null);
                                                                    setEditingTitleId(null);
                                                                    setEditingLinkId(null);
                                                                }}>
                                                                    <div className="folder-edit-save-wrapper">
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg" 
                                                                            className="folder-edit-save-svg" 
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <g 
                                                                                fill="none" 
                                                                                stroke="currentColor" 
                                                                                strokeLinecap="round" 
                                                                                strokeLinejoin="round" 
                                                                                strokeWidth="2"
                                                                            >
                                                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
                                                                                <path d="m9 12l2 2l4-4" />
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="folder-edit-toggle-group" onClick={() => {
                                                                setEditedTitle(folder.title);
                                                                setEditingId(folder.id);
                                                            }}>
                                                                {editingId === folder.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedTitle}
                                                                        onChange={(e) => setEditedTitle(e.target.value)}
                                                                        className="folder-edit-input"
                                                                        placeholder="Folder title"
                                                                    />
                                                                ) : (
                                                                    <p className="folder-edit-label">{folder.title}</p>
                                                                )}
                                                            </div>

                                                            <div className="folder-edit-toggle-group" onClick={() => {
                                                                setEditedLink(folder.link);
                                                                setEditingId(folder.id);
                                                            }}>
                                                                {editingId === folder.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedLink}
                                                                        onChange={(e) => setEditedLink(e.target.value)}
                                                                        className="folder-edit-input"
                                                                        placeholder="Folder link"
                                                                    />
                                                                ) : (
                                                                    <p className="folder-edit-label">{folder.link}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
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
                                                                className="folder-right-starred-svg" 
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
