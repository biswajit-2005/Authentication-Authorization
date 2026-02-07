# Frontend - Auth Testing

React frontend to test the backend authentication APIs.

## Features

- **Sign Up** - Register new users with name, email, password, and role
- **Login** - Authenticate users and receive access/refresh tokens
- **Email Verification** - Verify email address with token
- **Token Refresh** - Test refresh token endpoint
- **Logout** - Logout and clear sessions

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure backend is running on `http://localhost:5000`

3. Start the frontend:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser

## Testing Flow

1. **Sign Up**: Create a new account
   - Name, Email, Password, Role
   - Frontend sends request to `POST /api/auth/signUp`

2. **Verify Email**: Check console/backend logs for email token
   - Copy the token and paste in verification form
   - Frontend sends request to `GET /api/auth/verifyMail?emailtoken=...`

3. **Login**: Use verified account credentials
   - Frontend sends request to `POST /api/auth/login`
   - Cookies set automatically for access/refresh tokens

4. **Dashboard**: After login, test additional features
   - **Refresh Token**: Click to test token refresh
   - **Logout**: Click to logout and clear session

## API Endpoints Being Tested

- `POST /api/auth/signUp` - Create new user
- `GET /api/auth/verifyMail` - Verify email
- `POST /api/auth/login` - Login user
- `GET /api/auth/refreshToken` - Refresh access token
- `POST /api/auth/logout` - Logout user

## Notes

- Cookies are automatically included in requests (`withCredentials: true`)
- Check browser DevTools (Application > Cookies) to see tokens
- Backend CORS must allow `http://localhost:3000`
- Email verification token can be found in backend console logs

## Troubleshooting

**CORS Error?**

- Ensure backend `server.js` has `http://localhost:3000` in CORS origin

**Cookies not setting?**

- Check that backend cookies use `secure: false` for localhost
- Verify `withCredentials: true` in axios config

**Login fails after signup?**

- Verify email first (check backend console for token)
- Then try login with verified email
