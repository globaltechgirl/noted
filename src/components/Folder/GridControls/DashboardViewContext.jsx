import React, { createContext, useContext, useState, useEffect } from "react";

const DashboardViewContext = createContext();

export const DashboardViewProvider = ({ children }) => {
    const [dashboardView, setDashboardView] = useState(() => {
        return localStorage.getItem("dashboardView") || "Layout";
    });

    useEffect(() => {
        localStorage.setItem("dashboardView", dashboardView);
    }, [dashboardView]);

    return (
        <DashboardViewContext.Provider value={{ dashboardView, setDashboardView }}>
            {children}
        </DashboardViewContext.Provider>
    );
};

export const useDashboardView = () => useContext(DashboardViewContext);
