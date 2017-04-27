#!/bin/bash

################################################################################
#	                               CompteurLignes                                #
################################################################################

Workspace=`find / -type d -name OnlyForCloude9 2> /dev/null | grep OnlyForCloude9 -m 1`
PathExcludeFiles="tmp/excludeFiles"

find -name '.c9' > $Workspace/$PathExcludeFiles
find -name '.git' >> $Workspace/$PathExcludeFiles
find -name 'adminMongo' >> $Workspace/$PathExcludeFiles
find -name 'client' >> $Workspace/$PathExcludeFiles
find -name 'dump' >> $Workspace/$PathExcludeFiles
find -name 'docs' >> $Workspace/$PathExcludeFiles
find -name 'OnlyForCloude9' >> $Workspace/$PathExcludeFiles
find -name 'OnlyForVisualCode' >> $Workspace/$PathExcludeFiles
find -name '*.csv' >> $Workspace/$PathExcludeFiles
find -name '*.dat' >> $Workspace/$PathExcludeFiles
find -name '*.iml' >> $Workspace/$PathExcludeFiles
find -name '*.log' >> $Workspace/$PathExcludeFiles
find -name '*.out' >> $Workspace/$PathExcludeFiles
find -name '*.pid' >> $Workspace/$PathExcludeFiles
find -name '*.seed' >> $Workspace/$PathExcludeFiles
find -name '*.swo' >> $Workspace/$PathExcludeFiles
find -name '*.swp' >> $Workspace/$PathExcludeFiles
find -name '*.tgz' >> $Workspace/$PathExcludeFiles
find -name '*.idea' >> $Workspace/$PathExcludeFiles
find -name '*.ns' >> $Workspace/$PathExcludeFiles
find -name '*.0' >> $Workspace/$PathExcludeFiles
find -name '*.pdf' >> $Workspace/$PathExcludeFiles
find -name '*.psd' >> $Workspace/$PathExcludeFiles
find -name '*.png' >> $Workspace/$PathExcludeFiles
find -name '*.PNG' >> $Workspace/$PathExcludeFiles
find -name '*.gif' >> $Workspace/$PathExcludeFiles
find -name '*.GIF' >> $Workspace/$PathExcludeFiles
find -name '*.jpg' >> $Workspace/$PathExcludeFiles
find -name '*.JPG' >> $Workspace/$PathExcludeFiles
find -name '*.jpeg' >> $Workspace/$PathExcludeFiles
find -name '*.JPEG' >> $Workspace/$PathExcludeFiles
find -name '*.conf' >> $Workspace/$PathExcludeFiles
find -name '*.sh' >> $Workspace/$PathExcludeFiles
find -name '*.pem' >> $Workspace/$PathExcludeFiles
find -name '*.md' >> $Workspace/$PathExcludeFiles
find -name 'certbot-auto' >> $Workspace/$PathExcludeFiles
find -name 'LICENSE' >> $Workspace/$PathExcludeFiles
# find -name '.*' >> $Workspace/$PathExcludeFiles

TOTAL=$(IFS='
'; { for i in $(find . -type f); do if ! echo "$i" | fgrep -q -f $Workspace/$PathExcludeFiles; then cat "$i"; echo '
'; fi; done } | wc -l)


echo "Nombre de ligne de code du projet:" $TOTAL
# Fin du programme