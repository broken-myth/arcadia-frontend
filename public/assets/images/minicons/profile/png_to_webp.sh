#!/bin/bash

# This script converts png images to webp format

# select all the png files in current directory and recursively in subdirectories
for file in $(find . -name "*.png"); do
   # convert the png file to webp format
   cwebp "$file" -lossless -o "${file%.png}.webp"
done
