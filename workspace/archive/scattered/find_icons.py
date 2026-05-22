import sys
html = sys.stdin.read()

# Find the Vue app JS bundle
import re
scripts = re.findall(r'src="([^"]*\.js[^"]*)"', html)
for s in scripts:
    print(s)

# Check for icon references
icons = re.findall(r'"([^"]*icon[^"]*)"', html)
for i in icons:
    print('ICON:', i)
