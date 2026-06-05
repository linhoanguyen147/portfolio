path = r'C:\Users\ADMIN\.gemini\antigravity\scratch\portfolio\index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Tìm dòng bắt đầu phần rác (task-meta sau dòng </div> trống)
# Phần rác bắt đầu từ dòng 777 (0-indexed: 776) - dòng <div class="task-meta">
# đến dòng kết thúc </section> của page 2

# Tìm marker đặc biệt: '<!-- ====== PAGE 3: TRANG TỔNG KẾT ====== -->'
page3_marker = '<!-- ====== PAGE 3: TRANG TỔNG KẾT ====== -->'

# Tìm vị trí của phần rác: sau dòng 775 (</div>) có dòng 777 bắt đầu bằng task-meta
# và kết thúc trước PAGE 3
relic_start = None
relic_end = None

for i, line in enumerate(lines):
    if i >= 774 and '<!-- ====== PAGE 3:' in line:
        relic_end = i
        break

# Phần rác bắt đầu ngay sau dòng 775 (closing </div> của tasks-container)
# tức là từ dòng 776 đến relic_end-1 là </section>
# Ta cần xóa từ dòng 776 đến relic_end-2 (để giữ </section>)

print(f"Page 3 found at line: {relic_end}")
print(f"Line at relic_end-2: {repr(lines[relic_end-2])}")
print(f"Line at relic_end-1: {repr(lines[relic_end-1])}")

# Xóa từ dòng 776 đến relic_end-2 (bỏ phần </section> trước đó vì đã có rồi)
# Giữ: lines[:775] + lines[relic_end-1:]  (dòng 775 là </div> đóng tasks-container)

new_lines = lines[:775] + ['  </section>\n\n'] + lines[relic_end:]
print(f"New total lines: {len(new_lines)}")

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("DONE: Removed duplicate old content.")
print("Lines 775 to relic_end cleaned up.")
