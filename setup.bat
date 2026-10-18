@echo off
echo ============================================
echo   Mirchi Store — Full Setup Script
echo ============================================
echo.

set ROOT=%~dp0

echo [1/5] Installing server dependencies...
cd "%ROOT%server"
call npm install
echo.

echo [2/5] Installing client dependencies...
cd "%ROOT%client"
call npm install
echo.

echo [3/5] Copying product images to client public/images...
cd "%ROOT%server"
call node scripts/copy-assets.js
echo.

echo [4/5] Initializing database (schema + seed data)...
cd "%ROOT%server"
call node scripts/init-db.js
echo.

echo [5/5] Generating admin password hash...
cd "%ROOT%server"
call node scripts/gen-admin-hash.js Admin@123
echo.

echo ============================================
echo   Setup complete!
echo   Default admin login:
echo     Username : admin
echo     Password : Admin@123
echo   Change your password after first login.
echo ============================================
echo.
echo Start the app with:
echo   Terminal 1: cd server ^&^& npm run dev
echo   Terminal 2: cd client ^&^& npm run dev
echo.
pause
