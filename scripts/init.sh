SCRIPTDIR=$(dirname "$0")
cd $SCRIPTDIR
cd ..
BASEPATH=$(pwd)

echo "Set env"
cp ../private/.env .env

echo "Building containers"
docker build -t lcfumes/comunipsum.prod:latest .

echo "Start containers"

