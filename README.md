# 🖥️ Dell Inventory Management System

A modern and responsive **Inventory Management System** built using **HTML, CSS, and Vanilla JavaScript**. This project simulates a core inventory module for a Dell E-Commerce platform, allowing users to manage Dell product inventory efficiently through a simple and interactive web interface.

## 📌 Overview

The application uses JavaScript arrays as the primary data structure to store and manage inventory data. Users can view available products, check product availability, add new products, remove existing products, and monitor inventory statistics in real time without requiring a backend server.

## ✨ Features

### 📦 Inventory Display

* Displays all available Dell products in a responsive card layout.
* Shows total inventory count.
* Automatically updates when products are added or removed.

### 🔍 Product Availability Check

* Search products by name.
* Case-insensitive search.
* Trims unnecessary spaces.
* Displays stock availability status instantly.

### ➕ Add New Product

* Add new Dell products to inventory.
* Prevents duplicate entries.
* Validates empty input fields.
* Updates inventory display immediately.

### ❌ Remove Product

* Remove products directly from inventory.
* Confirmation prompt before deletion.
* Instant inventory refresh after removal.

### 📊 Inventory Statistics

* Total Products
* Available Products
* Last Updated Time

### 🎨 User Interface

* Dell-inspired modern design.
* Responsive layout for desktop, tablet, and mobile devices.
* Product cards with hover effects.
* Animated success and error notifications.

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)

---

## 📂 Project Structure

```text
Dell-Inventory-System/
│
├── index.html
├── style.css
├── script.js
└── assets/
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/Dell-Inventory-System.git
```

### Open the Project

Navigate to the project folder and open `index.html` in your browser.

```bash
cd Dell-Inventory-System
```

No additional setup or dependencies are required.

---

## 📋 Initial Inventory Data

```javascript
let inventory = [
    "Dell XPS 13",
    "Dell XPS 15",
    "Dell Inspiron 15",
    "Dell Latitude 5440",
    "Dell Precision 3580",
    "Dell Alienware M18",
    "Dell Vostro 3520"
];
```

---

## ⚙️ Core Functions

```javascript
displayInventory()
addProduct()
removeProduct()
checkAvailability()
updateStatistics()
showMessage()
```

---

## ✅ Validation Rules

### Add Product

* Product name cannot be empty.
* Duplicate products are not allowed.

### Search Product

* Search field cannot be empty.
* Search is case-insensitive.

### Remove Product

* Confirmation is required before deletion.

---

## 🧪 Test Cases

| Test Case | Action                        | Expected Result                   |
| --------- | ----------------------------- | --------------------------------- |
| 1.1       | Load Application              | All Dell products displayed       |
| 1.2       | Add "Dell G15 Gaming Laptop"  | Product appears instantly         |
| 1.3       | Remove "Dell Vostro 3520"     | Product removed successfully      |
| 4.1       | Search "Dell XPS 13"          | Product is currently in stock     |
| 4.2       | Search "Dell Chromebook 5000" | Product is currently out of stock |

---

## 🎯 Learning Objectives

This project demonstrates:

* Array Manipulation
* DOM Manipulation
* Event Handling
* Form Validation
* Dynamic UI Rendering
* Responsive Web Design
* Modular JavaScript Functions

---

## 🔮 Future Enhancements

* Local Storage Support
* Product Categories
* Product Images
* Quantity Tracking
* Export Inventory Reports
* REST API Integration
* Database Connectivity

⭐ If you found this project useful, consider giving it a star on GitHub!
