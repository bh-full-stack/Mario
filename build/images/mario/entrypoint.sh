#!/usr/bin/env bash

npm install

sed -i "s/apiUrl: \".*\"/apiUrl: \"http:\/\/${API_HOST}:${API_OUTER_PORT}\/api\/\"/g" ./node_modules/leaderboardsdk/modal-window.js

service nginx start
tail -f /var/log/nginx/error.log