#!/bin/bash
port=$1;
[ -z "$port" ] || echo "Empty" || python -m SimpleHTTPServer
python -m SimpleHTTPServer $port