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

    const initialTasks = [
        {
            id: 1,
            title: "Category Pages SEO Audit",
            subtitle: "SEO Campaign",
            priority: "Medium",
            status: "todo",
            category: "General",
            createdAt: "2025-07-07T10:00:00Z",
            subtasks: [
                { id: 1, text: "Prepare promotional banners", done: false },
                { id: 2, text: "Landing page assets", done: false },
                { id: 3, text: "Newsletter campaign assets", done: false },
            ],
        },
        {
            id: 2,
            title: "Homepage Redesign",
            subtitle: "UI/UX Update",
            priority: "High",
            status: "todo",
            category: "Personal",
            createdAt: "2025-07-07T10:00:00Z",
            subtasks: [
                { id: 1, text: "Design hero section", done: false },
                { id: 2, text: "Implement responsive styles", done: false },
            ],
        },
        {
            id: 3,
            title: "Social Media Audit",
            subtitle: "Brand Campaign",
            priority: "Low",
            status: "todo",
            category: "Daily",
            createdAt: "2025-07-07T10:00:00Z",
            subtasks: [
                { id: 1, text: "Analyze Instagram", done: false },
                { id: 2, text: "Audit Twitter", done: false },
            ],
        },
    ];

    // States
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [priority, setPriority] = useState("low");
    const [taskSource, setTaskSource] = useState("todo");

    const [categories, setCategories] = useState(["Work", "Personal", "Daily"]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(false);
    const initialCategory = tasks.find((t) => t.category !== "General")?.category || "All";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const [showTodoPopup, setShowTodoPopup] = useState(false);
    const [showCategoryTaskPopup, setShowCategoryTaskPopup] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showPlusDropdown, setShowPlusDropdown] = useState(false);
    const [showTodoDropdown, setShowTodoDropdown] = useState(false);
    const [showInProgressDropdown, setShowInProgressDropdown] = useState(false);
    const [showCompletedDropdown, setShowCompletedDropdown] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);

    const [editingTaskTitle, setEditingTaskTitle] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editingTaskSubtitle, setEditingTaskSubtitle] = useState(false);
    const [newTaskSubtitle, setNewTaskSubtitle] = useState("");
    const [taskInputs, setTaskInputs] = useState([""]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [taskStep, setTaskStep] = useState(0);
    
    const [categoryFilter, setCategoryFilter] = useState({ priority: "", status: "" });
    const [selectedTimeFilter, setSelectedTimeFilter] = useState("Last Month");

    // Refs
    const touchStartXRef = useRef(0);
    const touchEndXRef = useRef(0);
    const todoDropdownRef = useRef(null);
    const inProgressDropdownRef = useRef(null);
    const completedDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    // Utility Functions
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const getProgress = (subtasks) => {
        const completed = subtasks.filter((t) => t.done).length;
        return Math.round((completed / subtasks.length) * 100);
    };

    const getTimeAgo = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffInSeconds = Math.floor((now - created) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return "Just now";
    };

    const isWithinTimeFilter = (createdAt, filter) => {
        const created = new Date(createdAt);
        const now = new Date();

        switch (filter) {
            case "Today":
                return created.toDateString() === now.toDateString();
            case "This Week":
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                return created >= startOfWeek;
            case "This Month":
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                return created >= startOfMonth;
            case "This Year":
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                return created >= startOfYear;
            case "All Tasks":
            default:
                return true;
        }
    };

    const getAvailableTimeFilters = () => {
        return ["Today", "This Week", "This Month", "This Year", "All Tasks"];
    };

    const availableTimeFilters = getAvailableTimeFilters(tasks);

    const handleTimeFilter = (filter) => {
        setSelectedTimeFilter(filter);
        setShowTimeDropdown(false);
    };

    // Derived Data
    const generalTasks = tasks.filter(
        (task) =>
            task.category === "General" &&
            task.status !== "archived" &&
            isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
            (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
            (!categoryFilter.status || task.status === categoryFilter.status)
    );

    const generalTodoTasks = generalTasks.filter((task) => task.status === "todo");
    const generalInProgressTasks = generalTasks.filter((task) => task.status === "inprogress");
    const generalCompletedTasks = generalTasks.filter((task) => task.status === "completed");

    const categoryTasks = tasks.filter(
        (task) =>
            task.category !== "General" &&
            task.status !== "archived" &&
            isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
            (selectedCategory === "All" || task.category === selectedCategory) &&
            (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
            (!categoryFilter.status || task.status === categoryFilter.status)
    );

    const filteredCategoryTasks =
            selectedCategory === "All" ? [...generalTasks, ...categoryTasks] : categoryTasks;

    // Task Actions
    const toggleCheck = (taskId, subtaskId) => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id !== taskId) return task;

                const updatedSubtasks = task.subtasks.map((sub) =>
                    sub.id === subtaskId ? { ...sub, done: !sub.done } : sub
                );

                const progress = getProgress(updatedSubtasks);
                const newStatus = progress === 100 ? "completed" : progress >= 50 ? "inprogress" : "todo";

                return {
                    ...task,
                    subtasks: updatedSubtasks,
                    status: newStatus,
                };
            })
        );
    };

    const toggleTaskSelection = (taskId) => {
        setSelectedTaskIds((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    const deleteSelectedTask = () => {
        setTasks((prev) => prev.filter((task) => !selectedTaskIds.includes(task.id)));
        setSelectedTaskIds([]);
    };

    const archiveSelectedTask = () => {
        setTasks((prev) =>
            prev.map((task) =>
                selectedTaskIds.includes(task.id) ? { ...task, status: "archived" } : task
            )
        );
        setSelectedTaskIds([]);
    };

    const moveSelectedTasksToCategory = (newCategory) => {
        setTasks((prev) =>
            prev.map((task) =>
                selectedTaskIds.includes(task.id) ? { ...task, category: newCategory } : task
            )
        );
        setTimeout(() => setSelectedTaskIds([]), 0);
        setShowCategorySelector(false);
    };

    const resetTaskPopup = () => {
        setShowTodoPopup(false);
        setShowCategoryTaskPopup(false);
        setNewTaskTitle("");
        setNewTaskSubtitle("");
        setTaskInputs([""]);
        setEditingIndex(null);
        setTaskStep(0);
    };

    const addNewTodoTask = () => {
        const newSubtasks = taskInputs.filter(Boolean).map((text, index) => ({
            id: index + 1,
            text,
            done: false,
        }));

        const newTask = {
            id: Date.now(),
            title: newTaskTitle || "Untitled Task",
            subtitle: newTaskSubtitle || "",
            priority: capitalize(priority),
            status: "todo",
            category: "General",
            createdAt: new Date().toISOString(),
            subtasks: newSubtasks.length > 0 ? newSubtasks : [{ id: 1, text: "New Subtask", done: false }],
        };

        setTasks((prev) => [newTask, ...prev]);
        resetTaskPopup();
    };

    const addNewCategoryTask = () => {
        const newSubtasks = taskInputs.filter(Boolean).map((text, index) => ({
            id: index + 1,
            text,
            done: false,
        }));

        const newTask = {
            id: Date.now(),
            title: newTaskTitle || "Untitled Task",
            subtitle: newTaskSubtitle || "",
            priority: capitalize(priority),
            status: "todo",
            category: selectedCategory === "All" ? "Personal" : selectedCategory,
            createdAt: new Date().toISOString(),
            subtasks: newSubtasks.length > 0 ? newSubtasks : [{ id: 1, text: "New Subtask", done: false }],
        };

        setTasks((prev) => [newTask, ...prev]);
        resetTaskPopup();
    };

    const addNewCategory = () => {
        const name = newCategoryName.trim() || `Category ${categories.length + 1}`;
        if (!categories.includes(name)) setCategories((prev) => [...prev, name]);
        setNewCategoryName("");
        setShowCategoryPopup(false);
        setTaskStep(0);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (todoDropdownRef.current && !todoDropdownRef.current.contains(event.target)) setShowTodoDropdown(false);
            if (inProgressDropdownRef.current && !inProgressDropdownRef.current.contains(event.target)) setShowInProgressDropdown(false);
            if (completedDropdownRef.current && !completedDropdownRef.current.contains(event.target)) setShowCompletedDropdown(false);
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) setShowCategoryMenu(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                            <div className="tasks-toggle" onClick={() => setShowTimeDropdown(prev => !prev)}>
                                <p>{selectedTimeFilter}</p>

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

{showTimeDropdown && (
  <div className="tasks-dropdown-menu">
    {getAvailableTimeFilters().map(filter => (
      <div
        key={filter}
        className={`tasks-dropdown-item ${selectedTimeFilter === filter ? "active" : ""}`}
        onClick={() => {
          setSelectedTimeFilter(filter); // or null if you want to clear
          setShowTimeDropdown(false);
        }}
      >
        {filter}
      </div>
    ))}
  </div>
)}



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
                                    <div 
                                        className="todo-plus tasks-plus" 
                                        onClick={() => {
                                            setShowTodoPopup(true);
                                            setTaskSource("todo");
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
                                                                                    
                                                                                <p>Must be between 50 and 100 characters</p>
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
                                                                                    
                                                                                <p>Must be between 50 and 100 characters</p>
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
                                                        <p>{progress}%</p>

                                                        <div className="tasks-list-date">
                                                            <svg   
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="tasks-list-date-svg" 
                                                                viewBox="0 0 24 24"
                                                            >   
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth={2}
                                                                >
                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                                                                    <path d="M12 7v5l3 3"></path>
                                                                </g>
                                                            </svg>

                                                            <p>{getTimeAgo(task.createdAt)}</p>
                                                        </div>
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
                                                        <p>{progress}%</p>

                                                        <div className="tasks-list-date">
                                                            <svg   
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="tasks-list-date-svg" 
                                                                viewBox="0 0 24 24"
                                                            >   
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth={2}
                                                                >
                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                                                                    <path d="M12 7v5l3 3"></path>
                                                                </g>
                                                            </svg>

                                                            <p>{getTimeAgo(task.createdAt)}</p>
                                                        </div>
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
                                                        <p>{progress}%</p>

                                                        <div className="tasks-list-date">
                                                            <svg   
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="tasks-list-date-svg" 
                                                                viewBox="0 0 24 24"
                                                            >   
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth={2}
                                                                >
                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                                                                    <path d="M12 7v5l3 3"></path>
                                                                </g>
                                                            </svg>

                                                            <p>{getTimeAgo(task.createdAt)}</p>
                                                        </div>
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
                                                        setShowCategoryTaskPopup(true)
                                                        setShowPlusDropdown(false);
                                                        setTaskSource("category")
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

                                    {showCategoryTaskPopup && (
                                        <div className="tasks-popup-overlay" onClick={() => setShowCategoryTaskPopup(false)}>
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
                                                                                    
                                                                                <p>Must be between 50 and 100 characters</p>
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
                                                                                    
                                                                                <p>Must be between 50 and 100 characters</p>
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
                                                                    addNewCategoryTask();
                                                                    setShowCategoryTaskPopup(false);
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

                                    {showCategoryPopup && (
                                        <div className="tasks-popup-overlay" onClick={() => setShowCategoryPopup(false)}>
                                            <div className="tasks-popup" onClick={(e) => e.stopPropagation()}>
                                                <div className="tasks-popup-content">
                                                    <div className="tasks-popup-middle">
                                                        <div className="tasks-popup-middle-wrapper">
                                                            <div className="popup-middle-slider">
                                                                <div className="middle-slider-page">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task Category</p>

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
                                                                            <div className="popup-text-contents">
                                                                                {editingCategory ? (
                                                                                    <input
                                                                                        type="text"
                                                                                        value={newCategoryName}
                                                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                                                        onBlur={() => setEditingCategory(false)}
                                                                                        onKeyDown={(e) => {
                                                                                            if (e.key === "Enter") setEditingCategory(false);
                                                                                        }}
                                                                                        autoFocus
                                                                                        className="popup-text-input"
                                                                                    />
                                                                                ) : (
                                                                                    <p
                                                                                        className="popup-text-input-p"
                                                                                        onClick={() => setEditingCategory(true)}
                                                                                    >
                                                                                        {newCategoryName || "Enter new category"}
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
                                                                                        
                                                                                    <p>Must be between 50 and 100 characters</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="tasks-popup-bottom">
                                                        <div 
                                                            className="tasks-slider-button"
                                                            onClick={() => {
                                                                addNewCategory();
                                                                setShowCategoryPopup(false);
                                                                setTaskStep(0);
                                                            }}
                                                        >
                                                            <p>Add Category</p>
                                                        </div>
                                                    </div>
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
                                                            className="tasks-dropdown-item tasks-dropdown-item-icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowCategorySelector(false);
                                                            }}
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="tasks-dropdown-item-icon-svg" 
                                                                viewBox="0 0 24 24"
                                                            >   
                                                                <path 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth={2} 
                                                                    d="M5 12h14M5 12l6 6m-6-6l6-6"
                                                                ></path>
                                                            </svg>
                                                        </div>

                                                        {categories.map((category) => (
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
                                                        <p>{progress}%</p>

                                                        <div className="tasks-list-date">
                                                            <svg   
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="tasks-list-date-svg" 
                                                                viewBox="0 0 24 24"
                                                            >   
                                                                <g 
                                                                    fill="none" 
                                                                    stroke="currentColor" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round" 
                                                                    strokeWidth={2}
                                                                >
                                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                                                                    <path d="M12 7v5l3 3"></path>
                                                                </g>
                                                            </svg>

                                                            <p>{getTimeAgo(task.createdAt)}</p>
                                                        </div>
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
