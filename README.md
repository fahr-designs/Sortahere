# Sortahere

A guest management and email invitation system for events.

## Development

1. Install dependencies: `npm install`

2. Create a `.env` file using the .env.example template to configure your local project.

3. Run the development server: `npm start`

## Endpoints

### Public
- **POST `/rsvp`** — Submit RSVP response
  - Body: `{ name: string, attending: 0|1, message?: string }`
  - Rate limited to 5 requests per minute per IP

- **GET `/`** — Serves the frontend (public/index.html)

### Protected (Requires `Authorization` header with ADMIN_TOKEN)
- **POST `/admin/send-invites`** — Send invitation emails to all guests in `guests.json`
  - Returns: `{ total, sent, failed, detail }`

- **GET `/admin/rsvps`** — Retrieve all RSVPs and summary stats
  - Returns: `{ total, accepted, declined, rsvps }`
