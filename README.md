# Cyberlog Project

## Tech Stack

- **Next.js** 
- **TypeScript**
- **Tailwind CSS**
- **MongoDB**
- **Resend**

## Getting Started

To run this project locally or in your environment, follow the steps below.


### 1. Install dependencies
Navigate to the project directory and install the required dependencies using `npm` or `yarn`:

```bash
npm install
```

### 2. Set up environment variables
You need to create a `.env` file in the root of the project and set the following environment variables:

```plaintext
DATABASE_URL=your_database_url
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
AUTH_RESEND_KEY=your_resend_api_key
EMAIL_FROM=your_email_address
```

### 3. Admin Configuration
To define the list of admin users, navigate to the `/data/admin-emails.tsx` file and add or remove emails as necessary. This list controls who has access to the admin panel.

### 4. Run the Development Server
After setting up the environment variables and dependencies, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Admin Panel

Admins can access the admin panel by navigating to the `/admin` route. From here, they can:

- **Generate New Keys:** Create new keys for the system.
- **View Existing Keys:** Access a list of previously generated keys.
- **View User List:** See all registered users.

### Admin Panel Routes:
- `/admin`: Admin dashboard.
- `/admin/manage-keys`: View and manage existing keys.
- `/admin/manage-keys/new`: Create a new key.
- `/admin/users`: View the list of users.

## Available Routes

Below is a list of all available routes in the application:

| Route                               | Size     | First Load JS |
|------------------------------------- |----------|---------------|
| `/`                                  | 139 B    | 87.2 kB       |
| `/admin`                             | 139 B    | 87.2 kB       |
| `/admin/manage-keys`                 | 2.54 kB  | 104 kB        |
| `/admin/manage-keys/new`             | 4.83 kB  | 104 kB        |
| `/admin/users`                       | 3.7 kB   | 98.1 kB       |
| `/dashboard`                         | 3.75 kB  | 103 kB        |
| `/login`                             | 2.74 kB  | 97.5 kB       |
| `/logout`                            | 2.32 kB  | 97.1 kB       |
| `/verify`                            | 176 B    | 94.1 kB       |

---

## Made by
- [Prateek Singh](http://github.com/devXprite/)