
# ORIC MUET Web-Portal

> **Office of Research, Innovation & Commercialization — Mehran University of Engineering & Technology Jamshoro**

A single-page React application that provides MUET community members with a secure login portal and a centralised dashboard for discovering research opportunities, scholarships, and internships.

---


## Overview

The ORIC MUET Web-Portal is a React-based frontend application designed for students, faculty, and administrative staff at Mehran University of Engineering & Technology. It enforces institutional email policies, auto-generates secure passwords for first-time users, and surface curated opportunities directly after login.

---

## Features

### Authentication
- **Existing User Login** — email + password authentication with clear error messaging
- **New User Registration** — account creation with full-name capture and Terms & Privacy Policy agreement
- **Forgot Password** — directs users to the ORIC admin contact for manual reset

### Email Validation
- Restricts access to official MUET domains only:
  - `@students.muet.edu.pk`
  - `@faculty.muet.edu.pk`
  - `@admin.muet.edu.pk`
- Non-university emails (Gmail, Yahoo, etc.) are blocked with a descriptive error message

### First-Time Login Flow
- On registration, the system auto-generates a secure 10-character password (alphanumeric + special characters)
- The generated password is displayed immediately on screen for the user to copy
- A persistent security banner on the dashboard prompts the user to change their password

### Dashboard — Opportunities
- Displays a filterable, searchable grid of opportunities including:
  - Scholarships
  - Internships
  - Research Grants
- Filter by category using pill-style buttons
- Full-text search across titles and descriptions
- Each card shows: badge, title, description, deadline, and an Apply button
- Cards animate on hover (lift + border highlight)

### Settings — Password Management
- Users can change their system-generated password to a personal one
- Validates: current password correctness, minimum 8-character length, and confirmation match
- Removes the first-login security banner upon successful password change

### UI & Branding
- ORIC MUET logo embedded in the login header and topbar
- Dynamic favicon set via `useEffect` on mount
- Dynamic `document.title` set to "ORIC MUET Web-Portal"
- Animated starfield background with ambient purple glow blobs
- Role badge in topbar (Student / Faculty / Admin) derived from email domain

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Language | JavaScript (JSX) |
| Styling | Inline styles with CSS-in-JS tokens |
| State Management | React `useState`, `useEffect` |
| Data Layer | In-memory JavaScript object (no backend) |
| Icons/Assets | Base64-embedded ORIC logo, Unicode emoji icons |
| Build Tool | Create React App (or any React-compatible bundler) |

---

## Project Structure

```
muet-oric-portal/
├── public/
│   ├── index.html
│   └── favicon.ico          
├── src/
│   ├── App.js               ← Main application (single file)
│   └── index.js             ← Entry point
├── README.md
└── package.json
```

The entire application lives in a single JSX file (`App.js`) for portability. All components, data, and styles are self-contained.

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/proper-zainyyllc110/MUET-ORIC-Portal
cd MUET-ORIC-Portal

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3000`.



## Usage Guide

### Registering a New Account

1. Open the portal at `http://localhost:3000`
2. Click **New User** on the toggle
3. Enter your full name and an official MUET email address
4. Check the Terms & Privacy Policy checkbox
5. Click **Create Account**
6. Your system-generated password will appear on screen — **copy it before navigating away**

### Logging In

1. Click **Existing User** on the toggle
2. Enter your MUET email and password
3. Click **LogIN**
4. You will be redirected to the dashboard

### Browsing Opportunities

- Use the category filter pills (**All / Scholarship / Internship / Research Grant**) to narrow results
- Use the search bar to find opportunities by keyword
- Click **Apply** on any card to initiate an application (extend with routing as needed)

### Changing Your Password

1. Click **⚙ Settings** in the top navigation bar
2. Enter your current password
3. Enter and confirm your new password (minimum 8 characters)
4. Click **Update Password**
5. The first-login security banner will be dismissed automatically

---

## Email Validation Rules

| Domain | User Type |
|---|---|
| `@students.muet.edu.pk` | Student |
| `@faculty.muet.edu.pk` | Faculty |
| `@admin.muet.edu.pk` | Administrator |

Any email that does not end with one of the above domains is rejected at both registration and login with a clear error message. The check is case-insensitive.

---


### Utility Functions

| Function | Description |
|---|---|
| `generatePassword()` | Generates a random 10-character password from alphanumeric + special characters |
| `validateEmail(e)` | Returns `true` if the email ends with a valid MUET domain |
| `getUserType()` | Derives role label (Student / Faculty / Admin) from the logged-in email domain |

---

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#0B0F2E` | Page background |
| Card surface | `#1A1F4B` | Frosted glass cards |
| Primary accent | `#6C3FE8` | Borders, focus rings, gradient start |
| Secondary accent | `#A855F7` | Links, gradient end, hover states |
| Input fill | `rgba(255,255,255,0.07)` | Input backgrounds |
| Text primary | `#FFFFFF` | Headings, body |
| Text secondary | `rgba(255,255,255,0.55)` | Subtitles, placeholders |
| Error | `#F87171` | Validation error messages |
| Success | `#34D399` | Success messages, Research Grant badges |

---

## Screenshots

<img width="958" height="440" alt="login" src="https://github.com/user-attachments/assets/011a7efb-89dd-4f4e-b14b-e80597bf8183" />

<img width="950" height="430" alt="dashboard" src="https://github.com/user-attachments/assets/c3d0b5ea-41f8-456b-97ef-875e2c286cb6" />

<img width="949" height="437" alt="dashboard1" src="https://github.com/user-attachments/assets/b431cf1f-42b7-4df0-be96-70887d2e28e2" />

<img width="947" height="415" alt="forgetpass" src="https://github.com/user-attachments/assets/2c701325-715e-4568-9650-63f8b0caec9f" />

<img width="952" height="431" alt="Signup" src="https://github.com/user-attachments/assets/6402b929-4b82-4291-951b-d6a3dcd8b6a3" />









