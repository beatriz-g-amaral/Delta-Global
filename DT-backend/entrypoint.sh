#!/bin/bash

echo "Aguardando o banco de dados..."
sleep 10 

php spark migrate --all

php spark db:seed MainSeeder

php spark serve --host 0.0.0.0