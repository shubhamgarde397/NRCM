import sys

print(sys.argv[1])

f = open(sys.argv[1], "r")
if f.mode == 'r':
    contents = f.read()
    print(contents)
