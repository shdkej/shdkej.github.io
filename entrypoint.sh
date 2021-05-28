if [ ! -e /app/node_modules ]
then
    ln -s /srv/node_modules /app/node_modules
fi
gatsby develop -H 0.0.0.0
