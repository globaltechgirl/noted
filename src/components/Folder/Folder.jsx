import React from "react";
import './Folder.css';
import GridList from './GridControls/GridList';
import GridLayout from './GridControls/GridLayout';
import GridCompact from './GridControls/GridCompact';

function Folder({ view }) {
    return (
        <div className="folder-body">
            {view === "list" && (
                <div className="list-view-content">
                <GridList />
                </div>
            )}

            {view === "layout" && (
                <div className="grid-view-content">
                <GridLayout />
                </div>
            )}
            
            {view === "compact" && (
                <div className="compact-view-content">
                <GridCompact />
                </div>
            )}
        </div>
    );
}

export default Folder;
