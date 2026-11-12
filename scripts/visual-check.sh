#!/bin/bash
# Visual verification: start prod server, screenshot both pages, stop server.
set -e
cd /home/z/my-project

pkill -9 -f "next-server" 2>/dev/null || true
sleep 1

setsid nohup node scripts/serve-prod.js > /tmp/vis-server.log 2>&1 < /dev/null &
sleep 5

S=vis
agent-browser --session $S close 2>/dev/null || true
agent-browser --session $S set viewport 1440 900 2>/dev/null || true

echo "== MAIN PAGE =="
agent-browser --session $S open http://localhost:3000
agent-browser --session $S wait --load networkidle
sleep 2
agent-browser --session $S screenshot /tmp/render/main-top.png
agent-browser --session $S scroll down 2200
sleep 1.5
agent-browser --session $S screenshot /tmp/render/main-hub.png
agent-browser --session $S scroll down 2600
sleep 2
agent-browser --session $S screenshot /tmp/render/main-bottom.png

echo "== TOOLS PAGE =="
agent-browser --session $S open http://localhost:3000/tools
agent-browser --session $S wait --load networkidle
sleep 2
agent-browser --session $S screenshot /tmp/render/tools-top.png
agent-browser --session $S scroll down 2000
sleep 2
agent-browser --session $S screenshot /tmp/render/tools-wizard.png
agent-browser --session $S scroll down 4000
sleep 2.5
agent-browser --session $S screenshot /tmp/render/tools-scanner.png

echo "== ERRORS =="
agent-browser --session $S errors || true
agent-browser --session $S close || true

pkill -9 -f "next-server" 2>/dev/null || true
echo "== DONE =="
ls -la /tmp/render/
