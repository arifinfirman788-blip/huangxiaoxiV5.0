with open('/Users/chenyinbing/Desktop/项目/huangxiaoxiv4.0/src/pages/TripList.tsx', 'r') as f:
    content = f.read()

content = content.replace('\\n', '\n')

with open('/Users/chenyinbing/Desktop/项目/huangxiaoxiv4.0/src/pages/TripList.tsx', 'w') as f:
    f.write(content)
