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
            category: "General", 
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
            category: "Personal",
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
            category: "Daily",
            subtasks: [
                { id: 1, text: "Analyze Instagram", done: false },
                { id: 2, text: "Audit Twitter", done: false }
            ]
        }
    ];

    // States
    const [tasks, setTasks] = useState(initialTasks);
    const [priority, setPriority] = useState("low");
    const [showTodoPopup, setShowTodoPopup] = useState(false);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const initialCategory = tasks.find(task => task.category !== "General")?.category || "All";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [showCategorySelector, setShowCategorySelector] = useState(false);

    const [showTodoDropdown, setShowTodoDropdown] = useState(false);
    const [showInProgressDropdown, setShowInProgressDropdown] = useState(false);
    const [showCompletedDropdown, setShowCompletedDropdown] = useState(false);

    const [showPlusDropdown, setShowPlusDropdown] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);

    const [editingTaskTitle, setEditingTaskTitle] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("New Task");

    const [editingTaskSubtitle, setEditingTaskSubtitle] = useState(false);
    const [newTaskSubtitle, setNewTaskSubtitle] = useState("New Task");

    const [taskStep, setTaskStep] = useState(0);
const touchStartXRef = useRef(0);
const touchEndXRef = useRef(0);

const [taskInputs, setTaskInputs] = useState([""]); 
const [editingIndex, setEditingIndex] = useState(null);


    const [categoryFilter, setCategoryFilter] = useState({
        priority: "",
        status: ""
    });
   
    // Refs
    const todoDropdownRef = useRef(null);
    const inProgressDropdownRef = useRef(null);
    const completedDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    // Filtered task lists
    const generalTasks = tasks.filter(
        task =>
            task.category === "General" &&
            task.status !== "archived" &&
            (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
            (!categoryFilter.status || task.status === categoryFilter.status)
    );

    const categoryTasks = tasks.filter(
        task =>
            task.category !== "General" &&
            task.status !== "archived" &&
            (selectedCategory === "All" || task.category === selectedCategory) &&
            (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
            (!categoryFilter.status || task.status === categoryFilter.status)
    );

    const generalTodoTasks = generalTasks.filter(task => task.status === "todo");
    const generalInProgressTasks = generalTasks.filter(task => task.status === "inprogress");
    const generalCompletedTasks = generalTasks.filter(task => task.status === "completed");

    const filteredCategoryTasks =
        selectedCategory === "All"
            ? [...generalTasks, ...categoryTasks]
            : categoryTasks.filter(task => task.category === selectedCategory);

    // Get subtask completion %
    const getProgress = (subtasks) => {
        const completed = subtasks.filter(t => t.done).length;
        return Math.round((completed / subtasks.length) * 100);
    };

    // Toggle subtask completion
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

    // Archive selected tasks
    const archiveSelectedTask = () => {
        setTasks(prev =>
            prev.map(task =>
                selectedTaskIds.includes(task.id)
                    ? { ...task, status: "archived" }
                    : task
                )
            );
        setSelectedTaskIds([]);
    };

    // Move selected tasks to category
    const moveSelectedTasksToCategory = (newCategory) => {
        setTasks(prev =>
            prev.map(task =>
                selectedTaskIds.includes(task.id)
                    ? { ...task, category: newCategory }
                    : task
                )
            );
        setTimeout(() => {
            setSelectedTaskIds([]);
        }, 0);
        setShowCategorySelector(false);
    };

    // Add tasks
    const addNewTodoTask = () => {
        const newTask = {
            id: Date.now(),
            title: "New Task",
            subtitle: "New Subtitle",
            priority: "Medium",
            status: "todo",
            category: selectedCategory === "All" ? "Personal" : selectedCategory,
            subtasks: [{ id: 1, text: "New Subtask", done: false }]
        };
        setTasks(prev => [newTask, ...prev]);
    };

    // Handle outside clicks
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
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setShowCategoryMenu(false);
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
                                    <p className="tasks-header-text">{generalTodoTasks.length}</p>
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
                                                        <div className="tasks-popup-priority">
                                                            <div className="tasks-priority-option">
                                                                <div 
                                                                    className={`priority-option ${priority === "low" ? "active" : ""}`}
                                                                    onClick={() => setPriority("low")}
                                                                >
                                                                    <p>Low</p>
                                                                </div> 
                                                            </div>

                                                            <div className="tasks-priority-option">
                                                                <div 
                                                                    className={`priority-option ${priority === "medium" ? "active" : ""}`}
                                                                    onClick={() => setPriority("medium")}
                                                                >
                                                                    <p>Medium</p>
                                                                </div> 
                                                            </div>

                                                            <div className="tasks-priority-option">
                                                                <div 
                                                                    className={`priority-option ${priority === "high" ? "active" : ""}`}
                                                                    onClick={() => setPriority("high")}
                                                                >
                                                                    <p>High</p>
                                                                </div> 
                                                            </div>

                                                            <div className="slider">
                                                                <div className={`ball ball-${priority}`}></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="tasks-popup-middle">
                                                        <div className="tasks-popup-middle-wrapper">
                                                            <div 
                                                                className="popup-middle-slider"
                                                                style={{
                                                                    transform: `translateX(-${taskStep * 100}%)`,
                                                                }}
                                                                onTouchStart={(e) => {
                                                                    touchStartXRef.current = e.touches[0].clientX;
                                                                }}
                                                                onTouchMove={(e) => {
                                                                    touchEndXRef.current = e.touches[0].clientX;
                                                                }}
                                                                onTouchEnd={() => {
                                                                    const deltaX = touchEndXRef.current - touchStartXRef.current;

                                                                    if (deltaX > 30 && taskStep > 0) {
                                                                        setTaskStep((prev) => prev - 1);
                                                                    }

                                                                    if (deltaX < -30 && taskStep < 2) {
                                                                        setTaskStep((prev) => prev + 1);
                                                                    }

                                                                    touchStartXRef.current = 0;
                                                                    touchEndXRef.current = 0;
                                                                }}
                                                            >
                                                                <div className="middle-slider-page middle-slider-title">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task Title</p>

                                                                            <svg 
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="popup-text-save-svg" 
                                                                                viewBox="0 0 24 24"
                                                                            >   
                                                                                <g 
                                                                                    fill="none" 
                                                                                    stroke="currentColor" 
                                                                                    strokeLinecap="round" 
                                                                                    strokeLinejoin="round" 
                                                                                    strokeWidth={2}
                                                                                >
                                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path>
                                                                                    <path d="m9 12l2 2l4-4"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>

                                                                        <div className="popup-text-contents">
                                                                            {editingTaskTitle ? (
                                                                                <input
                                                                                    type="text"
                                                                                    value={newTaskTitle}
                                                                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                                                                    onBlur={() => setEditingTaskTitle(false)} 
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter") {
                                                                                            setEditingTaskTitle(false);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                />
                                                                            ) : (
                                                                                <p
                                                                                    className="popup-text-input-p"
                                                                                    onClick={() => setEditingTaskTitle(true)}
                                                                                >
                                                                                    Enter new task title
                                                                                </p>
                                                                            )}

                                                                            <div className="popup-text-footer">
                                                                                <svg 
                                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                                    className="text-footer-svg" 
                                                                                    viewBox="0 0 24 24"
                                                                                >   
                                                                                    <path 
                                                                                        fill="currentColor" 
                                                                                        d="M19 2a3 3 0 0 1 2.995 2.824L22 5v14a3 3 0 0 1-2.824 2.995L19 22H5a3 3 0 0 1-2.995-2.824L2 19V5a3 3 0 0 1 2.824-2.995L5 2zm-7 9h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z"
                                                                                    ></path>
                                                                                </svg>
                                                                                    
                                                                                <p>Allows words between 50-100 letters</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-subtitle">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task Subtitle</p>

                                                                            <svg 
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="popup-text-save-svg" 
                                                                                viewBox="0 0 24 24"
                                                                            >   
                                                                                <g 
                                                                                    fill="none" 
                                                                                    stroke="currentColor" 
                                                                                    strokeLinecap="round" 
                                                                                    strokeLinejoin="round" 
                                                                                    strokeWidth={2}
                                                                                >
                                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path>
                                                                                    <path d="m9 12l2 2l4-4"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>

                                                                        <div className="popup-text-contents">
                                                                            {editingTaskSubtitle ? (
                                                                                <input
                                                                                    type="text"
                                                                                    value={newTaskSubtitle}
                                                                                    onChange={(e) => setNewTaskSubtitle(e.target.value)}
                                                                                    onBlur={() => setEditingTaskSubtitle(false)} 
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter") {
                                                                                            setEditingTaskSubtitle(false);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                />
                                                                            ) : (
                                                                                <p
                                                                                    className="popup-text-input-p"
                                                                                    onClick={() => setEditingTaskSubtitle(true)}
                                                                                >
                                                                                    Enter new task subtitle
                                                                                </p>
                                                                            )}

                                                                            <div className="popup-text-footer">
                                                                                <svg 
                                                                                    xmlns="http://www.w3.org/2000/svg" 
                                                                                    className="text-footer-svg" 
                                                                                    viewBox="0 0 24 24"
                                                                                >   
                                                                                    <path 
                                                                                        fill="currentColor" 
                                                                                        d="M19 2a3 3 0 0 1 2.995 2.824L22 5v14a3 3 0 0 1-2.824 2.995L19 22H5a3 3 0 0 1-2.995-2.824L2 19V5a3 3 0 0 1 2.824-2.995L5 2zm-7 9h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z"
                                                                                    ></path>
                                                                                </svg>
                                                                                    
                                                                                <p>Allows words between 50-100 letters</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-list">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task List</p>

                                                                            <svg 
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="popup-text-save-svg" 
                                                                                viewBox="0 0 24 24"
                                                                            >   
                                                                                <g 
                                                                                    fill="none" 
                                                                                    stroke="currentColor" 
                                                                                    strokeLinecap="round" 
                                                                                    strokeLinejoin="round" 
                                                                                    strokeWidth={2}
                                                                                >
                                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path>
                                                                                    <path d="m9 12l2 2l4-4"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>

                                                                        <div className="popup-text-contents-wrapper">
                                                                            {taskInputs.map((task, index) => (
                                                                                <div key={index} className="popup-text-contents">
                                                                                    <div className="popup-text-item">
                                                                                        {editingIndex === index ? (
                                                                                            <input
                                                                                                type="text"
                                                                                                value={task}
                                                                                                onChange={(e) => {
                                                                                                    const updated = [...taskInputs];
                                                                                                    updated[index] = e.target.value;
                                                                                                    setTaskInputs(updated);
                                                                                                }}
                                                                                                onBlur={() => setEditingIndex(null)}
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key === "Enter") setEditingIndex(null);
                                                                                                }}
                                                                                                autoFocus
                                                                                                className="popup-text-input"
                                                                                            />
                                                                                        ) : (
                                                                                            <p
                                                                                                className="popup-text-input-p"
                                                                                                onClick={() => setEditingIndex(index)}
                                                                                            >
                                                                                                {task || `Task ${index + 1}`}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}

                                                                            <div className="popup-text-contents">
                                                                                <div
                                                                                    className="popup-text-item add-task-block"
                                                                                    onClick={() => {
                                                                                        setTaskInputs([...taskInputs, ""]);
                                                                                        setEditingIndex(taskInputs.length);
                                                                                    }}
                                                                                >
                                                                                    <p>Add Task List</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="tasks-popup-bottom">
                                                        {taskStep < 2 ? (
                                                            <div className="tasks-slider-dots">
                                                                {[0, 1, 2].map((step) => (
                                                                    <span
                                                                        key={step}
                                                                        className={`dot ${taskStep === step ? "active" : ""}`}
                                                                        onClick={() => setTaskStep(step)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div 
                                                                className="tasks-slider-button"
                                                                onClick={() => {
                                                                    addNewTodoTask(); 
                                                                    setShowTodoPopup(false);
                                                                    setTaskStep(0); 
                                                                }}
                                                            >
                                                                <p>Add task</p>
                                                            </div>
                                                        )}
                                                    </div>
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
                                                <div className="tasks-dropdown-item" onClick={deleteSelectedTask}>Delete Task</div>
                                                <div className="tasks-dropdown-item" onClick={deleteSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {generalTodoTasks.map(task => {
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
                                    <p className="tasks-header-text">{generalInProgressTasks.length}</p>
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
                                                <div className="tasks-dropdown-item" onClick={deleteSelectedTask}>Delete Task</div>
                                                <div className="tasks-dropdown-item" onClick={archiveSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {generalInProgressTasks.map(task => {
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
                                    <p className="tasks-header-text">{generalCompletedTasks.length}</p>
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
                                                <div className="tasks-dropdown-item" onClick={deleteSelectedTask}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {generalCompletedTasks.map(task => {
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
                                    <p className="tasks-header-name">{selectedCategory}</p>
                                    <p className="tasks-header-text">{filteredCategoryTasks.length}</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div style={{ position: "relative" }}>
                                        <div
                                            className="todo-plus tasks-plus"
                                            onClick={() => {
                                                setShowPlusDropdown(prev => !prev);
                                                setShowCategoryMenu(false); 
                                            }}
                                        >
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

                                        {showPlusDropdown && (
                                            <div className="tasks-dropdown-options plus-dropdown">
                                                <div
                                                    className="tasks-dropdown-item"
                                                    onClick={() => {
                                                        setShowTodoPopup(true);
                                                        setShowPlusDropdown(false);
                                                    }}
                                                >
                                                    Add Task
                                                </div>

                                                <div
                                                    className="tasks-dropdown-item"
                                                    onClick={() => {
                                                        setShowCategoryPopup(true);
                                                        setShowPlusDropdown(false);
                                                    }}
                                                >
                                                    Add Category
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {showCategoryPopup && (
                                        <div className="tasks-popup-overlay" onClick={() => setShowCategoryPopup(false)}>
                                            <div className="tasks-popup" onClick={(e) => e.stopPropagation()}>
                                                <div className="tasks-popup-content">
                                                    <div className="tasks-popup-top">
                                                        <p>Add New Category</p>

                                                        <button onClick={() => setShowCategoryPopup(false)} className="tasks-close-icon">
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
                                                        <input
                                                            type="text"
                                                            placeholder="Category Name"
                                                            className="input-new-category"
                                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                                        />
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setShowCategoryPopup(false);
                                                        }}
                                                        >
                                                        Add Category
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div
                                        className="category-menu tasks-menu"
                                        onClick={() => {
                                            setShowCategoryMenu(prev => !prev);
                                            setShowTodoDropdown(false);
                                            setShowInProgressDropdown(false);
                                            setShowCompletedDropdown(false);
                                        }}
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

                                        {showCategoryMenu && (
                                            <div className="tasks-dropdown-options" ref={categoryDropdownRef}>
                                                {!showCategorySelector ? (
                                                    <div className="menu-slide">
                                                        <div className="tasks-dropdown-item">Delete Task</div>
                                                        <div className="tasks-dropdown-item">Archive Task</div>
                                                        <div
                                                            className="tasks-dropdown-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowCategorySelector(true);
                                                            }}
                                                        >
                                                            Select Category
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="menu-slide">
                                                        <div
                                                            className="tasks-dropdown-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowCategorySelector(false);
                                                            }}
                                                        >
                                                            ← Back
                                                        </div>

                                                        {["Work", "Personal", "Daily"].map((category) => (
                                                            <div
                                                                key={category}
                                                                className="tasks-dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedCategory(category);
                                                                    moveSelectedTasksToCategory(category);
                                                                    setShowCategoryMenu(false); 
                                                                }}
                                                            >
                                                                {category}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tasks-todo">
                                {filteredCategoryTasks.map(task => {
                                    const progress = getProgress(task.subtasks);
                                    return (
                                        <div
                                            key={task.id}
                                            className={`tasks-body-list ${selectedTaskIds.includes(task.id) ? "selected" : ""} $ 
                                                {task.category === "Work" ? "special-category-task" : ""
                                            }`}
                                        >
                                            <div className="tasks-list-top">
                                                <div className="tasks-list-toggle-wrapper">
                                                    <div className="tasks-list-toggle">
                                                        <p className={`status-label ${task.status}`}>
                                                            {task.status === "todo"
                                                                ? "To-do"
                                                                : task.status === "inprogress"
                                                                ? "In Progress"
                                                                : "Completed"}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="tasks-list-toggle">
                                                        <p>{task.priority}</p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="select-task-check"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        toggleTaskSelection(task.id);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={`check-task-icon ${
                                                            selectedTaskIds.includes(task.id) ? "selected" : ""
                                                        }`}
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
                                                                    className={`tasks-list-checks-svg ${
                                                                        sub.done ? "subtask-done" : ""
                                                                    }`}
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

                                                                <p className={sub.done ? "subtask-done" : ""}>
                                                                    {sub.text}
                                                                </p>
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
