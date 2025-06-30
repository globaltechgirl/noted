import React from "react";
import './Folder.css';
import GridList from './GridControls/GridList';
import GridLayout from './GridControls/GridLayout';
import GridCompact from './GridControls/GridCompact';

function Folder({
    view,
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
    darkMode,   
    toggleTheme, 
}) {
    return (
        <>
            {view === "list" && (
                <div className="list-view-content">
                    <GridList
                        data={data}
                        toggleStar={toggleStar}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                        editedTitle={editedTitle}
                        setEditedTitle={setEditedTitle}
                        editedLink={editedLink}
                        setEditedLink={setEditedLink}
                        setEditingTitleId={setEditingTitleId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                    />
                </div>
            )}

            {view === "layout" && (
                <div className="grid-view-content">
                    <GridLayout
                        data={data}
                        toggleStar={toggleStar}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                        editedTitle={editedTitle}
                        setEditedTitle={setEditedTitle}
                        editedLink={editedLink}
                        setEditedLink={setEditedLink}
                        setEditingTitleId={setEditingTitleId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                    />
                </div>
            )}

            {view === "compact" && (
                <div className="compact-view-content">
                    <GridCompact
                        data={data}
                        toggleStar={toggleStar}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                        editedTitle={editedTitle}
                        setEditedTitle={setEditedTitle}
                        editedLink={editedLink}
                        setEditedLink={setEditedLink}
                        setEditingTitleId={setEditingTitleId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                    />
                </div> 
            )}
        </>
    );
}

export default Folder;
