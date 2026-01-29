// --- MAINTENANCE MODE CONFIGURATION ---
// SET THIS TO 'true' TO LOCK THE SITE
// SET THIS TO 'false' TO UNLOCK THE SITE
const maintenanceMode = false; 

// THE LOGIC (DO NOT TOUCH)
(function() {
    // Get current page name
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // If mode is ON and we are NOT already on the maintenance page
    if (maintenanceMode && page !== "maintenance.html") {
        window.location.href = "maintenance.html";
    }
    
    // Optional: If mode is OFF but user tries to go to maintenance.html manually, send them home
    if (!maintenanceMode && page === "maintenance.html") {
        window.location.href = "index.html";
    }
})();