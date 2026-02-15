#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "---
title: WIP
description:
pubDate: $(date -u +%Y-%m-%dT%H:%M:%SZ)
slug: $(date +%Y)/slugify-wip
---
" > "$SCRIPT_DIR/src/content/writing/$(date +%F)-wip.md"

code "$SCRIPT_DIR/src/content/writing/$(date +%F)-wip.md"

echo 'Writing post created'
