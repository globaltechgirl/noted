import React from "react";

function Note() {
    return (
        <div className="note">
            <div className="note-body">
                <div className="note">
                    <div className="note-img">
                        <img src="/src/assets/images/note-white.png" />    
                    </div>

                    <div className="note-main">
                        <p className="note-header">All Notes</p>
                        <p className="note-text">Last edited today at 12:45</p>
                    </div>
                </div>
                
                <div className="note">
                    <div className="note-img">
                        <img src="/src/assets/images/note-white.png" />    
                    </div>

                    <div className="note-main">
                        <p className="note-header">Daily</p>
                        <p className="note-text">Last edited today at 12:45</p>
                    </div>
                </div>

                                
                <div className="note">
                    <div className="note-img">
                        <img src="/src/assets/images/note-black.png" />    
                    </div>

                    <div className="note-main">
                        <p className="note-header">Personal</p>
                        <p className="note-text">Last edited today at 12:45</p>
                    </div>
                </div>

                                
                <div className="note">
                    <div className="note-img">
                        <img src="/src/assets/images/note-black.png" />    
                    </div>

                    <div className="note-main">
                        <p className="note-header">Daily</p>
                        <p className="note-text">Last edited today at 12:45</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Note;