#!/bin/bash

echo "
--- Generating static files..."
cd OpenCV-Playground
npm run build

echo "
--- Starting Server..."
cd ../server/
npm run serve
