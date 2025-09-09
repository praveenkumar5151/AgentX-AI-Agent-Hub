#!/bin/bash
set -e

echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps --no-audit --no-fund

echo "Building the application..."
npm run build