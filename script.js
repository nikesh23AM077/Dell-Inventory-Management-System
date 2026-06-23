// Initial Inventory Data
let inventory = [
    "Dell XPS 13",
    "Dell XPS 15",
    "Dell Inspiron 15",
    "Dell Latitude 5440",
    "Dell Precision 3580",
    "Dell Alienware M18",
    "Dell Vostro 3520"
];

// Helper variables for deletion tracking
let productIndexToDelete = null;

// Initialize the Application
document.addEventListener("DOMContentLoaded", () => {
    // Render initial view
    displayInventory();
    updateStatistics();

    // Event Listeners for Forms
    const addForm = document.getElementById("add-product-form");
    if (addForm) {
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addProduct();
        });
    }

    const checkForm = document.getElementById("check-availability-form");
    if (checkForm) {
        checkForm.addEventListener("submit", (e) => {
            e.preventDefault();
            checkAvailability();
        });
    }

    // Modal Confirmation Button Listeners
    const confirmDeleteBtn = document.getElementById("modal-confirm-delete");
    const cancelDeleteBtn = document.getElementById("modal-cancel-delete");
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", () => {
            if (productIndexToDelete !== null) {
                executeRemoval(productIndexToDelete);
            }
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener("click", closeModal);
    }

    // Click outside modal overlay to close
    const modalOverlay = document.getElementById("delete-modal-overlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
});

/**
 * Maps a product name to a category, badge class, and image path.
 * Helper function for UI rendering.
 */
function getProductDetails(name) {
    const uppercaseName = name.toUpperCase();
    
    let category = "Laptop";
    let badgeClass = "badge-generic";
    let imagePath = "assets/generic.png";

    if (uppercaseName.includes("XPS")) {
        category = "XPS";
        badgeClass = "badge-xps";
        imagePath = "assets/xps.png";
    } else if (uppercaseName.includes("ALIENWARE") || uppercaseName.includes("G15") || uppercaseName.includes("G16")) {
        category = "Alienware";
        badgeClass = "badge-alienware";
        imagePath = "assets/alienware.png";
    } else if (uppercaseName.includes("LATITUDE")) {
        category = "Latitude";
        badgeClass = "badge-latitude";
        imagePath = "assets/latitude.png";
    } else if (uppercaseName.includes("INSPIRON")) {
        category = "Inspiron";
        badgeClass = "badge-inspiron";
        imagePath = "assets/generic.png";
    } else if (uppercaseName.includes("PRECISION")) {
        category = "Precision";
        badgeClass = "badge-precision";
        imagePath = "assets/generic.png";
    } else if (uppercaseName.includes("VOSTRO")) {
        category = "Vostro";
        badgeClass = "badge-vostro";
        imagePath = "assets/generic.png";
    }

    return { category, badgeClass, imagePath };
}

/**
 * Display Inventory Section
 * Renders all products from the inventory array into cards.
 */
function displayInventory() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    // Clear existing contents
    productsGrid.innerHTML = "";

    // Show empty state if inventory is empty
    if (inventory.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                <h3>No Products Found</h3>
                <p>The inventory is empty. Add a new Dell product to get started.</p>
            </div>
        `;
        return;
    }

    // Populate products
    inventory.forEach((productName, index) => {
        const details = getProductDetails(productName);
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${index * 0.05}s`;
        card.setAttribute("data-product-name", productName.toLowerCase().trim());
        card.id = `product-card-${index}`;

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${details.imagePath}" alt="${productName}" class="product-image" onerror="this.src='assets/generic.png'">
                <div class="product-image-overlay"></div>
                <span class="product-badge ${details.badgeClass}">${details.category}</span>
            </div>
            <div class="product-details">
                <h3 class="product-name" title="${productName}">${productName}</h3>
                <div class="product-card-footer">
                    <span class="stock-status">
                        <span class="stock-status-dot"></span>
                        In Stock
                    </span>
                    <button class="btn-remove" onclick="removeProduct(${index})" title="Remove Product">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

/**
 * Add New Product
 * Handles validation, adds the product to the inventory list,
 * updates display and triggers notifications.
 */
function addProduct() {
    const inputField = document.getElementById("product-name-input");
    if (!inputField) return;

    const rawName = inputField.value;
    const trimmedName = rawName.trim();

    // 1. Validation: Empty input not allowed
    if (trimmedName === "") {
        showMessage("Empty input not allowed. Please enter a product name.", "error");
        return;
    }

    // 2. Validation: Duplicate check (case-insensitive)
    const exists = inventory.some(item => item.trim().toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
        showMessage(`Duplicate products not allowed. "${trimmedName}" is already in the inventory.`, "error");
        return;
    }

    // Add to state
    inventory.push(trimmedName);

    // Refresh UI & Stats
    displayInventory();
    updateStatistics();

    // Show confirmation notification
    showMessage(`"${trimmedName}" has been successfully added to inventory.`, "success");

    // Clear input field and set focus back
    inputField.value = "";
    inputField.focus();
}

/**
 * Initiate Remove Product
 * Prepares product for deletion and shows the custom confirmation modal.
 * 
 * @param {number} index Index of the item in the array.
 */
function removeProduct(index) {
    if (index < 0 || index >= inventory.length) return;

    productIndexToDelete = index;
    const productName = inventory[index];
    
    // Set text in the custom modal body
    const modalSpan = document.getElementById("modal-product-name");
    if (modalSpan) {
        modalSpan.textContent = productName;
    }

    // Show custom modal overlay
    const modalOverlay = document.getElementById("delete-modal-overlay");
    if (modalOverlay) {
        modalOverlay.classList.add("active");
    }
}

/**
 * Performs actual removal of product from inventory array.
 * Clears modal and updates stats + UI.
 * 
 * @param {number} index Index to remove.
 */
function executeRemoval(index) {
    if (index === null || index < 0 || index >= inventory.length) return;

    const removedName = inventory[index];
    
    // Remove from array
    inventory.splice(index, 1);

    // Reset index tracker & close modal
    productIndexToDelete = null;
    closeModal();

    // Refresh UI & Stats
    displayInventory();
    updateStatistics();

    // Show success notification toast
    showMessage(`"${removedName}" has been removed from inventory.`, "success");
}

/**
 * Closes the custom delete confirmation modal
 */
function closeModal() {
    const modalOverlay = document.getElementById("delete-modal-overlay");
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
    }
    productIndexToDelete = null;
}

/**
 * Check Product Availability (Search)
 * Normalizes input, checks if a product exists (case-insensitive),
 * displays status messages and highlights the item if found.
 */
function checkAvailability() {
    const searchInput = document.getElementById("search-product-input");
    const resultBox = document.getElementById("search-result");
    
    if (!searchInput || !resultBox) return;

    const queryRaw = searchInput.value;
    const query = queryRaw.trim();

    // Search validation: Empty search not allowed
    if (query === "") {
        resultBox.style.display = "none";
        showMessage("Empty search not allowed. Please enter a product name to search.", "error");
        return;
    }

    const lowercaseQuery = query.toLowerCase();
    
    // Case-insensitive search match
    const foundIndex = inventory.findIndex(item => item.trim().toLowerCase() === lowercaseQuery);

    if (foundIndex !== -1) {
        const matchedName = inventory[foundIndex];
        
        // Show success in search result widget
        resultBox.className = "search-result-box success";
        resultBox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>Product is currently in stock.</span>
        `;
        resultBox.style.display = "flex";

        // Success toast notification
        showMessage(`Product "${matchedName}" is currently in stock.`, "success");

        // Premium feature: highlight matching card in the grid and scroll to it
        const cardElement = document.getElementById(`product-card-${foundIndex}`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Add pulse highlight animation
            cardElement.style.borderColor = "var(--primary)";
            cardElement.style.boxShadow = "0 0 30px rgba(0, 118, 214, 0.4)";
            
            setTimeout(() => {
                // Reset card styling to default css styles
                cardElement.style.borderColor = "";
                cardElement.style.boxShadow = "";
            }, 2500);
        }
    } else {
        // Show error/out-of-stock in search result widget
        resultBox.className = "search-result-box error";
        resultBox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <span>Product is currently out of stock.</span>
        `;
        resultBox.style.display = "flex";

        // Error toast notification
        showMessage(`Product "${query}" is currently out of stock.`, "error");
    }
}

/**
 * Update Statistics Panel
 * Updates total count, stock status message, and last updated timestamp.
 */
function updateStatistics() {
    const totalCountVal = document.getElementById("stat-total-products");
    const statusVal = document.getElementById("stat-status");
    const timeVal = document.getElementById("stat-last-updated");

    if (totalCountVal) {
        totalCountVal.textContent = inventory.length;
    }

    if (statusVal) {
        // Update availability label dynamically based on stock count
        if (inventory.length >= 5) {
            statusVal.textContent = "Optimal";
            statusVal.style.color = "var(--success)";
        } else if (inventory.length > 0) {
            statusVal.textContent = "Low Stock";
            statusVal.style.color = "var(--accent-inspiron)";
        } else {
            statusVal.textContent = "Out of Stock";
            statusVal.style.color = "var(--error)";
        }
    }

    if (timeVal) {
        // Formats time dynamically
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeVal.textContent = formattedTime;
    }

    // Also update count badge in the main panel header
    const mainBadge = document.getElementById("inventory-count");
    if (mainBadge) {
        mainBadge.textContent = `${inventory.length} Product${inventory.length !== 1 ? 's' : ''}`;
    }
}

/**
 * Show Toast Notification Alert
 * Spawns a custom styled toast notification.
 * 
 * @param {string} text Message content.
 * @param {string} type Alert type: 'success' | 'error'.
 */
function showMessage(text, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    // Create Toast element
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    // Select suitable SVG Icon
    let iconSvg = "";
    if (type === "success") {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    }

    toast.innerHTML = `
        ${iconSvg}
        <div class="toast-message">${text}</div>
        <button class="toast-close" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `;

    // Append to container
    container.appendChild(toast);

    // Bind Close Button click
    const closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            removeToast(toast);
        });
    }

    // Set auto-dismiss timeout (4s)
    setTimeout(() => {
        if (toast.parentNode) {
            removeToast(toast);
        }
    }, 4000);
}

/**
 * Animates out and removes a toast node
 * 
 * @param {HTMLElement} toast The toast element to remove.
 */
function removeToast(toast) {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, { once: true });
}
