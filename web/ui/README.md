# Hickory DNS UI

Production-ready React frontend for the Hickory DNS management platform.

## Features

- **Authentication & Authorization**
  - JWT-based login with role-based access control (Admin/User)
  - Secure token management
  
- **Admin Panel**
  - Dashboard with real-time metrics and charts
  - Zone management (CRUD)
  - Record management (CRUD for A, AAAA, CNAME, MX, TXT, NS, SRV, etc.)
  - User management
  - Server and Agent management
  - GeoDNS rules configuration
  - SSL Certificate management
  - Audit logs

- **User Panel**
  - Personal zone management
  - View and manage own records

- **UI/UX**
  - Responsive design (mobile + desktop)
  - Dark/Light theme support
  - Real-time metrics visualization
  - Loading states and error handling
  - Interactive charts with Recharts

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Zustand (state management)
- Recharts (charts)
- Lucide React (icons)
- Axios (HTTP client)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd web/ui
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
```

### Docker

```bash
docker build -t hickory-dns-ui .
docker run -p 8080:8080 hickory-dns-ui
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8080` |

## Project Structure

```
src/
├── api/            # API client
├── components/     # Reusable components
├── hooks/          # Custom React hooks
├── pages/          # Page components
│   ├── Admin/     # Admin panel pages
│   └── Login.jsx  # Login page
├── store/          # Zustand stores
├── App.jsx         # Main app component
└── main.jsx       # Entry point
```

## API Integration

The UI expects these backend endpoints:

- `POST /api/v1/auth/login` - Login
- `GET /api/v1/zones` - List zones
- `POST /api/v1/zones` - Create zone
- `GET /api/v1/zones/:id/records` - List records
- `POST /api/v1/zones/:id/records` - Create record
- `GET /api/v1/agents` - List agents
- `GET /api/v1/georules` - List GeoDNS rules
- `GET /api/v1/metrics` - Get metrics
- `GET /api/v1/audit/logs` - Get audit logs
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics

## License

MIT
