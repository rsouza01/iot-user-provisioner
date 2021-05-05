#!/bin/bash
#
# env-secrets.sh - Utility for Encryption/Decryption of secret files in this particular env
#
# Author: Rodrigo Alvares de Souza <rsouza01@gmail.com>
#
# History:
# Version 0.1: 2021/05/05 (rsouza) - First version

#FUNCTIONS DEFINITIONS

print2stringslncolor () {
        echo -e "\e[0m$1\e[1;34m$2\e[0m\n"
}


print2stringslncolorERROR () {
        echo -e "\e[0m$1\e[1;91m$2\e[0m\n"
}

printlncolor () {
        echo -e "\e[1;34m$1\e[0m\n"
}

printlncolorERROR () {
        echo -e "\e[1;91m$1\e[0m\n"
}
#END FUNCTIONS DEFINITIONS

#MAIN PROGRAM
_VERSION=$(grep '^# Version ' "$0" | tail -1 | cut -d : -f 1 | tr -d \#)

USE_MESSAGE="
$(basename "$0") - Encryption/Decryption of secret files for a particular environment (${_VERSION})
=============================================================================

Usage: $(basename "$0")
"

# declare -a _SECRETS=("element1" "element2" "element3")

# Sanity checks
if [[ "$ENCRYPTION_KEY" = "" ]]
then    
    printlncolorERROR "No key set. Exiting..."
	echo "$USE_MESSAGE"
    exit -1
fi

declare -a _SECRETS=('f=(.secrets/.env.gpg .env)' 'f=(.secrets/.npmrc.gpg .npmrc)')

for elt in "${_SECRETS[@]}"
do 
    eval $elt

    echo "Decrypting ${f[0]}..."
    ./bin/handle-secret.sh -d -f ${f[0]}
    echo "Moving ${f[0]}.decrypted to ${f[1]}..."
    mv ${f[0]}.decrypted ${f[1]}
    echo "Done."

done

# if [ "$_OPERATION" = "encrypt" ]; then
#     printlncolor "Encrypting..."
#     gpg --symmetric --batch --passphrase "$_KEY" --cipher-algo AES256 ${_SECRET_FILE}
#     exit 0
# elif [ "$_OPERATION" = "decrypt" ]; then
#     printlncolor "Decrypting..."
#     gpg --quiet --batch --yes --decrypt --passphrase="$_KEY" --output ${_SECRET_FILE}.decrypted ${_SECRET_FILE}
#     exit 0
# else
#     echo "$USE_MESSAGE"
#     printlncolorERROR "No operation set. Exiting..."
#     exit -1
# fi