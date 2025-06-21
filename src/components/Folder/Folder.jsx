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
    editingTitleId,
    setEditingTitleId,
    editingLinkId,
    setEditingLinkId,
    editingId,
    setEditingId,
    handleSave,
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
                        editingTitleId={editingTitleId}
                        setEditingTitleId={setEditingTitleId}
                        editingLinkId={editingLinkId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
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
                        editingTitleId={editingTitleId}
                        setEditingTitleId={setEditingTitleId}
                        editingLinkId={editingLinkId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
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
                        editingTitleId={editingTitleId}
                        setEditingTitleId={setEditingTitleId}
                        editingLinkId={editingLinkId}
                        setEditingLinkId={setEditingLinkId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        handleSave={handleSave}
                    />
                </div> 
            )}
        </>
    );
}

export default Folder;
