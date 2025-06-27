#!/usr/bin/env python3
"""
Script to analyze and classify Medusa release notes
"""

import json
import re
from collections import defaultdict, Counter
from datetime import datetime

# Classification categories
CATEGORIES = {
    'features': {
        'keywords': ['feat', 'feature', 'new', 'add', 'introduce', 'support for', 'enable'],
        'patterns': [r'feat\(.*?\):', r'feature:', r'new.*?:', r'add.*?:', r'introduce.*?:'],
        'description': 'New features and enhancements'
    },
    'bug_fixes': {
        'keywords': ['fix', 'bug', 'resolve', 'patch', 'correct', 'repair'],
        'patterns': [r'fix\(.*?\):', r'bug.*?:', r'resolve.*?:', r'patch.*?:'],
        'description': 'Bug fixes and corrections'
    },
    'breaking_changes': {
        'keywords': ['breaking', 'breaking change', 'BREAKING', 'migration required'],
        'patterns': [r'breaking.*?:', r'BREAKING.*?:', r'migration.*?required'],
        'description': 'Breaking changes requiring migration'
    },
    'security': {
        'keywords': ['security', 'vulnerability', 'CVE', 'exploit', 'auth', 'authentication'],
        'patterns': [r'security.*?:', r'vulnerability.*?:', r'CVE-.*?:', r'auth.*?:'],
        'description': 'Security fixes and improvements'
    },
    'performance': {
        'keywords': ['performance', 'optimize', 'speed', 'faster', 'improve', 'efficiency'],
        'patterns': [r'perf\(.*?\):', r'performance.*?:', r'optimize.*?:', r'speed.*?:'],
        'description': 'Performance improvements and optimizations'
    },
    'documentation': {
        'keywords': ['docs', 'documentation', 'readme', 'guide', 'tutorial'],
        'patterns': [r'docs\(.*?\):', r'documentation.*?:', r'readme.*?:', r'guide.*?:'],
        'description': 'Documentation updates and improvements'
    },
    'dependencies': {
        'keywords': ['dependency', 'dependencies', 'upgrade', 'update', 'bump', 'version'],
        'patterns': [r'deps\(.*?\):', r'dependency.*?:', r'upgrade.*?:', r'bump.*?:'],
        'description': 'Dependency updates and version bumps'
    },
    'api_changes': {
        'keywords': ['API', 'endpoint', 'route', 'REST', 'GraphQL', 'schema'],
        'patterns': [r'api\(.*?\):', r'endpoint.*?:', r'route.*?:', r'schema.*?:'],
        'description': 'API changes and endpoint modifications'
    },
    'admin_dashboard': {
        'keywords': ['admin', 'dashboard', 'UI', 'interface', 'frontend'],
        'patterns': [r'admin\(.*?\):', r'dashboard\(.*?\):', r'ui\(.*?\):'],
        'description': 'Admin dashboard and UI improvements'
    },
    'workflow_engine': {
        'keywords': ['workflow', 'orchestration', 'step', 'flow', 'process'],
        'patterns': [r'workflow\(.*?\):', r'orchestration.*?:', r'step.*?:', r'flow.*?:'],
        'description': 'Workflow engine and orchestration changes'
    },
    'modules': {
        'keywords': ['module', 'service', 'provider', 'plugin'],
        'patterns': [r'module\(.*?\):', r'service\(.*?\):', r'provider\(.*?\):'],
        'description': 'Module and service updates'
    },
    'chores': {
        'keywords': ['chore', 'refactor', 'cleanup', 'maintenance', 'internal'],
        'patterns': [r'chore\(.*?\):', r'refactor\(.*?\):', r'cleanup.*?:', r'maintenance.*?:'],
        'description': 'Maintenance and internal improvements'
    }
}

def load_release_data():
    """Load release data from JSON file"""
    with open('medusa_releases_raw_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_changes_from_body(body):
    """Extract individual changes from release body"""
    if not body:
        return []
    
    changes = []
    
    # Split by common section headers
    sections = re.split(r'\n#+\s*(Features?|Bugs?|Bug Fixes?|Documentation|Chores?|Security|Performance|Breaking Changes?|API Changes?|Other Changes?|Highlights?)\s*\n', body, flags=re.IGNORECASE)
    
    current_section = "general"
    for i, section in enumerate(sections):
        if i % 2 == 1:  # Section headers
            current_section = section.lower().strip()
            continue
        
        # Extract bullet points and PR references
        lines = section.split('\n')
        for line in lines:
            line = line.strip()
            if line.startswith('*') or line.startswith('-') or line.startswith('•'):
                # Clean up the line
                change = line[1:].strip()
                if change and len(change) > 10:  # Filter out very short entries
                    changes.append({
                        'text': change,
                        'section': current_section,
                        'raw_line': line
                    })
    
    return changes

def classify_change(change_text, section=""):
    """Classify a single change based on keywords and patterns"""
    text_lower = change_text.lower()
    section_lower = section.lower()
    
    scores = defaultdict(int)
    
    # Check section-based classification first
    section_mapping = {
        'features': 'features',
        'feature': 'features',
        'bugs': 'bug_fixes',
        'bug fixes': 'bug_fixes',
        'bug': 'bug_fixes',
        'documentation': 'documentation',
        'docs': 'documentation',
        'chores': 'chores',
        'chore': 'chores',
        'security': 'security',
        'performance': 'performance',
        'breaking changes': 'breaking_changes',
        'api changes': 'api_changes',
        'highlights': 'features'  # Highlights usually contain major features
    }
    
    if section_lower in section_mapping:
        scores[section_mapping[section_lower]] += 3
    
    # Check patterns and keywords
    for category, config in CATEGORIES.items():
        # Pattern matching (higher weight)
        for pattern in config['patterns']:
            if re.search(pattern, text_lower):
                scores[category] += 2
        
        # Keyword matching
        for keyword in config['keywords']:
            if keyword in text_lower:
                scores[category] += 1
    
    # Return the category with highest score, or 'other' if no match
    if scores:
        return max(scores.items(), key=lambda x: x[1])[0]
    return 'other'

def analyze_releases():
    """Main analysis function"""
    releases = load_release_data()
    
    analysis_results = {
        'summary': {
            'total_releases': len(releases),
            'date_range': {
                'start': releases[0]['published_at'][:10] if releases else None,
                'end': releases[-1]['published_at'][:10] if releases else None
            },
            'version_range': {
                'start': releases[0]['version'] if releases else None,
                'end': releases[-1]['version'] if releases else None
            }
        },
        'releases': [],
        'category_stats': defaultdict(int),
        'trends': {
            'releases_per_month': defaultdict(int),
            'categories_per_month': defaultdict(lambda: defaultdict(int))
        }
    }
    
    print(f"Analyzing {len(releases)} releases...")
    
    for release in releases:
        print(f"Processing {release['version']}...")
        
        # Extract changes from release body
        changes = extract_changes_from_body(release['body'])
        
        # Classify each change
        classified_changes = []
        category_counts = defaultdict(int)
        
        for change in changes:
            category = classify_change(change['text'], change['section'])
            classified_changes.append({
                'text': change['text'],
                'category': category,
                'section': change['section']
            })
            category_counts[category] += 1
            analysis_results['category_stats'][category] += 1
        
        # Extract date info for trends
        date = datetime.fromisoformat(release['published_at'].replace('Z', '+00:00'))
        month_key = date.strftime('%Y-%m')
        analysis_results['trends']['releases_per_month'][month_key] += 1
        
        for category, count in category_counts.items():
            analysis_results['trends']['categories_per_month'][month_key][category] += count
        
        # Store release analysis
        release_analysis = {
            'version': release['version'],
            'name': release['name'],
            'published_at': release['published_at'],
            'date': date.strftime('%Y-%m-%d'),
            'total_changes': len(classified_changes),
            'changes': classified_changes,
            'category_summary': dict(category_counts),
            'html_url': release['html_url']
        }
        
        analysis_results['releases'].append(release_analysis)
    
    return analysis_results

def generate_summary_stats(analysis):
    """Generate summary statistics"""
    stats = {
        'total_changes': sum(analysis['category_stats'].values()),
        'categories': dict(analysis['category_stats']),
        'top_categories': sorted(analysis['category_stats'].items(), key=lambda x: x[1], reverse=True)[:5],
        'release_frequency': {
            'total_releases': analysis['summary']['total_releases'],
            'avg_per_month': len(analysis['trends']['releases_per_month']) / max(len(analysis['trends']['releases_per_month']), 1)
        }
    }
    return stats

def main():
    print("Starting Medusa release analysis...")
    
    # Perform analysis
    analysis = analyze_releases()
    
    # Generate summary stats
    stats = generate_summary_stats(analysis)
    
    # Save detailed analysis
    with open('classified_changes.json', 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)
    
    # Save summary stats
    with open('analysis_summary.json', 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    
    print(f"\nAnalysis complete!")
    print(f"Total releases analyzed: {analysis['summary']['total_releases']}")
    print(f"Total changes classified: {stats['total_changes']}")
    print(f"Date range: {analysis['summary']['date_range']['start']} to {analysis['summary']['date_range']['end']}")
    print(f"Version range: {analysis['summary']['version_range']['start']} to {analysis['summary']['version_range']['end']}")
    
    print(f"\nTop categories:")
    for category, count in stats['top_categories']:
        percentage = (count / stats['total_changes']) * 100
        print(f"  {category}: {count} ({percentage:.1f}%)")
    
    print(f"\nFiles generated:")
    print(f"  - classified_changes.json (detailed analysis)")
    print(f"  - analysis_summary.json (summary statistics)")

if __name__ == "__main__":
    main()

