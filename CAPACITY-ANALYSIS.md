# Capacity Analysis & Traffic Limits

**Last Updated:** January 21, 2026
**Current Deployment:** Vercel Pro + Anthropic Claude API (Sonnet 4.5)

---

## TL;DR - How Much Traffic Can We Handle?

**Short Answer:** Depends on your Anthropic API tier, not Vercel.

| Anthropic Tier | Max Concurrent Users | Monthly Spend Limit | Time to Reach Limit |
|----------------|---------------------|---------------------|---------------------|
| **Tier 1** | ~10-15 simultaneous | Varies | Minutes if viral |
| **Tier 2** | ~30-50 simultaneous | Varies | Hours if popular |
| **Tier 3** | ~80-120 simultaneous | Varies | Days with steady traffic |
| **Tier 4** | ~800-1000+ simultaneous | Varies | Weeks with high traffic |

**Bottom line:** You'll likely hit Anthropic rate limits before Vercel limits. For viral traffic, you need Tier 3+ ($40+ spent) or custom limits.

---

## Bottleneck #1: Anthropic API Rate Limits (PRIMARY CONSTRAINT)

### Rate Limit Structure

Anthropic uses a tiered system based on cumulative spend:

| Tier | Entry Requirement | Requests/Min (RPM) | Relative Capacity |
|------|-------------------|-------------------|-------------------|
| Tier 1 | $5 deposit | 50 RPM | Baseline (1x) |
| Tier 2 | $40 spent | ~150-200 RPM | 3-4x |
| Tier 3 | $200 spent | ~400 RPM | 8x |
| Tier 4 | $400+ spent | ~4,000 RPM | 80x |

**Important:** These are approximate based on Claude Sonnet 4.5 usage patterns. Actual limits vary by model and tier.

### What This Means for Your App

Each questionnaire submission makes **one API call** that takes ~20-25 seconds.

**Tier 1 (50 RPM):**
- Max: **0.83 requests/second**
- **~10-15 simultaneous users** (with 20-25s response time)
- **~50 users/hour** at steady rate
- **Will hit limit if:** Post goes viral on pre-med subreddit

**Tier 2 (~150 RPM):**
- Max: **2.5 requests/second**
- **~30-50 simultaneous users**
- **~150 users/hour**
- **Will hit limit if:** Featured on MedTwitter or SDN

**Tier 3 (~400 RPM):**
- Max: **6.7 requests/second**
- **~80-120 simultaneous users**
- **~400 users/hour**
- **Can handle:** Moderate viral spike, featured blog post

**Tier 4 (~4,000 RPM):**
- Max: **66.7 requests/second**
- **~800-1000+ simultaneous users**
- **~4,000 users/hour**
- **Can handle:** Major viral event, press coverage

### Calculating Your Current Tier

Check your tier in the [Claude Console](https://console.claude.ai/):
1. Go to **Settings** → **Limits**
2. Look for "Usage Tier" and current RPM limits
3. Check "Spend Limit" for monthly cap

### What Happens When You Hit Rate Limits

**User Experience:**
```
HTTP 429 Too Many Requests
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Please try again later."
}
```

**Our Current Handling:** ❌ Not gracefully handled yet

**Recommended Fix:** Add rate limit detection and user-friendly messaging (see recommendations below)

---

## Bottleneck #2: Vercel Serverless Functions (UNLIKELY CONSTRAINT)

### Vercel Pro Plan Limits

- **Concurrent Executions:** 30,000
- **Function Timeout:** 60 seconds (we use this)
- **Function Size:** 50 MB (we're ~588 KB ✅)

### Capacity Calculation

```
Max Requests/Second = Concurrent Executions / Average Response Time
                   = 30,000 / 25 seconds
                   = 1,200 requests/second
```

**Translation:** Vercel can handle **~1,200 requests/second** or **4.3 million requests/hour**.

**Reality:** You'll hit Anthropic rate limits long before Vercel limits. Even at Tier 4 (highest), you're at ~67 req/s, which is only 5.6% of Vercel's capacity.

---

## Real-World Scenarios

### Scenario 1: Reddit Post Goes Viral
**Traffic Pattern:** 0 → 200 users/minute for 30 minutes

| Tier | Outcome |
|------|---------|
| Tier 1 (50 RPM) | ❌ **Fails immediately** - First 50 users succeed, rest get errors |
| Tier 2 (150 RPM) | ⚠️ **Partial failure** - 150 users/min succeed, 50/min fail |
| Tier 3 (400 RPM) | ⚠️ **Mostly works** - 200 users/min (peak) < 400 RPM limit |
| Tier 4 (4000 RPM) | ✅ **Handles easily** |

**Estimated Cost (Tier 3):**
- 200 users/min × 30 min = 6,000 requests
- ~$0.015/request (Claude Sonnet 4.5, ~8K tokens)
- **Total: ~$90** for viral spike

---

### Scenario 2: Steady Growth (100 users/day)
**Traffic Pattern:** Even distribution over 12 hours

| Metric | Value |
|--------|-------|
| Users/hour | ~8-10 |
| Peak concurrent | 2-3 users |
| Required tier | **Tier 1 easily handles** |
| Monthly cost | ~$45 (100 users/day × 30 days × $0.015) |

---

### Scenario 3: Class Assignment (500 students use within 48 hours)
**Traffic Pattern:** Sporadic spikes, ~50 users/hour at peak

| Metric | Value |
|--------|-------|
| Peak hour | 50 users |
| Peak concurrent | 5-8 users |
| Required tier | **Tier 2** (150 RPM) |
| Total cost | ~$7.50 (500 × $0.015) |

---

## Cost Breakdown

### Per-Request Cost (Claude Sonnet 4.5)

Our typical request:
- **Input tokens:** ~2,000 (questionnaire + 400-line prompt)
- **Output tokens:** ~6,000 (profile + 5 cohort analyses)
- **Total:** ~8,000 tokens

**Pricing (as of Jan 2026):**
- Input: $3 per million tokens
- Output: $15 per million tokens

**Cost per request:**
```
Input:  2,000 tokens × $3/1M  = $0.006
Output: 6,000 tokens × $15/1M = $0.090
Total:                          $0.096 per request
```

**Monthly Spend by Traffic:**
| Daily Users | Monthly Requests | Monthly Cost |
|-------------|------------------|--------------|
| 10 | 300 | $28.80 |
| 50 | 1,500 | $144.00 |
| 100 | 3,000 | $288.00 |
| 500 | 15,000 | $1,440.00 |
| 1,000 | 30,000 | $2,880.00 |

---

## Monitoring Your Limits

### Check Current Tier & Usage

**Anthropic Console:**
1. Visit https://console.claude.ai/
2. Go to **Settings** → **Limits**
3. View:
   - Current tier
   - Requests per minute (RPM) limit
   - Spend limit for current month
   - Current month spend

**Real-time Monitoring:**
```bash
# Watch for rate limit errors
./monitor-logs.sh | grep -i "rate"
```

### Warning Signs You're Hitting Limits

**In Logs:**
```
HTTP 429 Too Many Requests
rate_limit_exceeded
```

**User Reports:**
- "Analysis failed" errors during peak times
- Works fine during off-hours, fails during peak

**Anthropic Console:**
- Usage bar near monthly limit
- "Tier upgrade available" notification

---

## Recommendations

### Immediate Actions

1. **Check your current tier**
   - Go to Claude Console → Settings → Limits
   - If Tier 1, expect issues with >50 users/hour

2. **Add rate limit handling** (not implemented yet)
   ```typescript
   // In app/api/analyze/route.ts
   if (error.status === 429) {
     return NextResponse.json({
       error: 'high_traffic',
       message: 'We\'re experiencing high traffic. Please try again in a few moments.',
       retryAfter: error.headers.get('retry-after')
     }, { status: 429 });
   }
   ```

3. **Add user-facing rate limit message**
   ```typescript
   // In app/results/page.tsx error handling
   if (err.message === 'high_traffic') {
     userMessage = 'Positioned is experiencing high traffic right now. Please wait 30 seconds and try again.';
   }
   ```

### Before Going Viral

1. **Upgrade to Tier 2+**
   - Spend $40 to unlock Tier 2 (~150 RPM)
   - Or $200 for Tier 3 (~400 RPM)
   - Can pre-deposit to increase tier

2. **Implement queue system** (if expecting sustained high traffic)
   - Use Vercel Queue or similar
   - Show "Position in queue: X" to users
   - Prevents rate limit errors

3. **Add caching** (advanced)
   - Cache similar profiles for instant results
   - Reduces API calls for common patterns
   - Requires database (Vercel KV or similar)

4. **Request custom limits**
   - Contact Anthropic for higher limits
   - Available for approved use cases
   - Can get 10-100x higher RPM

### Monitoring Setup

1. **Set up alerts**
   - Anthropic: Watch spend approaching tier limit
   - Vercel: Monitor function errors via Dashboard

2. **Track key metrics**
   - Requests per hour
   - Error rate (especially 429s)
   - Average response time

3. **Review weekly**
   - Check Anthropic spend vs tier limit
   - Identify peak usage times
   - Plan capacity for growth

---

## FAQ

### Q: How many concurrent users can we handle right now?

**A:** Depends on your Anthropic tier:
- **Tier 1:** ~10-15 simultaneous users
- **Tier 2:** ~30-50 simultaneous users
- **Tier 3:** ~80-120 simultaneous users
- **Tier 4:** ~800-1000+ simultaneous users

Check your tier at https://console.claude.ai/settings/limits

---

### Q: What happens if we go viral on Reddit?

**A:** If Tier 1/2, you'll start getting errors after the first 50-150 users. Users will see "Failed to analyze profile" and need to retry later.

**Fix:** Pre-emptively upgrade to Tier 3+ before expected viral events, or implement queue system.

---

### Q: How much will 1,000 users cost?

**A:** ~$96 (1,000 requests × $0.096/request)

This assumes typical usage (~8K tokens per request). Actual cost may vary ±20% based on response length.

---

### Q: Can we reduce costs?

**Yes, several options:**

1. **Use Claude Haiku** (faster, cheaper model)
   - Cost: ~$0.01/request (90% savings)
   - Trade-off: Slightly lower quality analysis

2. **Reduce prompt size**
   - Current: ~400 lines with examples
   - Could trim to ~200 lines (50% token savings)
   - Trade-off: Less consistent outputs

3. **Cache common profiles**
   - Store and reuse similar results
   - Requires database setup
   - Best for high-volume scenarios

4. **Implement tiered responses**
   - Free tier: Haiku model (cheap, fast)
   - Premium tier: Sonnet 4.5 (current quality)

---

### Q: Should we worry about Vercel limits?

**A:** No. Vercel can handle 1,200 req/s, but you'll hit Anthropic limits at ~67 req/s (Tier 4) or much lower (other tiers).

Vercel is not your constraint. Focus on Anthropic tier and rate limits.

---

## Sources

- [Vercel Functions Limitations](https://vercel.com/docs/functions/limitations)
- [Vercel Pro Plan Limits](https://vercel.com/docs/limits)
- [Anthropic Rate Limits Documentation](https://platform.claude.com/docs/en/api/rate-limits)
- [Claude API Quota Tiers Guide](https://www.aifreeapi.com/en/posts/claude-api-quota-tiers-limits)
- [Anthropic API Pricing 2026](https://www.nops.io/blog/anthropic-api-pricing/)

---

**Next Steps:**
1. Check your current Anthropic tier
2. Estimate expected traffic
3. Upgrade tier if needed before viral events
4. Implement rate limit handling (see recommendations)
