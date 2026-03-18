# Frontend-Backend Connection TODO

## Step 1: Create .env files [COMPLETE]
- Backend/.env
- Fronted/.env

## Step 2: Add Vite proxy [COMPLETE]

## Step 3: Install dependencies [COMPLETE]
(Already present; skipped)

## Step 4: Run servers [MANUAL - READY]
**Run in VSCode terminal:**
```
Terminal 1: cd Backend && npm run dev
Terminal 2: cd Fronted && npm run dev
```

## Step 5: Test APIs [READY]
- http://localhost:5173/login → Register/Login
- Network tab: /api/auth calls proxied to backend

## Step 6: Configure real DB/JWT [PENDING]
- Update MONGODB_URI, JWT_SECRET in Backend/.env
