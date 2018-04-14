SCRIPTDIR=$(dirname "$0")
cd $SCRIPTDIR
cd ..
BASEPATH=$(pwd)

echo "Set env"
set -a
source .env

echo "Building containers"
docker-compose build

echo "Start containers"
docker-compose up -d