# Habesha Real Estate System

A modern real estate platform developed for Habesha Real Estate using React and Supabase. The system enables property management, property listings, customer interactions, and real-time data management through a secure and scalable architecture.

## Project Overview

Habesha Real Estate System is designed to streamline real estate operations by providing a centralized platform for managing properties, agents, and customers. The application offers a responsive user interface, secure authentication, and efficient property search capabilities.

## Features

* User Authentication and Authorization
* Property Listing Management
* Property Search and Filtering
* Property Details and Image Gallery
* Agent Management
* Customer Management
* Responsive Design
* Real-Time Data Synchronization
* Secure Cloud Database Storage

## Technologies Used

### Frontend

* React.js
* React Router
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite

### Backend & Database

* Supabase

  * PostgreSQL Database
  * Authentication
  * Storage
  * Real-Time Services

## Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* Supabase Project

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd habesha-real-estate
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
├── pages/
├── hooks/
├── services/
├── layouts/
├── assets/
├── utils/
└── App.jsx
```

## Future Enhancements

* Property Map Integration
* Advanced Analytics Dashboard
* Property Booking Requests
* Email Notifications
* Mobile Application Support
* AI-Based Property Recommendations

## License

This project is proprietary software developed for Habesha Real Estate.

## Author

Developed with React and Supabase for Habesha Real Estate.
