#!/bin/bash

################################################################################
#	                               CompteurLignes                                #
################################################################################

Workspace=`find / -type d -name OnlyForCloude9 2> /dev/null | grep OnlyForCloude9 -m 1`

find -name '*.csv' > $Workspace/tmp/excludeFiles
find -name '*.dat' >> $Workspace/tmp/excludeFiles
find -name '*.iml' >> $Workspace/tmp/excludeFiles
find -name '*.log' >> $Workspace/tmp/excludeFiles
find -name '*.out' >> $Workspace/tmp/excludeFiles
find -name '*.pid' >> $Workspace/tmp/excludeFiles
find -name '*.seed' >> $Workspace/tmp/excludeFiles
find -name '*.swo' >> $Workspace/tmp/excludeFiles
find -name '*.swp' >> $Workspace/tmp/excludeFiles
find -name '*.tgz' >> $Workspace/tmp/excludeFiles
find -name '*.idea' >> $Workspace/tmp/excludeFiles
find -name '*.ns' >> $Workspace/tmp/excludeFiles
find -name '*.0' >> $Workspace/tmp/excludeFiles
find -name '*.pdf' >> $Workspace/tmp/excludeFiles
find -name '*.psd' >> $Workspace/tmp/excludeFiles
find -name '*.png' >> $Workspace/tmp/excludeFiles
find -name '*.PNG' >> $Workspace/tmp/excludeFiles
find -name '*.gif' >> $Workspace/tmp/excludeFiles
find -name '*.GIF' >> $Workspace/tmp/excludeFiles
find -name '*.jpg' >> $Workspace/tmp/excludeFiles
find -name '*.JPG' >> $Workspace/tmp/excludeFiles
find -name '*.jpeg' >> $Workspace/tmp/excludeFiles
find -name '*.JPEG' >> $Workspace/tmp/excludeFiles
find -name '*.conf' >> $Workspace/tmp/excludeFiles
find -name '*.sh' >> $Workspace/tmp/excludeFiles
find -name '*.pem' >> $Workspace/tmp/excludeFiles
find -name '*.md' >> $Workspace/tmp/excludeFiles
find -name '.*' >> $Workspace/tmp/excludeFiles
find -name 'certbot-auto' >> $Workspace/tmp/excludeFiles
find -name 'LICENSE' >> $Workspace/tmp/excludeFiles

TOTAL=$(IFS='
'; { for i in $(find . -type f); do if ! echo "$i" | fgrep -q -f $Workspace/tmp/excludeFiles; then cat "$i"; echo '
'; fi; done } | wc -l)


echo "Nombre de ligne de code du projet:" $TOTAL
# Fin du programme