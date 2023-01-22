# Projet AAW : Zoo management website
Projet Gestion d'un Zoo pour le module AAW - [Université de Poitiers](https://www.univ-poitiers.fr) 2022

Ce projet a été réalisé par :
* ROUANE Anis
* BENDAHOU Ahlam
* MAHMAT SEID Ahmat
* ADNANE Laanani

Technologies utilisés :
* ReactJS v18.12 + Vite 
* Redux
* Sass
* Nodejs 18.12.1
* Postgresql 15

## Configuration et mise en place ##

Afin de lancer le projet sans problème il faut d'abord avoir :
* [Nodejs](https://nodejs.org/en/) v18.12.1 
* [Postgresql](https://www.postgresql.org/download/) 15 + pgAdmin 4
* [Vite](https://vitejs.dev)
* [yarn](https://yarnpkg.com)

### Installation des dépendences ###
Clonnez le projet avec : `git clone https://github.com/ZaPuncakeu/zoo-management.git` \
Puis déplacez vous dans à l'intérieur du projet : `cd zoo-management` \
Enfin installez les dépendances : `yarn install`\
Configurez le fichier `.env` avec les informations necessaires (**NE CHANGEZ PAS LA VALEUR `PORT`**)

### Lancement du projet ###
Pour lancer le projet (client + serveur) 2 commandes sont disponibles :
* Si il s'agit de votre premier lancement de l'appli, exécutez la commande : `yarn init-and-start` qui va initialiser la BDD + les tables.
* Sinon exécutez la commande : `yarn start` si la BDD est déjà configurée.
