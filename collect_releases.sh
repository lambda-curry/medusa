#!/bin/bash

# Script to collect Medusa release notes from v2.0.0 to v2.8.5

echo "Collecting Medusa release notes from GitHub API..."

# Create output file
echo "[]" > medusa_releases_raw_data.json

# Get all releases and filter for v2.x.x versions
curl -s "https://api.github.com/repos/medusajs/medusa/releases?per_page=100" | \
jq '[.[] | select(.tag_name | test("^v2\\.[0-8]\\.[0-9]+$")) | {
  version: .tag_name,
  name: .name,
  published_at: .published_at,
  body: .body,
  html_url: .html_url,
  prerelease: .prerelease,
  draft: .draft
}] | sort_by(.version | ltrimstr("v") | split(".") | map(tonumber))' > medusa_releases_raw_data.json

echo "Release data collected successfully!"

# Show summary
echo -e "\nCollected releases:"
jq -r '.[] | "\(.version) - \(.published_at[:10]) - \(.name)"' medusa_releases_raw_data.json

# Count releases
count=$(jq length medusa_releases_raw_data.json)
echo -e "\nTotal releases collected: $count"

