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
        {
            id: 4,
            title: "User Onboarding Flow Improvements",
            subtitle: "UI/UX Optimization",
            priority: "High",
            status: "todo",
            category: "General",
            createdAt: "2025-07-07T10:00:00Z",
            subtasks: [
                { id: 1, text: "Redesign welcome screens", done: false },
                { id: 2, text: "Add tooltips for new users", done: false },
                { id: 3, text: "Create quick-start guide", done: false },
            ],
        },
        {
            id: 5,
            title: "Payment Gateway Integration",
            subtitle: "Stripe and PayPal setup",
            priority: "Low",
            status: "todo",
            category: "General",
            createdAt: "2025-07-07T10:00:00Z",
            subtasks: [
                { id: 1, text: "Configure Stripe keys", done: false },
                { id: 2, text: "Test sandbox payments", done: false },
                { id: 3, text: "Setup PayPal webhook", done: false },
            ],
        },
    ];
    
    

    // States
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [priority, setPriority] = useState("low");
    const [taskSource, setTaskSource] = useState("todo");
    const [editingTaskId, setEditingTaskId] = useState(null);
const selectedTask = tasks.find((t) => selectedTaskIds.includes(t.id));



    const [categories, setCategories] = useState(["Work", "Personal", "Daily"]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(false);
    const initialCategory = tasks.find((t) => t.category !== "General")?.category || "All";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const [showTodoPopup, setShowTodoPopup] = useState(false);
    const [showCategoryTaskPopup, setShowCategoryTaskPopup] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showTodoDropdown, setShowTodoDropdown] = useState(false);
    const [showInProgressDropdown, setShowInProgressDropdown] = useState(false);
    const [showCompletedDropdown, setShowCompletedDropdown] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);

    const [editingTaskTitle, setEditingTaskTitle] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editingTaskSubtitle, setEditingTaskSubtitle] = useState(false);
    const [newTaskSubtitle, setNewTaskSubtitle] = useState("");
    const [taskInputs, setTaskInputs] = useState([""]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [taskStep, setTaskStep] = useState(0);

 
    const [categoryFilter, setCategoryFilter] = useState({ priority: "", status: "" });
    const [selectedTimeFilter, setSelectedTimeFilter] = useState("Today");

    const [highlightInput, setHighlightInput] = useState(false);




    // Refs
    const timeDropdownRef = useRef(null);
    const menuDropdownRef = useRef(null);
    const touchStartXRef = useRef(0);
    const touchEndXRef = useRef(0);
    const todoDropdownRef = useRef(null);
    const inProgressDropdownRef = useRef(null);
    const completedDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Utility Functions
const updateTask = () => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: newTaskTitle,
            subtitle: newTaskSubtitle,
            priority: capitalize(priority),
            subtasks: taskInputs.map((text, idx) => ({
              id: idx + 1,
              text,
              done: false,
            })),
            // 🔒 KEEP ORIGINAL CATEGORY (don't override with selectedCategory)
            category: task.category,
          }
        : task
    )
  );
};




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

  if (diffInSeconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days <= 7) return `${days}d`;

  return created.toLocaleDateString("en-US", {
    month: "short", 
    day: "numeric",
  });
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




    // Derived Data


const generalTodoTasks = tasks.filter(task =>
  task.status === "todo" &&
  task.category === "General" &&
  isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
  !task.archived && !task.deleted &&
  (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
  (!categoryFilter.status || task.status === categoryFilter.status)
);

const generalInProgressTasks = tasks.filter(task =>
  task.status === "inprogress" &&
  task.category === "General" &&
  isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
  !task.archived && !task.deleted &&
  (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
  (!categoryFilter.status || task.status === categoryFilter.status)
);

const generalCompletedTasks = tasks.filter(task =>
  task.status === "completed" &&
  task.category === "General" &&
  isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
  !task.archived && !task.deleted &&
  (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
  (!categoryFilter.status || task.status === categoryFilter.status)
);


const filteredCategoryTasks = tasks.filter((task) => {
  const isMatchingCategory =
    selectedCategory === "All" ||
    selectedCategory === "General"
      ? task.category === "General"
      : task.category === selectedCategory;

  return (
    !task.archived &&
    !task.deleted &&
    isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
    isMatchingCategory &&
    (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
    (!categoryFilter.status || task.status === categoryFilter.status)
  );
});


    // Task Actions
const toggleCheck = (taskId, subtaskId) => {
  setTasks((prev) =>
    prev.map((task) => {
      if (task.id !== taskId) return task;

      const updatedSubtasks = task.subtasks.map((sub) =>
        sub.id === subtaskId ? { ...sub, done: !sub.done } : sub
      );

      // Only change status if it's an active task
      if (["archived", "deleted"].includes(task.status)) {
        return {
          ...task,
          subtasks: updatedSubtasks
        };
      }

      const progress = getProgress(updatedSubtasks);
      const newStatus =
        progress === 100 ? "completed" : progress >= 50 ? "inprogress" : "todo";

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

const archiveTasks = (status, category) => {
  setTasks(prev =>
    prev.map(task =>
      selectedTaskIds.includes(task.id) &&
      task.status === status &&
      task.category === category
        ? { ...task, status: "archived", previousStatus: task.status }
        : task
    )
  );
  setSelectedTaskIds([]); 
};

const deleteTasks = (status, category) => {
  setTasks(prev =>
    prev.map(task =>
      selectedTaskIds.includes(task.id) &&
      task.status === status &&
      task.category === category
        ? { ...task, status: "deleted", previousStatus: task.status }
        : task
    )
  );
  setSelectedTaskIds([]);
};


const archiveCategoryTasks = (category) => {
  setTasks(prev =>
    prev.map(task =>
      task.category === category
        ? { ...task, status: "archived", previousStatus: task.status }
        : task
    )
  );
  setSelectedTaskIds([]); 
};


const deleteCategoryTasks = (category) => {
  setTasks(prev =>
    prev.map(task =>
      task.category === category
        ? { ...task, status: "deleted", previousStatus: task.status }
        : task
    )
  );
  setSelectedTaskIds([]); 
};





const deletedTodoTasks = tasks.filter(task =>
  task.status === "deleted" && task.previousStatus === "todo"
);

const deletedInProgressTasks = tasks.filter(task =>
  task.status === "deleted" && task.previousStatus === "inprogress"
);

const deletedCompletedTasks = tasks.filter(task =>
  task.status === "deleted" && task.previousStatus === "completed"
);

const deletedfilteredCategoryTasks = tasks.filter((task) => {
  if (task.status !== "deleted" || task.category === "General") return false;
  if (selectedCategory !== "All" && task.category !== selectedCategory) return false;

  if (categoryFilter.priority && task.priority !== categoryFilter.priority) return false;
  if (categoryFilter.status && task.previousStatus !== categoryFilter.status) return false;
  if (!isWithinTimeFilter(task.createdAt, selectedTimeFilter)) return false;

  return true;
});



const archivedTodoTasks = tasks.filter(task =>
  task.status === "archived" && task.previousStatus === "todo"
);

const archivedInProgressTasks = tasks.filter(task =>
  task.status === "archived" && task.previousStatus === "inprogress"
);

const archivedCompletedTasks = tasks.filter(task =>
  task.status === "archived" && task.previousStatus === "completed"
);

const archivedfilteredCategoryTasks = tasks.filter((task) =>
  task.status === "archived" &&
  task.category !== "General" &&
  (selectedCategory === "All" || task.category === selectedCategory) &&
  isWithinTimeFilter(task.createdAt, selectedTimeFilter) &&
  (!categoryFilter.priority || task.priority === categoryFilter.priority) &&
  (!categoryFilter.status || task.previousStatus === categoryFilter.status)
);



const [selectedView, setSelectedView] = useState("active");
  const isMenuDisabled = selectedView === "archived" || selectedView === "deleted";

  const isEditable =
  selectedView === "active" &&
  selectedTask &&
  selectedTask.status === "todo";



const getTodoTasksByView = () => {
  if (selectedView === "deleted") return deletedTodoTasks;
  if (selectedView === "archived") return archivedTodoTasks;
  if (selectedView === "active") return generalTodoTasks;
  return [];
};



const getInProgressTasksByView = () => {
  if (selectedView === "deleted") return deletedInProgressTasks;
  if (selectedView === "archived") return archivedInProgressTasks;
  if (selectedView === "active") return generalInProgressTasks;
  return [];
};

const getCompletedTasksByView = () => {
  if (selectedView === "deleted") return deletedCompletedTasks;
  if (selectedView === "archived") return archivedCompletedTasks;
  if (selectedView === "active") return generalCompletedTasks;
  return [];
};



const getfilteredCategoryTasksByView = () => {
  if (selectedView === "deleted") return deletedfilteredCategoryTasks;
  if (selectedView === "archived") return archivedfilteredCategoryTasks;
  if (selectedView === "active") return filteredCategoryTasks;
  return [];
};


const STATUS_LABELS = {
  todo: "To Do",
  inprogress: "In Progress",
  completed: "Completed",
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
        setEditingTaskId(null);
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
            if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) setShowTimeDropdown(false);
            if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) setShowMenuDropdown(false);
            if (todoDropdownRef.current && !todoDropdownRef.current.contains(event.target)) setShowTodoDropdown(false);
            if (inProgressDropdownRef.current && !inProgressDropdownRef.current.contains(event.target)) setShowInProgressDropdown(false);
            if (completedDropdownRef.current && !completedDropdownRef.current.contains(event.target)) setShowCompletedDropdown(false);
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) setShowCategoryMenu(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderTaskCard = (task) => {
  const progress = getProgress(task.subtasks);
  return (
    <div 
      key={task.id} 
      className={`tasks-body-list ${selectedTaskIds.includes(task.id) ? "selected" : ""}`}
    >
      <div className="tasks-list-top">
      <div className="tasks-list-toggle-wrapper">
    <div className="tasks-list-toggle">
      <p>{task.priority}</p>
    </div>

    {task.category !== "General" && (
      <div className="tasks-list-toggle">
<p className="task-status">
  {STATUS_LABELS[task.status] || capitalize(task.status)}
</p>


      </div>
    )}
  </div>

        <div 
          className="select-task-check"
          onClick={(e) => {
            e.stopPropagation(); 
            toggleTaskSelection(task.id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`check-task-icon ${selectedTaskIds.includes(task.id) ? "selected" : ""}`} viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12l5 5L20 7" />
          </svg>
        </div>
      </div>

      <div className="tasks-list-middle">
        <div className="tasks-list-header"><p>{task.title}</p></div>
        <div className="tasks-list-text"><p>{task.subtitle}</p></div>
        <div className="tasks-list-checks">
          <ul>
            {task.subtasks.map(sub => (
              <li key={sub.id} onClick={() => toggleCheck(task.id, sub.id)} className={sub.done ? "subtask-done" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`tasks-list-checks-svg ${sub.done ? "subtask-done" : ""}`} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12l5 5L20 7" />
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
              <svg xmlns="http://www.w3.org/2000/svg" className="tasks-list-date-svg" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                  <path d="M12 7v5l3 3"></path>
                </g>
              </svg>
              <p>{getTimeAgo(task.createdAt)}</p>
            </div>
          </div>
          <div className="tasks-progress-bar">
            <div className="tasks-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};




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
                            <div 
                                className="tasks-time-container" 
                                ref={timeDropdownRef} 
                                style={{ position: "relative" }}
                            >
                                <div 
                                    className="tasks-toggle" 
                                    onClick={() => {
                                        setShowTimeDropdown(prev => !prev);
                                        setShowMenuDropdown(false);
                                        setShowTodoDropdown(false);
                                        setShowInProgressDropdown(false);
                                        setShowCompletedDropdown(false);
                                        setShowCategoryMenu(false);
                                    }}
                                >
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
                                    <div className="tasks-dropdown-options tasks-dropdown-time">
                                        {getAvailableTimeFilters().map(filter => (
                                            <div
                                                key={filter}
                                                className={`tasks-dropdown-item ${selectedTimeFilter === filter ? "active" : ""}`}
                                                onClick={() => {
                                                    console.log("Clicked filter:", filter);
                                                    setSelectedTimeFilter(filter); 
                                                    setShowTimeDropdown(false);
                                                }}
                                            >
                                                {filter}
                                            </div>
                                        ))}
                                    </div>
                                )}
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

                            <div 
                                className="tasks-menu"
                                onClick={() => {
                                    setShowMenuDropdown(prev => !prev);
                                    setShowTimeDropdown(false);
                                    setShowTodoDropdown(false);
                                    setShowInProgressDropdown(false);
                                    setShowCompletedDropdown(false);
                                    setShowCategoryMenu(false);
                                }}
                                ref={menuDropdownRef}
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

                                {showMenuDropdown && (
                                    <div className="tasks-dropdown-options tasks-dropdown-menu">
                                        <div
                                            className="tasks-dropdown-item"
                                            onClick={() => {
                                                setSelectedView("active"); 
                                                setShowMenuDropdown(false);
                                            }}
                                        >
                                            Active Tasks
                                        </div>

                                        <div
                                            className="tasks-dropdown-item"
                                            onClick={() => {
                                                setSelectedView("archived");
                                                setShowMenuDropdown(false);
                                            }}
                                        >
                                            Archived Tasks
                                        </div>

                                        <div
                                            className="tasks-dropdown-item"
                                            onClick={() => {
                                                setSelectedView("deleted");
                                                setShowMenuDropdown(false);
                                            }}
                                        >
                                            Deleted Tasks
                                        </div>

                                        <div
                                            className="tasks-dropdown-item"
                                            onClick={() => {
                                                setShowCategoryPopup(true);
                                                setShowMenuDropdown(false);
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
                                            <div className="tasks-popup-middle">
                                                <div className="tasks-popup-middle-wrapper">
                                                    <div className="popup-middle-slider">
                                                        <div className="middle-slider-page">
                                                            <div className="tasks-popup-text category-popup-text">
                                                                <div className="popup-text-header">
                                                                    <p>Task Category</p>

                                                                    <div className="popup-text-header-icons">
                                                                        <svg 
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="popup-text-header-svg" 
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
                                                                </div>

                                                                <div className="popup-text-contents-wrapper">
                                                                    <div className={`popup-text-contents ${highlightInput ? "highlight-content-blink" : ""}`}>
                                                                        {editingCategory ? (
                                                                            <textarea
                                                                                value={newCategoryName}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;

                                                                                    if (value.length > 50) {
                                                                                        setHighlightInput(false);
                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                        return;
                                                                                    }
                                                                                    setNewCategoryName(value);
                                                                                }}
                                                                                onBlur={() => setEditingCategory(false)}
                                                                                onKeyDown={(e) => {
                                                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                                                        e.preventDefault();
                                                                                        setEditingCategory(false);
                                                                                    }

                                                                                    if (newCategoryName.length >= 50) {
                                                                                        setHighlightInput(false);
                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                    }
                                                                                }}
                                                                                className="popup-text-input"
                                                                                autoFocus
                                                                                maxLength={50} 
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
                                                                            <p>{newCategoryName.length} / 50</p>
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
                        </div>
                    </div>

                    <div className="tasks-main">
                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">To Do</p>

<p className="tasks-header-text">
  {selectedView === "deleted"
    ? deletedTodoTasks.length
    : selectedView === "archived"
    ? archivedTodoTasks.length
    : selectedView === "active"
    ? generalTodoTasks.length
    : 0}
</p>


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

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-next"
                                                                                    onClick={() => {
                                                                                        if (taskStep < 2) setTaskStep((prev) => prev + 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18m4 9l-4-4m4 4H8m4 4l4-4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className={`popup-text-contents ${highlightInput ? "highlight-content-blink" : ""}`}>
                                                                            {editingTaskTitle ? (
                                                                                <textarea
                                                                                    value={newTaskTitle}
                                                                                    onChange={(e) => {
                                                                                        const value = e.target.value;

                                                                                        if (value.length > 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                            return;
                                                                                        }

                                                                                        setNewTaskTitle(value);
                                                                                    }}
                                                                                    onBlur={() => setEditingTaskTitle(false)}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                                                            e.preventDefault();
                                                                                            setEditingTaskTitle(false);
                                                                                        }

                                                                                        if (newTaskTitle.length >= 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                    maxLength={100} 
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
                                                                                <p>{newTaskTitle.length} / 100</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-subtitle">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task Subtitle</p>

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-prev"
                                                                                    onClick={() => {
                                                                                        if (taskStep > 0) setTaskStep((prev) => prev - 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-4-9l4 4m-4-4h8m-4-4l-4 4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>

                                                                                <div 
                                                                                    className="popup-text-header-next"
                                                                                    onClick={() => {
                                                                                        if (taskStep < 2) setTaskStep((prev) => prev + 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18m4 9l-4-4m4 4H8m4 4l4-4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className={`popup-text-contents ${highlightInput ? "highlight-content-blink" : ""}`}>
                                                                            {editingTaskSubtitle ? (
                                                                                <textarea
                                                                                    value={newTaskSubtitle}
                                                                                    onChange={(e) => {
                                                                                        const value = e.target.value;

                                                                                        if (value.length > 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                            return;
                                                                                        }

                                                                                        setNewTaskSubtitle(value);
                                                                                    }}
                                                                                    onBlur={() => setEditingTaskSubtitle(false)}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                                                            e.preventDefault();
                                                                                            setEditingTaskSubtitle(false);
                                                                                        }

                                                                                        if (newTaskSubtitle.length >= 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                    maxLength={100} 
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
                                                                                <p>{newTaskSubtitle.length} / 100</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-list">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task List</p>

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-prev"
                                                                                    onClick={() => {
                                                                                        if (taskStep > 0) setTaskStep((prev) => prev - 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-4-9l4 4m-4-4h8m-4-4l-4 4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="popup-text-contents-wrapper">
                                                                            {taskInputs.map((task, index) => (
                                                                                <div 
                                                                                    key={index} 
                                                                                    className={`popup-text-contents popup-text-list ${highlightInput ? "highlight-content-blink" : ""}`}
                                                                                >
                                                                                    <div className="popup-text-item">
                                                                                        {editingIndex === index ? (
                                                                                            <textarea
                                                                                                ref={inputRef}
                                                                                                value={task}
                                                                                                onChange={(e) => {
                                                                                                    const value = e.target.value;

                                                                                                    if (value.length > 100) {
                                                                                                        setHighlightInput(false);
                                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                                        return;
                                                                                                    }   

                                                                                                    if (inputRef.current) {
                                                                                                        inputRef.current.style.height = "auto"; 
                                                                                                        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                                                                                                    }

                                                                                                    const updated = [...taskInputs];
                                                                                                    updated[index] = value;
                                                                                                    setTaskInputs(updated);
                                                                                                }}
                                                                                                onBlur={() => setEditingIndex(false)}
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                                                                        e.preventDefault();
                                                                                                        setEditingIndex(false);
                                                                                                    }

                                                                                                    if (task.length >= 100) {
                                                                                                        setHighlightInput(false);
                                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                                    }
                                                                                                }}
                                                                                                className="popup-text-input"
                                                                                                autoFocus
                                                                                                maxLength={100} 
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

                                                                            <div className="popup-text-contents popup-text-list-wrapper">
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
                                                                    if (editingTaskId) {
                                                                        updateTask();
                                                                    } else {
                                                                        addNewTodoTask();
                                                                    }

                                                                    setShowTodoPopup(false);
                                                                    setEditingTaskId(null);
                                                                    setTaskStep(0);
                                                                }}
                                                            >
                                                                <p>{editingTaskId ? "Update Task" : "Add Task"}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div 
                                        className={`todo-menu tasks-menu ${isMenuDisabled ? "menu-disabled" : ""}`}
                                        onClick={() => {
                                            if (isMenuDisabled) return;
                                            setShowTodoDropdown(prev => !prev);
                                            setShowTimeDropdown(false);
                                            setShowMenuDropdown(false);
                                            setShowInProgressDropdown(false);
                                            setShowCompletedDropdown(false);
                                            setShowCategoryMenu(false);
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
                                                <div
                                                    className="tasks-dropdown-item"
                                                    onClick={() => {
                                                        const taskToEdit = tasks.find((t) => selectedTaskIds.includes(t.id));
                                                        if (!taskToEdit) return;

                                                        setNewTaskTitle(taskToEdit.title);
                                                        setNewTaskSubtitle(taskToEdit.subtitle);
                                                        setTaskInputs(taskToEdit.subtasks.map((sub) => sub.text));
                                                        setPriority(taskToEdit.priority.toLowerCase());
                                                        setEditingTaskId(taskToEdit.id);
                                                        setTaskStep(0);
                                                        setShowTodoPopup(true);
                                                    }}
                                                >
                                                    Edit Task
                                                </div>

                                                <div className="tasks-dropdown-item" onClick={() => deleteTasks("todo", "General")}>Delete Task</div>

                                                <div className="tasks-dropdown-item" onClick={() => archiveTasks("todo", "General")}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

<div className="tasks-todo">
  {getTodoTasksByView().length > 0 ? (
    getTodoTasksByView().map((task) => renderTaskCard(task))
  ) : (
    <p className="no-tasks-message">
      {selectedView === "deleted"
        ? "No deleted todo tasks"
        : selectedView === "archived"
        ? "No archived todo tasks"
        : selectedView === "active"
        ? "No todo tasks"
        : "No tasks found"}
    </p>
  )}
</div>







                        </div>

                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">In Progress</p>
                                  <p className="tasks-header-text">
  {selectedView === "deleted"
    ? deletedInProgressTasks.length
    : selectedView === "archived"
    ? archivedInProgressTasks.length
    : selectedView === "active"
    ? generalInProgressTasks.length
    : 0}
</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div 
                                        className={`inprogress-menu tasks-menu ${isMenuDisabled ? "menu-disabled" : ""}`}
                                        onClick={() => {
                                            if (isMenuDisabled) return;
                                            setShowInProgressDropdown(prev => !prev);
                                            setShowTimeDropdown(false);
                                            setShowMenuDropdown(false);
                                            setShowTodoDropdown(false);                       
                                            setShowCompletedDropdown(false);
                                            setShowCategoryMenu(false);
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
                                                
                                                <div className="tasks-dropdown-item" onClick={() => deleteTasks("inprogress", "General")}>Delete Task</div>

                                                <div className="tasks-dropdown-item" onClick={() => archiveTasks("inprogress", "General")}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

<div className="tasks-todo">
  {getInProgressTasksByView().length > 0 ? (
    getInProgressTasksByView().map((task) => renderTaskCard(task))
  ) : (
    <p className="no-tasks-message">
      {selectedView === "deleted"
        ? "No deleted todo tasks"
        : selectedView === "archived"
        ? "No archived todo tasks"
        : selectedView === "active"
        ? "No todo tasks"
        : "No tasks found"}
    </p>
  )}
</div>




                        </div>

                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">Completed</p>
                                  <p className="tasks-header-text">
  {selectedView === "deleted"
    ? deletedCompletedTasks.length
    : selectedView === "archived"
    ? archivedCompletedTasks.length
    : selectedView === "active"
    ? generalCompletedTasks.length
    : 0}
</p>
                                </div>

                                <div className="tasks-header-right">
                                    <div 
                                        className={`completed-menu tasks-menu ${isMenuDisabled ? "menu-disabled" : ""}`}
                                        onClick={() => {
                                            if (isMenuDisabled) return;
                                            setShowCompletedDropdown(prev => !prev);
                                            setShowTimeDropdown(false);
                                            setShowMenuDropdown(false);
                                            setShowTodoDropdown(false);
                                            setShowInProgressDropdown(false);
                                            setShowCategoryMenu(false);
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
                                                <div className="tasks-dropdown-item" onClick={() => archiveTasks("completed", "General")}>Archive Task</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

<div className="tasks-todo">
  {getCompletedTasksByView().length > 0 ? (
    getCompletedTasksByView().map((task) => renderTaskCard(task))
  ) : (
    <p className="no-tasks-message">
      {selectedView === "deleted"
        ? "No deleted todo tasks"
        : selectedView === "archived"
        ? "No archived todo tasks"
        : selectedView === "active"
        ? "No todo tasks"
        : "No tasks found"}
    </p>
  )}
</div>





                        </div>                

                        <div className="tasks-section">
                            <div className="tasks-main-header">
                                <div className="tasks-header-left">
                                    <p className="tasks-header-name">{selectedCategory}</p>
                                 <p className="tasks-header-text">
  {selectedView === "deleted"
    ? deletedfilteredCategoryTasks.length
    : selectedView === "archived"
    ? archivedfilteredCategoryTasks.length
    : selectedView === "active"
    ? filteredCategoryTasks.length
    : 0}
</p>
                                </div>
                            
                                <div className="tasks-header-right">
                                    <div style={{ position: "relative" }}>
                                        <div
                                            className="todo-plus tasks-plus" 
                                            onClick={() => {
                                                setShowCategoryTaskPopup(true);
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

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-next"
                                                                                     onClick={() => {
                                                                                        if (taskStep < 2) setTaskStep((prev) => prev + 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18m4 9l-4-4m4 4H8m4 4l4-4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className={`popup-text-contents ${highlightInput ? "highlight-content-blink" : ""}`}>
                                                                            {editingTaskTitle ? (
                                                                                <textarea
                                                                                    value={newTaskTitle}
                                                                                    onChange={(e) => {
                                                                                        const value = e.target.value;

                                                                                        if (value.length > 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                            return;
                                                                                        }

                                                                                        setNewTaskTitle(value);
                                                                                    }}
                                                                                    onBlur={() => setEditingTaskTitle(false)}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                                                            e.preventDefault();
                                                                                            setEditingTaskTitle(false);
                                                                                        }

                                                                                        if (newTaskTitle.length >= 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                    maxLength={100} 
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
                                                                                <p>{newTaskTitle.length} / 100</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-subtitle">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task Subtitle</p>

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-prev"
                                                                                    onClick={() => {
                                                                                        if (taskStep > 0) setTaskStep((prev) => prev - 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-4-9l4 4m-4-4h8m-4-4l-4 4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>

                                                                                <div 
                                                                                    className="popup-text-header-next"
                                                                                     onClick={() => {
                                                                                        if (taskStep < 2) setTaskStep((prev) => prev + 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18m4 9l-4-4m4 4H8m4 4l4-4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className={`popup-text-contents ${highlightInput ? "highlight-content-blink" : ""}`}>
                                                                            {editingTaskSubtitle ? (
                                                                                <textarea
                                                                                    value={newTaskSubtitle}
                                                                                    onChange={(e) => {
                                                                                        const value = e.target.value;

                                                                                        if (value.length > 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                            return;
                                                                                        }

                                                                                        setNewTaskSubtitle(value);
                                                                                    }}
                                                                                    onBlur={() => setEditingTaskSubtitle(false)}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                                                            e.preventDefault();
                                                                                            setEditingTaskSubtitle(false);
                                                                                        }

                                                                                        if (newTaskSubtitle.length >= 100) {
                                                                                            setHighlightInput(false);
                                                                                            requestAnimationFrame(() => setHighlightInput(true));
                                                                                            setTimeout(() => setHighlightInput(false), 600);
                                                                                        }
                                                                                    }}
                                                                                    className="popup-text-input"
                                                                                    autoFocus
                                                                                    maxLength={100} 
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
                                                                                <p>{newTaskSubtitle.length} / 100</p>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>

                                                                <div className="middle-slider-page middle-slider-list">
                                                                    <div className="tasks-popup-text">
                                                                        <div className="popup-text-header">
                                                                            <p>Task List</p>

                                                                            <div className="popup-text-header-icons">
                                                                                <div 
                                                                                    className="popup-text-header-prev"
                                                                                    onClick={() => {
                                                                                        if (taskStep > 0) setTaskStep((prev) => prev - 1);
                                                                                    }}
                                                                                >
                                                                                    <svg 
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="popup-text-header-svg" 
                                                                                        viewBox="0 0 24 24"
                                                                                    >   
                                                                                        <path 
                                                                                            fill="none" 
                                                                                            stroke="currentColor" 
                                                                                            strokeLinecap="round" 
                                                                                            strokeLinejoin="round" 
                                                                                            strokeWidth={2} 
                                                                                            d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-4-9l4 4m-4-4h8m-4-4l-4 4"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="popup-text-contents-wrapper">
                                                                            {taskInputs.map((task, index) => (
                                                                                <div 
                                                                                    key={index} 
                                                                                    className={`popup-text-contents popup-text-list ${highlightInput ? "highlight-content-blink" : ""}`}
                                                                                >
                                                                                    <div className="popup-text-item">
                                                                                        {editingIndex === index ? (
                                                                                            <textarea
                                                                                                ref={inputRef}
                                                                                                value={task}
                                                                                                onChange={(e) => {
                                                                                                    const value = e.target.value;

                                                                                                    if (value.length > 100) {
                                                                                                        setHighlightInput(false);
                                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                                        return;
                                                                                                    }
                                                                                                    if (inputRef.current) {
                                                                                                        inputRef.current.style.height = "auto"; 
                                                                                                        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                                                                                                    }
                                                                                                    const updated = [...taskInputs];
                                                                                                    updated[index] = value;
                                                                                                    setTaskInputs(updated);
                                                                                                }}
                                                                                                onBlur={() => setEditingIndex(false)}
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                                                                        e.preventDefault();
                                                                                                        setEditingIndex(false);
                                                                                                    }

                                                                                                    if (task.length >= 100) {
                                                                                                        setHighlightInput(false);
                                                                                                        requestAnimationFrame(() => setHighlightInput(true));
                                                                                                        setTimeout(() => setHighlightInput(false), 600);
                                                                                                    }
                                                                                                }}
                                                                                                className="popup-text-input"
                                                                                                autoFocus
                                                                                                maxLength={100} 
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

                                                                            <div className="popup-text-contents popup-text-list-wrapper">
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
                                                                    if (editingTaskId) {
                                                                        updateTask();
                                                                    } else {
                                                                        addNewCategoryTask();
                                                                    }

                                                                    setShowCategoryTaskPopup(false);
                                                                    setEditingTaskId(null);
                                                                    setTaskStep(0);
                                                                }}
                                                            >
                                                                <p>{editingTaskId ? "Update Task" : "Add Task"}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div
                                        className={`category-menu tasks-menu`}
                                        onClick={() => {
                                            setShowCategoryMenu(prev => !prev);
                                            setShowTimeDropdown(false);
                                            setShowMenuDropdown(false);
                                            setShowTodoDropdown(false);
                                            setShowInProgressDropdown(false);
                                            setShowCompletedDropdown(false);
                                        }}
                                        ref={categoryDropdownRef}
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
{selectedView === "active" && (
  <>
<div
  className={`tasks-dropdown-item ${isEditable ? "" : "disabled-task-option"}`}
  onClick={() => {
    if (!isEditable) return;

    const taskToEdit = selectedTask; 
    if (!taskToEdit) return;

    setNewTaskTitle(taskToEdit.title);
    setNewTaskSubtitle(taskToEdit.subtitle);
    setTaskInputs(taskToEdit.subtasks.map((sub) => sub.text));
    setPriority(taskToEdit.priority.toLowerCase());
    setEditingTaskId(taskToEdit.id);
    setTaskStep(0);
    setShowCategoryTaskPopup(true);
  }}
  style={{ opacity: isEditable ? 1 : 0.5, pointerEvents: isEditable ? "auto" : "none" }}
>
  Edit Task
</div>


  <div className="tasks-dropdown-item" onClick={() => deleteCategoryTasks(selectedCategory)}>
  Delete Tasks
</div>

<div className="tasks-dropdown-item" onClick={() => archiveCategoryTasks(selectedCategory)}>
  Archive Tasks
</div>

  </>
)}
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
                                                            className="tasks-dropdown-item-icon"
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
  {getfilteredCategoryTasksByView().length > 0 ? (
    getfilteredCategoryTasksByView().map((task) => renderTaskCard(task))
  ) : (
    <p className="no-tasks-message">
      {selectedView === "deleted"
        ? "No deleted tasks in this category"
        : selectedView === "archived"
        ? "No archived tasks in this category"
        : selectedView === "active"
        ? "No tasks in this category"
        : "No tasks found"}
    </p>
  )}
</div>






                        </div>                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
