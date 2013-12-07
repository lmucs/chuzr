#!/bin/bash
port=$1;
[ -z "$port" ] || python -m SimpleHTTPServer
python -m SimpleHTTPServer $port
