#!/bin/bash

echo "
--- Initalizing frontend..."
cd OpenCV-Playground
npm i

echo "
--- Initalizing server..."
cd ../server
npm i

echo "
--- Generating certificate..."
mkdir keys
cd keys
openssl req -x509 -newkey rsa:4096 -keyout client-key.pem -out client-cert.pem -days 365 -nodes
cd ../
