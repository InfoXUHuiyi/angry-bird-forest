README

projet nom:
angry-bird-forest

lien de récupération de projet:
https://github.com/InfoXUHuiyi/angry-bird-forest.git

organisation:
M1 IFI
Université Nice Sophia Antipolis

menbre de groupe:
XU Huiyi
FU Jia
HE Jiang

----------------------------------------------------------------------------------------------------------------------------
REGLE DE JEU
Ce projet est un mini jeu, qui a une règle simple:
Vous avez 3 chances pour le cas initial, l'oiseau doit éviter de toucher les fleurs
et les bulles, sinon vous allez perdre une chance. Et l'oiseau doit toucher les cochons
pour gagner les points. chaque 10 points va augmenter un niveau, le niveau le plus haut
est le niveau 10.

Ce qui vous devez faire, c'est à utilser le clavier à contrôler le petit oiseau;
"espace" pour démarrer le jeu, "haut" "bas" "gauche" "droit" pour faire déplacer l'oiseau.

-----------------------------------------------------------------------------------------------------------------------------
ORGANISATION DE PROJET
Global, chaque menbre a leur propre partie à s'occuper, et nous faisons aussi quelques partie
ensemble.

XU Huiyi s'occupe la partie de l'oiseau, FU Jia s'occupe la partie de fleurs et bulles,
et HE Jiang s'occupe la partie de cochons.

Dans un premier temp, XU Huiyi a organisé une structure de jeu, en utilisant les techniques
html 5 et javascript 6. FU Jia fait les images afficher dans le canvas. HE Jiang insère les musiques.

Puis, XU Huiyi fait l'oiseau se déplacer, et aussi les tests de collision correspondent l'oiseau, 
par example la collision de l'oiseau avec les fleurs, les bulles, etc. Elle fait aussi le système de points, 
y compris les chances, les points gagnés de joueur, et le niveau de jeu.
FU Jia fait tous les fleurs et bulles se déplacer, ainsi le cycle de l'affichage sur les fleurs et 
les bulles. Elle fait aussi les fleurs dancer en fonction du son de font.
HE Jiang fait tous les cochons se déplacer ainsi que le cycle de l'affichage sur les cochons. Il fait
aussi les test de collision de cochons avec l'oiseau.

Ensuite, FU Jia et HE Jiang contrôle les musiques, par example, le son de font va jouer quand le jeu démarre, et
lorque l'oiseau est touché les fleurs et les cochons, les autres sons vont jouer.
FU Jia et XU Huiyi réalisent ensemble les évènement de clavier, FU Jia contrôle le "espace" pour démarrer
le jeu, XU Huiyi contrôle les "haut","bas","gauche" et "droit" pour déplacer l'oiseau.
HE Jiang et XU Huiyi contrôle les changement de l'oiseau et le niveau, lorsque le niveau change, l'oiseau va changer aussi.

Enfin, nous travaillons ensemble pour résoudre les bugs, et découper les codes dans plusieurs fichiers.
Par ailleur, le règle de jeu est pensé par nous ensemble, et nous avons aussi choisi ensemble les images
et les musiques.

-----------------------------------------------------------------------------------------------------------------------------
POINTS FORTS
Jolie interface de jeu;
Bonnes musiques;
Haute jouabilité; 
Facile à comprendre

-----------------------------------------------------------------------------------------------------------------------------
POINTS FAIBLES
faire les images se déplacer selon les rythmes de musique; 
test de compatibilité;

-----------------------------------------------------------------------------------------------------------------------------
DIFFICULTES RENCONTRES
La première fois, nous ne comprenons pas tout à fait la demande de projet, nous faisons donc une mauvais pratique.
Après avons consulté l'opinion de professeur, nous corrigeons notre projet dans un court délai.
En réalisant le projet, tous les éléments ne sont pas les graphiques réguliers, donc, il y a les petits bugs pour la collision.
Et lorsque nous essayons de faire les images se déplacer selon les rythmes de musique, il peut marcher sur certains navigateurs, 
comme Firefox, Safari, mais il va afficher les erreurs sur IE et Chrome.
