#!/bin/bash

# Monitor Vercel production logs for the analyze API
# Usage: ./monitor-logs.sh

echo "🔍 Monitoring Vercel logs for smarter-premed..."
echo "📍 Watching: /api/analyze"
echo "⏰ Started at: $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

vercel logs https://smarter-premed.vercel.app --json 2>&1 | while IFS= read -r line; do
  # Skip "waiting" messages
  if [[ "$line" == *"waiting for new logs"* ]]; then
    continue
  fi

  # Skip empty lines
  if [ -z "$line" ]; then
    continue
  fi

  # Try to parse JSON
  if echo "$line" | jq -e . >/dev/null 2>&1; then
    timestamp=$(echo "$line" | jq -r '.timestampInMs // empty' | awk '{printf "%.3f", $1/1000}' | xargs -I {} date -r {} '+%H:%M:%S' 2>/dev/null || echo "")
    level=$(echo "$line" | jq -r '.level // "info"' | tr '[:lower:]' '[:upper:]')
    message=$(echo "$line" | jq -r '.message // empty')
    status=$(echo "$line" | jq -r '.responseStatusCode // empty')

    # Color code by level
    case "$level" in
      ERROR)
        color="\033[0;31m" # Red
        ;;
      WARN)
        color="\033[0;33m" # Yellow
        ;;
      *)
        color="\033[0;36m" # Cyan
        ;;
    esac
    reset="\033[0m"

    # Format output
    if [ -n "$message" ]; then
      if [ -n "$status" ] && [ "$status" != "-1" ]; then
        echo -e "${color}[$timestamp]${reset} [$level] $message ${color}(HTTP $status)${reset}"
      else
        echo -e "${color}[$timestamp]${reset} [$level] $message"
      fi
    fi
  else
    # Non-JSON line (headers, etc.)
    if [[ ! "$line" == *"Vercel CLI"* ]] && [[ ! "$line" == *"Fetching deployment"* ]] && [[ ! "$line" == *"Displaying runtime logs"* ]]; then
      echo "$line"
    fi
  fi
done
