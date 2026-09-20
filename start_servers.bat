@echo off
title Personality Forge - Servidores

cd /d "F:\Users\user\Desktop\lilith_projects\personality_forge"
echo Iniciando backend...
start "" python -m uvicorn api.server:app --host 127.0.0.1 --port 8000

cd /d "F:\Users\user\Desktop\lilith_projects\personality_forge\frontend"
echo Iniciando frontend...
start "" npm run dev

echo.
echo Servidores iniciados!
echo Acesse: http://localhost:5173
echo API: http://127.0.0.1:8000
echo.
pause