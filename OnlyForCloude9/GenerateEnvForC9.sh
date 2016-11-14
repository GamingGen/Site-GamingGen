#!/bin/bash

################################################################################
#                               GenerateEnvForC9                               #
################################################################################


# Variables
Workspace=`find / -type d -name workspace 2> /dev/null | grep workspace -m 1`
DirNameScript=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
NameScript=`basename "$0"`
ShortNameScript=`echo $NameScript | cut -d'.' -f 1`
NOMCONF=$DirNameScript/$ShortNameScript".conf"


# Fonctions
log()
{
	# Variables locale
	local destination=$DirNameScript/$ShortNameScript".log"

	if [ "$2" = "First" ]
	then
		echo $1 > $destination 2>&1
		echo $1
	elif [ "$1" != "First" ] && [ "$1" != "\n" ] && [ "$1" != "Conf" ]
	then
		echo $1 >> $destination 2>&1
		echo $1
	elif [ "$1" = "\n" ]
	then
		echo "" >> $destination 2>&1
	fi
}

cadreLog()
{
	# Variables locale
	local nombreCaracteres="0"
	local first="No"
	local conf="No"
	local espaces=""
	local espacesI=""
	local tirets=""

	# Calcul du plus grand nombre de caractères
	for i in "$@"
	do
		if [ $nombreCaracteres -lt $(($(echo $i | wc -m) - 1)) ]
		then
			nombreCaracteres=$(($(echo $i | wc -m) - 1))
		fi
		if [ "$i" = "First" ]
		then
			first="First"
		fi
		if [ "$i" = "Conf" ]
		then
			conf="Conf"
		fi
	done
	
	# Génération & stockage du nombre de tirets
	tirets=$(printf "|%$(($nombreCaracteres + 4))s|\n" "" | sed s/' '/"-"/g)
	
	# Génération de l'entête
	if [ "$first" = "First" ]
	then
		log $tirets $first $conf
		first="No"
	else
		log "\n"
		log $tirets $first $conf
	fi
	
	for i in "$@"
	do
		if [ "$i" != "First" ] && [ "$i" != "Conf" ]
		then
			espaces=$(printf "%$(($(($nombreCaracteres + 3 - $(echo $i | wc -m)))/2))s\n" "" |  sed s/' '/'\xc2\xa0'/g)
			espacesI=$(printf "%$(($(($nombreCaracteres + 5 - $(echo $i | wc -m)))/2))s\n" "" |  sed s/' '/'\xc2\xa0'/g)

			if [ $(($(($nombreCaracteres + 3 - $(echo $i | wc -m))) % 2)) -eq 0 ]
			then
				log "|-$espaces$i$espaces-|" $conf
			else
				log "|-$espaces$i$espacesI-|" $conf
			fi
		fi
	done
	log $tirets $conf
	log "\n"
}

testDirectory()
{
	if [ ! -d "$1" ]
	then
		# Création du dossier
		mkdir $1
		chmod 777 $1
		
		log "Dosser: '$1' créer"
	else
		log "Dossier: '$1' déjà existant..."
	fi
}

testFile()
{
	if [ -f "$1" ]
	then
		echo "Ok"
		#log "Fichier: $1 existant"
	else
		echo "Ko"
		#log "Fichier: $1 non existant..."
	fi
}

lectureConf()
{
	if [ $# -eq 1 ]
	then
		# Vérification si le fichier de Conf est présent
		if [ "$(testFile $1)" != "Ok" ]
		then
			cadreLog "Bonjour bienvenue dans le fichier de configuration" "c'est ici qu'il faut remplir les informations" "pour pouvoir faire fonctionner ce programme" "" "Exemple:" "" "NomClient[1] --> RaspTest01" "IPClient[1] --> 192.168.0.31" "TypeClient (OS)[1] --> Raspbian" "NomClient[2] --> RaspTest05" "IPClient[2] --> 192.168.0.36" "TypeClient (OS)[2] --> RaspBMC" "Conf"

		else
			local i=0
			
			while read ligne
			do
				if [[ ! $ligne == *"|"* ]]
				then
					#echo "$i : $ligne"
					InfoConf[$i]=$ligne
					i=$((i + 1))
				fi
			done < $1
		fi
	fi
}

# Main

cadreLog "Demarage du scpipt $0" "`date '+%d/%m/%y %H:%M:%S'`" "First"
log "\n"

# Lecture du fichier de Conf
lectureConf $NOMCONF
NbrTest=${#InfoConf[*]}

# Deplacement de la console sur le bon dosser
cd $Workspace

# Vérification si le dosser de log est présent sur le Master
testDirectory "data"

# Deplacement de la console sur le bon dosser
cd $DirNameScript
cd ../

# Boucle permettan la vérification et la génération des fichiers pour la BDD
for ((j=0; $j < $NbrTest; j=$(($j + 2))))
do
	NameFile=${InfoConf[$j]}
	DataInFile=${InfoConf[$(($j + 1))]}
	
	if [ "$(testFile $NameFile)" != "Ok" ]
	then
	  log "Création du fichier $NameFile  :  $DataInFile"
	  #echo -e '# Only for Cloude9!\nmongod --dbpath=data --shutdown' > $NameFile
	  echo -e $DataInFile > $NameFile
	else
	  log "Ficher $NameFile déjà présent"
	fi
	
	log "Changement des droits pour $NameFile"
	chmod 744 $NameFile
done


cadreLog "Fin du scpipt $0" "`date '+%d/%m/%y %H:%M:%S'`"
# Fin du programme