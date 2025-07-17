# AbleTools Deployment Package

## Complete Production-Ready Code

This package contains your complete AbleTools rehabilitation equipment website ready for deployment to any hosting provider that supports Node.js.

### Technology Stack
- **Backend:** Node.js + Express.js + TypeScript
- **Frontend:** React + TypeScript + Vite
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS + shadcn/ui components
- **Authentication:** Session-based with PostgreSQL storage

### Package Contents
```
abletools-deployment/
├── server/                  # Express.js backend
│   ├── index.js            # Compiled server entry point
│   ├── routes.js           # API routes (compiled)
│   └── storage.js          # Database operations (compiled)
├── public/                 # Built React frontend
│   ├── index.html
│   ├── assets/             # CSS, JS bundles
│   └── ...
├── attached_assets/        # Company images and files
├── shared/                 # Database schemas
├── package.json           # Production dependencies
├── .env.production        # Environment configuration
├── start.js               # Production startup script
└── deployment-guide.md    # This guide
```

### Database Configuration
Your application is configured for PostgreSQL with these credentials:
- Host: localhost
- Database: abletoolscom_dbengrweb
- User: abletoolscom_dbengruser
- Password: dbengrpwd140725

### Admin Access
- URL: /admin
- Username: admin
- Password: admin123