import React, { useState, useRef, useEffect } from "react";
import './Tasks.css';
import { useLanguage } from "../../Context/LanguageContext";
import { folderKeyMap, translations } from  "../../Context/translations";
import { useTheme } from "../../Context/ThemeContext";

function Tasks ({ }) {
    // Language context
    const { selectedLanguage } = useLanguage();
    const t = translations[selectedLanguage]?.folders || {};

    // Theme context
    const { darkMode, toggleTheme } = useTheme();

    // Initial tasks
    const initialTasks = [
        {
            id: 1,
            title: "Category Pages SEO Audit",
            subtitle: "SEO Campaign",
            priority: "Medium",
            status: "todo",
            subtasks: [
                { id: 1, text: "Prepare promotional banners", done: false },
                { id: 2, text: "Landing page assets", done: false },
                { id: 3, text: "Newsletter campaign assets", done: false }
            ]
        },
        {
            id: 2,
            title: "Homepage Redesign",
            subtitle: "UI/UX Update",
            priority: "High",
            status: "todo",
            subtasks: [
                { id: 1, text: "Design hero section", done: false },
                { id: 2, text: "Implement responsive styles", done: false }
            ]
        },
        {
            id: 3,
            title: "Social Media Audit",
            subtitle: "Brand Campaign",
            priority: "Low",
            status: "todo",
            subtasks: [
                { id: 1, text: "Analyze Instagram", done: false },
                { id: 2, text: "Audit Twitter", done: false }
            ]
        }
    ];

    // Tasks state
    const [tasks, setTasks] = useState(initialTasks);

    const [showTodoPopup, setShowTodoPopup] = useState(false);

    const [priority, setPriority] = useState("low");

    // Selected task IDs
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    // Dropdown visibility
    const [showTodoDropdown, setShowTodoDropdown] = useState(false);
    const [showInProgressDropdown, setShowInProgressDropdown] = useState(false);
    const [showCompletedDropdown, setShowCompletedDropdown] = useState(false);
   
    // Dropdown refs
    const todoDropdownRef = useRef(null);
    const inProgressDropdownRef = useRef(null)
    const completedDropdownRef = useRef(null);

    // Filter tasks by status
    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "inprogress");
    const completedTasks = tasks.filter(task => task.status === "completed");

    // Get subtask completion %
    const getProgress = (subtasks) => {
        const completed = subtasks.filter(t => t.done).length;
        return Math.round((completed / subtasks.length) * 100);
    };

    // Toggle subtask done and update status
    const toggleCheck = (taskId, subtaskId) => {
        setTasks(prev =>
            prev.map(task => {
                if (task.id !== taskId) return task;

                const updatedSubtasks = task.subtasks.map(sub =>
                    sub.id === subtaskId ? { ...sub, done: !sub.done } : sub
                );

                const progress = getProgress(updatedSubtasks);

                let newStatus;
                if (progress === 100) newStatus = "completed";
                else if (progress >= 50) newStatus = "inprogress";
                else newStatus = "todo";

                return {
                    ...task,
                    subtasks: updatedSubtasks,
                    status: newStatus
                };
            })
        );
    };

    // Toggle task selection
    const toggleTaskSelection = (taskId) => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId) 
                : [...prev, taskId]               
        );
    };

    // Delete selected tasks
    const deleteSelectedTask = () => {
        setTasks(prev => prev.filter(task => !selectedTaskIds.includes(task.id)));
        setSelectedTaskIds([]);
    };

    // Add new todo task
    const addNewTodoTask = () => {
        const newTask = {
            id: Date.now(),
            title: "New Task",
            subtitle: "New Subtitle",
            priority: "Medium",
            status: "todo",
            subtasks: [
                { id: 1, text: "New Subtask", done: false }
            ]
        };
        setTasks(prev => [newTask, ...prev]);
    };

    // Add new in-progress task
    const addNewInProgressTask = () => {
        const newTask = {
            id: Date.now(),
            title: "New In Progress Task",
            subtitle: "In Progress Subtitle",
            priority: "Low",
            status: "inprogress",
            subtasks: [
                { id: 1, text: "In Progress Subtask", done: false }
            ]
        };
        setTasks(prev => [newTask, ...prev]);
    };

    // Add new completed task
    const addNewCompletedTask = () => {
        const newTask = {
            id: Date.now(),
            title: "New Completed Task",
            subtitle: "Completed Subtitle",
            priority: "High",
            status: "completed",
            subtasks: [
                { id: 1, text: "Completed Subtask 1", done: true },
                { id: 2, text: "Completed Subtask 2", done: true }
            ]
        };
        setTasks(prev => [newTask, ...prev]);
    };

    // Handle outside click to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (todoDropdownRef.current && !todoDropdownRef.current.contains(event.target)) {
                setShowTodoDropdown(false);
            }

            if (inProgressDropdownRef.current && !inProgressDropdownRef.current.contains(event.target)) {
                setShowInProgressDropdown(false);
            }

            if (completedDropdownRef.current && !completedDropdownRef.current.contains(event.target)) {
                setShowCompletedDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="tasks-container">
            <div className="tasks-wrapper">
                <div className="tasks-header">
                    <div className="tasks-header-wrapper">
                        <div className="tasks-logo">
                           <p>Tasks</p>
                        </div>

                        <div className="tasks-icons">
                            <div className="theme-toggle" onClick={toggleTheme}>
                                <div className={`theme-slider ${darkMode ? "dark" : "light"}`}>
                                    <div className="theme-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="theme-light-svg"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-4 0h.01M12 4v.01M20 12h.01M12 20v.01M6.31 6.31L6.3 6.3m11.41.01l-.01-.01m0 11.4l.01.01M6.3 17.7l.01.01"
                                            />
                                        </svg>
                                    </div>

                                    <div className="theme-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="theme-dark-svg"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tasks-body">
                    <div className="tasks-body-header">
                        <div className="tasks-left">
                            <div className="tasks-icon">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-icon-svg" 
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
                                            d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
                                        ></path>
                                        <path 
                                            d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="tasks-right">
                            <div className="tasks-toggle">
                                <p>Last month</p>

                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-toggle-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="m6 9l6 6l6-6"
                                    ></path>
                                </svg>
                            </div>

                            <div className="tasks-search">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-search-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                                    ></path>
                                </svg>
                            </div>

                            <div className="tasks-menu">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="tasks-menu-svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2}
                                        d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="tasks-main">
                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">To Do</p>
                                    <p className="tasks-header-text">{todoTasks.length}</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div className="todo-plus tasks-plus" onClick={() => setShowTodoPopup(true)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="tasks-plus-svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 5v14m-7-7h14"
                                            />
                                        </svg>
                                    </div>

                                    {showTodoPopup && (
                                        <div className="tasks-popup-overlay" onClick={() => setShowTodoPopup(false)}>
                                            <div className="tasks-popup" onClick={(e) => e.stopPropagation()}>
                                                <div className="tasks-popup-content">
                                                    <div className="tasks-popup-top">
                                                        <p>Add New Task</p>

                                                        <button onClick={() => setShowTodoPopup(false)} className="tasks-close-icon">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="tasks-close-icon-svg"
                                                                viewBox="0 0 24 24"
                                                                width="20"
                                                                height="20"
                                                            >
                                                                <path
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M18 6L6 18M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="tasks-popup-middle">
                                                        <div className="tasks-popup-status">
                                                            <div className="priority-grid-wrapper">
                                                                <div 
                                                                    className={`priority-option ${priority === "low" ? "active" : ""}`}
                                                                    onClick={() => setPriority("low")}
                                                                >
                                                                    <svg className="priority-svg" viewBox="0 0 256 256">
                                                                        <circle className="status-svg-outer" cx="128" cy="128" r="48" />
                                                                        <circle className="status-svg-inner" cx="128" cy="128" r="24" />
                                                                    </svg>

                                                                    <p>Low</p>
                                                                </div>

                                                                <div 
                                                                    className={`priority-option ${priority === "medium" ? "active" : ""}`}
                                                                    onClick={() => setPriority("medium")}
                                                                >
                                                                    <svg className="priority-svg" viewBox="0 0 256 256">
                                                                        <circle className="status-svg-outer" cx="128" cy="128" r="48" />
                                                                        <circle className="status-svg-inner" cx="128" cy="128" r="24" />
                                                                    </svg>
                                                                    
                                                                    <p>Medium</p>
                                                                </div>

                                                                <div 
                                                                    className={`priority-option ${priority === "high" ? "active" : ""}`}
                                                                    onClick={() => setPriority("high")}
                                                                >
                                                                    <svg className="priority-svg" viewBox="0 0 256 256">
                                                                        <circle className="status-svg-outer" cx="128" cy="128" r="48" />
                                                                        <circle className="status-svg-inner" cx="128" cy="128" r="24" />
                                                                    </svg>

                                                                    <p>High</p>
                                                                </div>

                                                                <div className="slider">
                                                                    <div className={`ball ball-${priority}`}></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tasks-popup-title">
                                                            
                                                        </div>
                                                    </div>

                                                    <button
                                                    onClick={() => {
                                                        addNewTodoTask();
                                                        setShowTodoPopup(false);
                                                    }}
                                                    >
                                                    Add Task
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div 
                                        className="todo-menu tasks-menu"
                                        onClick={() => {
                                            setShowTodoDropdown(prev => !prev);
                                            setShowInProgressDropdown(false);
                                        }}
                                        ref={todoDropdownRef}
                                        style={{ position: "relative" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="tasks-menu-svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                            />
                                        </svg>

                                        {showTodoDropdown && (
                                            <div className="tasks-dropdown-options">
                                                <div onClick={deleteSelectedTask}>Delete Task</div>
                                                <div onClick={deleteSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {todoTasks.map(task => {
                                    const progress = getProgress(task.subtasks);
                                    return (
                                        <div 
                                            key={task.id} 
                                            className={`tasks-body-list ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                        >
                                            <div className="tasks-list-top">
                                                <div className="tasks-list-toggle">
                                                    <p>{task.priority}</p>
                                                </div>

                                                <div 
                                                    className="select-task-check"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        toggleTaskSelection(task.id);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`check-task-icon ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m5 12l5 5L20 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="tasks-list-middle">
                                                <div className="tasks-list-header">
                                                    <p>{task.title}</p>
                                                </div>

                                                <div className="tasks-list-text">
                                                    <p>{task.subtitle}</p>
                                                </div>

                                                <div className="tasks-list-checks">
                                                    <ul>
                                                        {task.subtasks.map(sub => (
                                                            <li
                                                                key={sub.id}
                                                                onClick={() => toggleCheck(task.id, sub.id)}
                                                                className={sub.done ? "subtask-done" : ""}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`tasks-list-checks-svg ${sub.done ? "subtask-done" : ""}`}
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="m5 12l5 5L20 7"
                                                                    />
                                                                </svg>

                                                                <p className={sub.done ? "subtask-done" : ""}>{sub.text}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="tasks-list-bottom">
                                                <div className="tasks-list-progress">
                                                    <div className="tasks-progress-top">
                                                        <p>Progress</p>
                                                        <p>{progress}%</p>
                                                    </div>

                                                    <div className="tasks-progress-bar">
                                                        <div
                                                            className="tasks-progress-fill"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">In Progress</p>
                                    <p className="tasks-header-text">{inProgressTasks.length}</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div 
                                        className="inprogress-menu tasks-menu"
                                        onClick={() => {
                                            setShowInProgressDropdown(prev => !prev);
                                            setShowTodoDropdown(false);
                                        }}
                                        ref={inProgressDropdownRef}
                                        style={{ position: "relative" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="tasks-menu-svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                            />
                                        </svg>

                                        {showInProgressDropdown && (
                                            <div className="tasks-dropdown-options">
                                                <div onClick={deleteSelectedTask}>Delete Task</div>
                                                <div onClick={deleteSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {inProgressTasks.map(task => {
                                    const progress = getProgress(task.subtasks);
                                    return (
                                        <div 
                                            key={task.id} 
                                            className={`tasks-body-list ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                        >
                                            <div className="tasks-list-top">
                                                <div className="tasks-list-toggle">
                                                    <p>{task.priority}</p>
                                                </div>

                                                <div 
                                                    className="select-task-check"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        toggleTaskSelection(task.id);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`check-task-icon ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m5 12l5 5L20 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="tasks-list-middle">
                                                <div className="tasks-list-header">
                                                    <p>{task.title}</p>
                                                </div>

                                                <div className="tasks-list-text">
                                                    <p>{task.subtitle}</p>
                                                </div>

                                                <div className="tasks-list-checks">
                                                    <ul>
                                                        {task.subtasks.map(sub => (
                                                            <li
                                                                key={sub.id}
                                                                onClick={() => toggleCheck(task.id, sub.id)}
                                                                className={sub.done ? "subtask-done" : ""}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`tasks-list-checks-svg ${sub.done ? "subtask-done" : ""}`}
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="m5 12l5 5L20 7"
                                                                    />
                                                                </svg>

                                                                <p className={sub.done ? "subtask-done" : ""}>{sub.text}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="tasks-list-bottom">
                                                <div className="tasks-list-progress">
                                                    <div className="tasks-progress-top">
                                                        <p>Progress</p>
                                                        <p>{progress}%</p>
                                                    </div>

                                                    <div className="tasks-progress-bar">
                                                        <div
                                                            className="tasks-progress-fill"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">Completed</p>
                                    <p className="tasks-header-text">{completedTasks.length}</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div 
                                        className="completed-menu tasks-menu"
                                        onClick={() => {
                                            setShowCompletedDropdown(prev => !prev);
                                            setShowTodoDropdown(false);
                                            setShowInProgressDropdown(false);
                                        }}
                                        ref={completedDropdownRef}
                                        style={{ position: "relative" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="tasks-menu-svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                                            />
                                        </svg>

                                        {showCompletedDropdown && (
                                            <div className="tasks-dropdown-options">
                                                <div onClick={deleteSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {completedTasks.map(task => {
                                    const progress = getProgress(task.subtasks);
                                    return (
                                        <div 
                                            key={task.id} 
                                            className={`tasks-body-list ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                        >
                                            <div className="tasks-list-top">
                                                <div className="tasks-list-toggle">
                                                    <p>{task.priority}</p>
                                                </div>

                                                <div 
                                                    className="select-task-check"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        toggleTaskSelection(task.id);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`check-task-icon ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m5 12l5 5L20 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="tasks-list-middle">
                                                <div className="tasks-list-header">
                                                    <p>{task.title}</p>
                                                </div>

                                                <div className="tasks-list-text">
                                                    <p>{task.subtitle}</p>
                                                </div>

                                                <div className="tasks-list-checks">
                                                    <ul>
                                                        {task.subtasks.map(sub => (
                                                            <li
                                                                key={sub.id}
                                                                onClick={() => toggleCheck(task.id, sub.id)}
                                                                className={sub.done ? "subtask-done" : ""}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`tasks-list-checks-svg ${sub.done ? "subtask-done" : ""}`}
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="m5 12l5 5L20 7"
                                                                    />
                                                                </svg>

                                                                <p className={sub.done ? "subtask-done" : ""}>{sub.text}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="tasks-list-bottom">
                                                <div className="tasks-list-progress">
                                                    <div className="tasks-progress-top">
                                                        <p>Progress</p>
                                                        <p>{progress}%</p>
                                                    </div>

                                                    <div className="tasks-progress-bar">
                                                        <div
                                                            className="tasks-progress-fill"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
