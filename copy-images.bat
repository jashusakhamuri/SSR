@echo off
echo ====================================================
echo   Copying All Real Chilli and Farm Images to Public
echo ====================================================
cd "%~dp0server"
node scripts/copy-assets.js
echo.
echo Done! All product and farm story images are copied.
pause
