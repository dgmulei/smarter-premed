#!/bin/bash

echo "Testing production API endpoint..."
echo ""

# Test with a simple health check (this will fail but shows if route exists)
curl -X POST https://smarter-premed.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"responses":{}}' \
  -v 2>&1 | grep -E "(HTTP|< )"

echo ""
echo "If you see HTTP 400 or 500, the route exists but has an error"
echo "If you see HTTP 404, the route is not deployed"
echo "If you see 'Could not resolve host', there's a DNS/network issue"
