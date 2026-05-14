import re

with open('diff.txt', 'r') as f:
    diff = f.read()

# We just want to see the new functions
import os
