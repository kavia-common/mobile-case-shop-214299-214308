#!/bin/bash
cd /home/kavia/workspace/code-generation/mobile-case-shop-214299-214308/frontend_reactjs
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

