import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'C:\Users\ADMIN\.gemini\antigravity\scratch\portfolio\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Thay task-content của từng task bằng nút link đến file gốc
task_files = {
    'task1': ('nv1.docx', '📄', 'nv1.docx', 'Word Document'),
    'task2': ('nv2.docx', '📄', 'nv2.docx', 'Word Document'),
    'task3': ('nv3.docx', '📄', 'nv3.docx', 'Word Document'),
    'task4': ('nv4.pdf',  '📕', 'nv4.pdf',  'PDF Document'),
    'task5': ('nv5.pdf',  '📕', 'nv5.pdf',  'PDF Document'),
    'task6': ('nv6.pdf',  '📕', 'nv6.pdf',  'PDF Document'),
}

def make_file_block(task_id, filename, icon, display_name, filetype):
    return f'''        <div class="task-content">
          <div class="file-download-block">
            <div class="fd-icon">{icon}</div>
            <div class="fd-info">
              <div class="fd-name">{display_name}</div>
              <div class="fd-type">{filetype}</div>
            </div>
            <a class="fd-btn" href="{filename}" target="_blank" rel="noopener">
              <span>Mở file</span>
              <span class="fd-arrow">↗</span>
            </a>
          </div>
        </div>'''

# Tìm và thay từng task-content block
for task_id, (filename, icon, display_name, filetype) in task_files.items():
    # Pattern: tìm <div class="task-content"> ... </div> trong task panel id="taskN"
    # Dùng phương pháp tìm vị trí thủ công
    
    panel_marker = f'id="{task_id}"'
    panel_start = content.find(panel_marker)
    if panel_start == -1:
        print(f"WARNING: {task_id} not found!")
        continue
    
    # Tìm task-content sau panel_start
    tc_start = content.find('<div class="task-content">', panel_start)
    if tc_start == -1:
        print(f"WARNING: task-content not found for {task_id}!")
        continue
    
    # Tìm closing </div> của task-content (đếm div)
    pos = tc_start + len('<div class="task-content">')
    depth = 1
    while depth > 0 and pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div>', pos)
        if next_close == -1:
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                tc_end = next_close + len('</div>')
            pos = next_close + 6
    
    old_tc = content[tc_start:tc_end]
    new_tc = make_file_block(task_id, filename, icon, display_name, filetype)
    content = content[:tc_start] + new_tc + content[tc_end:]
    print(f"✅ {task_id}: replaced task-content with link to {filename}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

lines = content.split('\n')
print(f"\nDone. Total lines: {len(lines)}")
