# Production Monitoring & Logs

**Last Updated:** January 21, 2026

This guide explains how to monitor production deployments and access logs for debugging issues.

---

## Table of Contents

- [Accessing Logs](#accessing-logs)
- [CLI Limitations](#cli-limitations)
- [Monitoring Tools](#monitoring-tools)
- [Common Issues](#common-issues)
- [Log Format](#log-format)

---

## Accessing Logs

### Method 1: Vercel Dashboard (RECOMMENDED for historical logs)

**Best for:** Viewing past errors, analyzing user issues, historical data

1. Visit https://vercel.com/dashboard
2. Select the `smarter-premed` project
3. Click **Logs** tab in the left sidebar
4. Filter by:
   - **Function:** `api/analyze` (for API endpoint logs)
   - **Time range:** Last hour, last 24 hours, custom
   - **Log level:** Error, Warning, Info
   - **Status code:** 200, 500, etc.

**What you'll see:**
- Complete request/response cycle
- `[ANALYZE]` prefixed logs from our API
- Timing information (request duration, API call duration)
- Error stack traces
- HTTP status codes

**Example search queries:**
- `[ANALYZE] Request failed` - Find failed requests
- `level:"error"` - All errors
- `statusCode:500` - Server errors

---

### Method 2: Vercel CLI (for LIVE logs only)

**Best for:** Real-time monitoring, testing new deployments

**⚠️ CRITICAL LIMITATION:** The CLI only shows **live/streaming logs** starting from when you run the command. It does NOT show historical logs.

#### Prerequisites

```bash
# 1. Ensure Vercel CLI is installed
which vercel

# 2. Login to Vercel (only needed once)
vercel login

# 3. Link to the project (only needed once per machine)
vercel link --yes
```

#### Basic Usage

**Monitor live logs (raw JSON):**
```bash
vercel logs https://smarter-premed.vercel.app --json
```

**Monitor live logs (formatted, using our custom script):**
```bash
./monitor-logs.sh
```

**Monitor specific deployment:**
```bash
# Get deployment URL from vercel ls
vercel ls

# Monitor that deployment
vercel logs https://smarter-premed-XXXXX-dgmuleis-projects.vercel.app --json
```

#### What You Won't See with CLI

- ❌ Logs from requests that happened before you started the command
- ❌ Historical errors or past user issues
- ❌ The specific error your friend got 10 minutes ago

#### What You Will See with CLI

- ✅ New requests happening in real-time
- ✅ Console.log output from serverless functions
- ✅ Error messages as they occur
- ✅ Request timing and performance data

---

## CLI Limitations

### Why Historical Logs Don't Work

The `vercel logs` command connects to a live stream and waits for new log entries. According to Vercel's documentation:

> "Display runtime logs for a deployment in ready state, **from now** and for 5 minutes at most."

This means:
1. It only captures logs generated **after** you start the command
2. It times out after 5 minutes of streaming
3. It's designed for real-time debugging, not historical analysis

### When CLI Logs Appear to Hang

If you run `vercel logs` and it says "waiting for new logs...", this is **normal behavior**. It's waiting for traffic to hit your deployment. Solutions:

1. **Trigger a test request** (see Monitoring Tools section)
2. **Wait for real user traffic**
3. **Use Vercel Dashboard instead** for historical data

### Why the Earlier Command Failed

When we tried `vercel logs https://smarter-premed-48nigrvzb-dgmuleis-projects.vercel.app --json 2>&1 | head -200`, it:
1. Started streaming logs
2. Waited indefinitely for traffic
3. Eventually hit memory limits (exit code 137 = killed/OOM)

This is expected behavior when piping unlimited streaming data.

---

## Monitoring Tools

### 1. monitor-logs.sh

**Location:** `/monitor-logs.sh`

**Purpose:** Formatted, color-coded live log viewer

**Usage:**
```bash
./monitor-logs.sh
```

**Features:**
- Filters out CLI noise
- Color-codes by log level (Error=Red, Warn=Yellow, Info=Cyan)
- Shows human-readable timestamps
- Highlights HTTP status codes
- Auto-parses JSON log entries

**Output Example:**
```
[14:24:07] [INFO] [ANALYZE] Request started at 2026-01-21T19:24:07.917Z
[14:24:08] [INFO] [ANALYZE] Calling Anthropic API (attempt 1/2) with model: claude-sonnet-4-5-20250929
[14:24:29] [INFO] [ANALYZE] Received response from Anthropic API in 21456ms (21.5s)
[14:24:29] [INFO] [ANALYZE] Request completed successfully in 22123ms (22.1s) (HTTP 200)
```

---

### 2. test-vercel-endpoint.sh

**Location:** `/test-vercel-endpoint.sh`

**Purpose:** Quick health check for production API

**Usage:**
```bash
./test-vercel-endpoint.sh
```

**What it does:**
- Sends minimal POST request to `/api/analyze`
- Shows HTTP status code
- Identifies if route exists (404 vs 400 vs 500)
- Checks DNS resolution

---

### 3. test-production-api.js

**Location:** `/test-production-api.js`

**Purpose:** Full end-to-end API test with realistic data

**Usage:**
```bash
# Start monitoring in one terminal
./monitor-logs.sh

# Run test in another terminal
node test-production-api.js
```

**What it does:**
- Sends complete questionnaire data to production API
- Shows response time and status
- Displays profile summary and cohort rankings
- Useful for generating logs to monitor

---

## Common Issues

### Issue: "Failed to fetch" error on first try, works on refresh

**Symptom:** Users get error on initial questionnaire submission, but it works when they try again.

**Cause:** Cold start (2-5s) + Claude API latency (15-30s) exceeding browser timeout

**Fix Applied (v1.4.1):**
- Extended timeout from 30s → 90s
- Added automatic retry (2 attempts)
- Better error messages

**How to verify it's fixed:**
```bash
# Monitor logs
./monitor-logs.sh

# Trigger test (in another terminal)
node test-production-api.js

# Look for:
# - "[ANALYZE] Request completed successfully in XXXXms"
# - If XXXms > 30000, old version would have timed out
```

---

### Issue: Can't see logs from user error report

**Problem:** User reports error 20 minutes ago, CLI shows "waiting for new logs"

**Solution:** Use Vercel Dashboard (Method 1), not CLI

**Steps:**
1. Go to https://vercel.com/dashboard → smarter-premed → Logs
2. Set time range to "Last hour"
3. Filter by function: `api/analyze`
4. Look for `[ANALYZE] Request failed` or error-level logs
5. Check timestamp matches when user reported issue

---

### Issue: vercel logs command hangs forever

**This is normal!** It's waiting for traffic. Either:

1. **Trigger a test request:**
   ```bash
   # Terminal 1: Start monitoring
   ./monitor-logs.sh

   # Terminal 2: Trigger request
   node test-production-api.js
   ```

2. **Use Dashboard instead** if you need historical data

3. **Kill the command** with Ctrl+C when done

---

## Log Format

### Our Custom Log Prefixes

All logs from `/api/analyze` use the `[ANALYZE]` prefix for easy filtering:

```typescript
// Request lifecycle logs
console.log('[ANALYZE] Request started at', new Date().toISOString());
console.log('[ANALYZE] Calling Anthropic API (attempt X/2)...');
console.log('[ANALYZE] Received response from Anthropic API in XXms');
console.log('[ANALYZE] Request completed successfully in XXms');
console.error('[ANALYZE] Request failed after XXms:', error);
```

### Log Entry Structure (JSON)

```json
{
  "level": "info",
  "message": "[ANALYZE] Request completed successfully in 22123ms (22.1s)",
  "messageTruncated": false,
  "rowId": "1769023447918",
  "source": "serverless",
  "timestampInMs": 1769023447918,
  "requestMethod": "POST",
  "requestPath": "/api/analyze",
  "domain": "smarter-premed.vercel.app",
  "responseStatusCode": 200
}
```

### Key Fields

- **level:** `info`, `warn`, `error`
- **message:** Log message with `[ANALYZE]` prefix
- **timestampInMs:** Unix timestamp in milliseconds
- **responseStatusCode:** HTTP status (-1 = in progress, 200 = success, 500 = error)
- **source:** Always `serverless` for API routes

---

## Performance Benchmarks

Based on production logs:

| Metric | Typical Range | Concern If |
|--------|---------------|------------|
| **Cold Start** | 2-5 seconds | > 10 seconds |
| **Claude API Call** | 15-30 seconds | > 45 seconds |
| **Total Request** | 18-35 seconds | > 60 seconds |
| **HTTP 200 Success Rate** | > 95% | < 90% |

### Example Analysis from Logs

```
[14:22:50] Request started
[14:22:50] Calling Anthropic API (attempt 1/2)
[14:23:12] Received response from API in 21456ms (21.5s)  ← Claude API time
[14:23:12] Request completed in 22123ms (22.1s)           ← Total time
```

**Analysis:**
- Cold start: ~1s (22.1s total - 21.5s API = 0.6s)
- Claude API: 21.5s ✅ (within normal range)
- Total: 22.1s ✅ (well under 90s timeout)

---

## Quick Reference

### Just want to see what's happening right now?

```bash
./monitor-logs.sh
```

### Need to investigate a past error?

Go to https://vercel.com/dashboard → smarter-premed → Logs

### Want to test if the API is working?

```bash
./test-vercel-endpoint.sh
```

### Need full end-to-end test with timing?

```bash
node test-production-api.js
```

---

## Additional Resources

- [Vercel Logs Documentation](https://vercel.com/docs/observability/runtime-logs)
- [Vercel CLI Reference](https://vercel.com/docs/cli/logs)
- [Project Dashboard](https://vercel.com/dashboard)

---

**Note for Future Debugging:**

Always start with the Vercel Dashboard for historical issues. Only use CLI logs when you need real-time monitoring or are actively testing changes.
