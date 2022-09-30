#!/bin/sh

set -e

npm run pre:start

exec "$@"
