#!/usr/bin/env python3
"""
Script to collect Medusa release notes from v2.0.0 to v2.8.5
"""

import requests
import json
import re
import time
from datetime import datetime

def get_release_data():
    """Fetch all releases from GitHub API"""
    url = "https://api.github.com/repos/medusajs/medusa/releases"
    all_releases = []
    page = 1
    
    while True:
        response = requests.get(f"{url}?per_page=100&page={page}")
        if response.status_code != 200:
            print(f"Error fetching releases: {response.status_code}")
            break
            
        releases = response.json()
        if not releases:
            break
            
        all_releases.extend(releases)
        page += 1
        time.sleep(0.1)  # Be nice to the API
    
    return all_releases

def filter_target_versions(releases):
    """Filter releases to only include v2.0.0 to v2.8.5"""
    target_releases = []
    
    for release in releases:
        tag = release['tag_name']
        
        # Match v2.x.x pattern (excluding preview and rc versions)
        if re.match(r'^v2\.[0-8]\.\d+$', tag):
            # Parse version numbers for proper filtering
            version_parts = tag[1:].split('.')  # Remove 'v' prefix
            major, minor, patch = map(int, version_parts)
            
            # Include v2.0.0 through v2.8.5
            if (major == 2 and 
                ((minor == 0 and patch >= 0) or 
                 (minor >= 1 and minor <= 7) or 
                 (minor == 8 and patch <= 5))):
                target_releases.append(release)
    
    # Sort by version (newest first from API, so reverse for chronological order)
    target_releases.sort(key=lambda x: [int(i) for i in x['tag_name'][1:].split('.')])
    
    return target_releases

def extract_release_info(release):
    """Extract relevant information from a release"""
    return {
        'version': release['tag_name'],
        'name': release['name'],
        'published_at': release['published_at'],
        'body': release['body'],
        'html_url': release['html_url'],
        'prerelease': release['prerelease'],
        'draft': release['draft']
    }

def main():
    print("Collecting Medusa release notes from v2.0.0 to v2.8.5...")
    
    # Fetch all releases
    print("Fetching releases from GitHub API...")
    all_releases = get_release_data()
    print(f"Found {len(all_releases)} total releases")
    
    # Filter to target versions
    target_releases = filter_target_versions(all_releases)
    print(f"Filtered to {len(target_releases)} target releases")
    
    # Extract relevant information
    release_data = []
    for release in target_releases:
        release_info = extract_release_info(release)
        release_data.append(release_info)
        print(f"Collected: {release_info['version']} - {release_info['name']}")
    
    # Save to JSON file
    with open('medusa_releases_raw_data.json', 'w', encoding='utf-8') as f:
        json.dump(release_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nSaved {len(release_data)} releases to medusa_releases_raw_data.json")
    
    # Print summary
    print("\nVersion Summary:")
    for release in release_data:
        date = datetime.fromisoformat(release['published_at'].replace('Z', '+00:00'))
        print(f"  {release['version']:10} - {date.strftime('%Y-%m-%d')} - {release['name']}")

if __name__ == "__main__":
    main()

