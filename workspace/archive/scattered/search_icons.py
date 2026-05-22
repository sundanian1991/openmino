import sys, re
js = sys.stdin.read()

# Search for icon-related definitions
for i, line in enumerate(js.split('\n')):
    if 'icon' in line.lower() and ('svg' in line.lower() or 'path' in line.lower()):
        print(f'Line {i}: {line.strip()[:300]}')

# Search for image/icon file references
icon_refs = re.findall(r'["\x27]([^"\x27]*icon[^"\x27]*)["\x27]', js)
seen = set()
for ref in icon_refs:
    if ref not in seen:
        seen.add(ref)
        print(f'REF: {ref}')

# Check if SVG paths are embedded as path://
path_refs = re.findall(r'path://[A-Za-z0-9,.\-]+', js)
if path_refs:
    print(f'\nFound {len(path_refs)} SVG path definitions')
    for p in path_refs[:5]:
        print(p[:100])
