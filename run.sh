#!/bin/bash
NODE_ENV=production node_modules/.bin/webpack -p
NODE_ENV=production node_modules/.bin/babel-node --presets 'react,es2015' src/server.js
