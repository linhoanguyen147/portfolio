path = r'C:\Users\ADMIN\.gemini\antigravity\scratch\portfolio\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Tìm section summary thứ hai (bị lặp)
# Sau </section> đầu tiên của summary, còn bị thêm phần hero cũ
# Tìm marker: đoạn page-hero bị lặp sau </section>

bad_start = '  </section>\n\n    \r\n    <div class="page-hero">'
good_end = '  <!-- Footer -->'

bad_idx = content.find(bad_start)
good_idx = content.find(good_end)

print(f"bad_start at: {bad_idx}")
print(f"good_end at: {good_idx}")

if bad_idx > 0 and good_idx > bad_idx:
    # Xóa phần dư, chỉ giữ </section> và tiếp theo là footer
    new_content = content[:bad_idx] + '\n  </section>\n\n  ' + content[good_idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("DONE: Removed duplicate summary hero.")
    lines = new_content.split('\n')
    print(f"New total lines: {len(lines)}")
else:
    # Thử tìm cách khác
    idx2 = content.find('</section>', bad_idx + 10) if bad_idx > 0 else -1
    print(f"Second </section> at: {idx2}")
    print(repr(content[bad_idx:bad_idx+300]))
