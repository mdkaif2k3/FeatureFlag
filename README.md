# Multi-Tenant Feature Flag Management System

A full-stack Multi-Tenant Feature Flag Management System built with **React**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. The application allows organizations to manage feature availability through role-based access while maintaining tenant isolation.

---

## Features

### Super Admin
- Create, view, update, and delete organizations
- Create, view, update, and delete feature flags
- Enable or disable feature flags for individual organizations
- Automatic synchronization between organizations and feature flags

### Organization Admin
- View all organizations
- Expand organizations to view available feature flags
- Enable or disable feature flags
- No permission to create, edit, or delete organizations or feature flags

### User
- View organizations
- View enabled and disabled feature flags
- Read-only access
- No modification permissions

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

---

## Database Schema

The application follows a many-to-many relationship between organizations and feature flags.

```
Organization
      │
      │
OrganizationFeature
      │
      │
FeatureFlag
```

### Tables

#### Organization
Stores all tenant organizations.

#### FeatureFlag
Stores all available features in the system.

#### OrganizationFeature
Acts as a junction table containing:

- Organization ID
- Feature Flag ID
- Enabled status

This design allows each organization to have its own independent feature configuration.

---

## Project Structure

```
FeatureFlag/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   ├── config/
│   └── services/
│
├── super-admin/
│   ├── src/
│   ├── services/
│   └── components/
│
├── organization-admin/
│   ├── src/
│   └── services/
│
└── user/
    ├── src/
    └── services/
```

---

## API Endpoints

### Organizations

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/organizations` | Get all organizations |
| POST | `/organizations` | Create organization |
| PUT | `/organizations/:id` | Update organization |
| DELETE | `/organizations/:id` | Delete organization |

---

### Feature Flags

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/feature-flags` | Get all feature flags |
| POST | `/feature-flags` | Create feature flag |
| PUT | `/feature-flags/:id` | Update feature flag |
| DELETE | `/feature-flags/:id` | Delete feature flag |

---

### Organization Features

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | `/organization-features/:id` | Enable or disable a feature for an organization |

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/feature-flag-management.git
cd feature-flag-management
```

---

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/feature_flags"
PORT=5000
```

Run Prisma migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start the server

```bash
npm run dev
```

---

### Frontend Setup

For each frontend application:

```bash
cd super-admin
npm install
npm run dev
```

```bash
cd organization-admin
npm install
npm run dev
```

```bash
cd user
npm install
npm run dev
```

---

## Workflow

### Creating an Organization

When a new organization is created:

- Organization is inserted into the database
- All existing feature flags are automatically assigned
- Default status is **Disabled**

---

### Creating a Feature Flag

When a new feature flag is created:

- Feature is inserted into the database
- Every existing organization automatically receives the feature
- Default status is **Disabled**

---

### Enabling a Feature

When the Super Admin or Organization Admin enables a feature:

- Only the corresponding `OrganizationFeature` record is updated
- Other organizations remain unaffected

---

## Future Improvements

- JWT Authentication
- Role-Based Access Control
- Search
- Pagination
- Audit Logs
- Activity History
- Toast Notifications
- Responsive Design
- Docker Deployment

---

## Author

**Mohammed Kaif**

GitHub: https://github.com/mdkaif2k3

LinkedIn: https://www.linkedin.com/in/mohammed-kaif-a4135a275