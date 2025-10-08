# ALLDENIMS Cost Calculation System

This project was developed as part of the **ALLDENIMS Technical Task Documentation**, aiming to transform the company’s internal cost tables into a more **interactive and user-friendly** web application.

The application uses Python Flask for the backend and HTML, CSS, JS, Bootstrap for the frontend, managing the complex Excel-based cost calculation logic through a reliable REST API.

---

## 🎯 Project Overview

This application showcases full-stack and scalable architecture.

RESTful API Development: Developed a dedicated /calculate endpoint in Python Flask to handle all computational requests from the client.

Modular Backend: The complex financial logic is isolated in a file, ensuring high code quality, readability, and testability.

Modern Frontend: Utilized Bootstrap 5 for a professional and mobile-friendly UI, enhancing user experience with smooth, asynchronous updates.

Database Readiness: Designed the application structure to easily integrate a relational database for dynamic rate and table management.

---

## Setup and Running Instructions

Follow the steps below to run the project locally.

### Prerequisites

* Python 3.8+
* Git

### 1. Clone the Repository

```bash
git clone [YOUR_GITHUB_REPOSITORY_URL]
cd alldenims_cost
```

### 2. Set Up a Virtual Environment

```bash
python3 -m venv venv
```

Activate the virtual environment:

```bash
source venv/bin/activate  # For Linux/macOS
# or
venv\Scripts\activate     # For Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

The application will start running at:  
**http://127.0.0.1:5000/**
