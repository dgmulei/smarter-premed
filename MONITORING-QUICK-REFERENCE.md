# Monitoring Quick Reference

**For full documentation, see:** [`docs/MONITORING.md`](docs/MONITORING.md)

---

## 🚨 User Reported an Error - What Do I Do?

### Step 1: Check Historical Logs (Recommended)

**Best for past errors** (e.g., "user got error 20 minutes ago")

1. Go to https://vercel.com/dashboard
2. Select `smarter-premed` project
3. Click **Logs** tab
4. Filter:
   - Time range: Last hour
   - Function: `api/analyze`
   - Search: `[ANALYZE] Request failed` or `level:"error"`
5. Look for timestamp matching user's report

---

## 🔴 Monitor Live Production Traffic

### Option 1: Formatted Logs (Recommended)

```bash
./monitor-logs.sh
```

Shows color-coded, formatted output with timestamps.

### Option 2: Raw JSON Logs

```bash
vercel logs https://smarter-premed.vercel.app --json
```

---

## 🧪 Test the Production API

### Quick Health Check

```bash
./test-vercel-endpoint.sh
```

Returns HTTP status (200 = working, 404 = route missing, 500 = error)

### Full End-to-End Test

```bash
# Terminal 1: Start monitoring
./monitor-logs.sh

# Terminal 2: Run test
node test-production-api.js
```

You'll see the request flow in Terminal 1 and the response in Terminal 2.

---

## ⚠️ CRITICAL: CLI Limitations

**The Vercel CLI `logs` command only shows LIVE logs, not historical data.**

❌ **Won't work:** "Show me logs from 30 minutes ago"
✅ **Will work:** "Monitor new requests as they happen"

**For historical errors → Use Vercel Dashboard (link above)**

---

## 📊 What Normal Logs Look Like

```
[14:24:07] [INFO] [ANALYZE] Request started at 2026-01-21T19:24:07.917Z
[14:24:07] [INFO] [ANALYZE] Calling Anthropic API (attempt 1/2)...
[14:24:29] [INFO] [ANALYZE] Received response from API in 21456ms (21.5s)
[14:24:29] [INFO] [ANALYZE] Request completed successfully in 22123ms (22.1s)
```

**Key metrics:**
- Claude API time: 15-30s is normal
- Total request: 18-35s is normal
- If > 60s, investigate performance issue

---

## 🐛 Common Issues

### "Failed to fetch" on first try, works on refresh

**Status:** ✅ Fixed in v1.4.1

- **Cause:** Cold start + API latency exceeded 30s timeout
- **Fix:** Increased timeout to 90s + added retry logic
- **Verify:** Check logs for `Request completed successfully in XXXms`

### "vercel logs" command hangs

**This is normal!** It's waiting for traffic.

**Solutions:**
1. Trigger test request: `node test-production-api.js`
2. Wait for real user traffic
3. Use Vercel Dashboard for historical data instead

### Can't authenticate with Vercel CLI

```bash
vercel login
vercel link --yes
```

---

## 📈 Performance Benchmarks

| Metric | Normal Range | Investigate If |
|--------|--------------|----------------|
| Cold Start | 2-5s | > 10s |
| Claude API | 15-30s | > 45s |
| Total Request | 18-35s | > 60s |
| Success Rate | > 95% | < 90% |

---

## 🔗 Quick Links

- **Dashboard:** https://vercel.com/dashboard
- **Production App:** https://smarter-premed.vercel.app/
- **Full Guide:** [docs/MONITORING.md](docs/MONITORING.md)
- **Changelog:** [docs/CHANGELOG.md](docs/CHANGELOG.md) → v1.4.1

---

**Remember:** Start with the Dashboard for historical issues, use CLI for real-time monitoring.
