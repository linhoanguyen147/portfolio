path = r'C:\Users\ADMIN\.gemini\antigravity\scratch\portfolio\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
lines = content.split('\n')
print(f'Total lines: {len(lines)}')

markers = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'PAGE 3', 'TONG KET']
for m in markers:
    print(f'  "{m}": {content.count(m)} occurrences')
