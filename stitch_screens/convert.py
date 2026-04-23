import os
import re

def html_to_jsx(html):
    # Basic replacements
    jsx = html.replace('class="', 'className="')
    jsx = jsx.replace('for="', 'htmlFor="')
    jsx = jsx.replace('<!--', '{/*')
    jsx = jsx.replace('-->', '*/}')
    
    # Self-close input and img tags
    jsx = re.sub(r'(<(input|img)[^>]*?)(?<!/)>', r'\1 />', jsx)
    
    # Self-close br and hr
    jsx = re.sub(r'(<(br|hr)[^>]*?)(?<!/)>', r'\1 />', jsx)
    
    # Replace style="..." with style={{...}}
    # This is complex, so we'll just remove or leave styles that don't break
    # Actually let's just leave inline styles or warn. None seen so far except in custom things.
    
    return jsx

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r') as f:
            content = f.read()
        
        # extract body content
        body_match = re.search(r'<body[^>]*>(.*)</body>', content, re.DOTALL)
        if body_match:
            body = body_match.group(1)
            jsx = html_to_jsx(body)
            with open(file.replace('.html', '.jsx'), 'w') as f:
                f.write(jsx)

