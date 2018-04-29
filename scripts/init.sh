SCRIPTDIR=$(dirname "$0")
cd $SCRIPTDIR
cd ..
BASEPATH=$(pwd)

echo "Set env"
cp ../private/.env .env

echo "Building containers"
docker build -t lcfumes/comunipsum.prod:latest .

echo "Start containers"
docker run -it -d -p 8000:8000 lcfumes/comunipsum.prod:1.0 bash -c "npm run serve"
