#!/bin/bash
# Peak RSS of the build only = (all bun/node procs) - (dev server procs, snapshotted before)
cd /home/z/my-project
DEV_PIDS=$(pgrep -f "next dev|next-server|postcss.js|tee dev.log|bun run dev" | tr '\n' '|' | sed 's/|$//')
[ -z "$DEV_PIDS" ] && DEV_PIDS="none___"
rm -rf .next
bun run build > /tmp/build-mem3.log 2>&1 &
ROOT=$!
peak=0
for i in $(seq 1 160); do
  kill -0 $ROOT 2>/dev/null || break
  total=$(ps -eo rss=,pid=,args= | grep -E "node|bun|next" | grep -vE "$DEV_PIDS" | grep -v "grep" | awk '{s+=$1} END {print s+0}')
  [ "$total" -gt "$peak" ] && peak=$total
  sleep 1.5
done
wait $ROOT 2>/dev/null
echo "BUILD-ONLY PEAK RSS: $((peak/1024)) MB"
grep -E "✓ Compiled|error" /tmp/build-mem3.log | head -3
[ -f .next/standalone/server.js ] && echo "BUILD OK"
