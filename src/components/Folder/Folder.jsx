import React from "react";
import './Folder.css';
import GridList from './GridControls/GridList';
import GridLayout from './GridControls/GridLayout';
import GridCompact from './GridControls/GridCompact';

function Folder({ view, data = [], toggleStar }) {
    return (
        <>
            {view === "list" && (
                <div className="list-view-content">
                    <GridList data={data} toggleStar={toggleStar} />
                </div>
            )}

            {view === "layout" && (
                <div className="grid-view-content">
                    <GridLayout data={data} toggleStar={toggleStar} />
                </div>
            )}
            
            {view === "compact" && (
                <div className="compact-view-content">
                    <GridCompact data={data} toggleStar={toggleStar} />
                </div>
            )}
        </>
    );
}

export default Folder;
