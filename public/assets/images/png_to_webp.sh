#!/bin/bash

# This script converts all PNG files in the current directory to WebP format.
# It requires the cwebp utility to be installed.
echo "Converting PNG files to WebP format..."
for f in *.png; do
   cwebp "$f" -o -lossless "${f%.png}.webp"
   echo "Converted $f to ${f%.png}.webp"
done
