# Compte rendu

  Au cours de ce test j'eu à être confronté à diverses diffcultées et à les surmonter.

## Prise en main du projet

  Tout d'abord après reception du projet j'ai eu à  l'installer et effectuer diverses configuration pour assurer son fonctionnement.

### Installation
  J'ai d'abord procédé à la création de la base de donnée Mysql.
  Ensuite du coté backend j'ai procédé à l'installation des dépendances avec yarn, j'ai du mettre à jour ma version de node car 
  celle-ci n'était pas compatible avec la version des dépendances du projet, je suis donc passé à la version 22 qui est LTS.
  Ensuite j'ai changé l'url de connection de la base au niveau de la base pour l'API et lancé les migrations, lorsque celles-ci 
  sont passées j'ai renseigné quelques enregistrement dans la base de données afin de réaliser quelques tests.
  J'ai après testé l'endpoint permettant de récupérer l'ensemble des tâches. L'API étant connecté à la base de donnée je l'ai donc 
  connecté avec le front, pour cela j'ai lancé la commande `npm run start` pour démarrer le front.

## Implémentation des fonctionnalitées

### Suppression des tâches

  Pour la suppression des tâches j'ai tout simplement connecté le bouton de suppression à l'API. 
  Au niveau du bouton j'ai implémenté une fonction qui lorsqu'on clique sur le bouton fait appel à 
  une fonction prenant en paramètre l'identifiant de la tâche et ensuite grâce au hook `useFetch()` 
  j'ai appelé la methode **delete** de celle-ci permettant d'envoyer une requête vers l'API pour 
  supprimer la tâche. Après la suppression j'ai utilisé le hook `useUiToast()` pour pouvoir afficher
  des petites notification permettant d'informer l'utilisateur sur l'action qu'il vient d'effectuer.


### Modification ou ajout d'une tâche

  Pour la mise à jour des tâches j'ai suivi le mode d'implémentation de la récupération de l'ensemble des tâches.
  Dans la classe **SaveTaskUseCase** j'ai rajouté une méthode permettant de valider les données en entrée, dans 
  notre cas il s'agit du nom de la tâche celle-ci ne pouvant être vide j'ai réalisé une condition vérifiant si la 
  longueur du nom est supérieure à zéro. Dans la méthode `handle()` de la classe je fais appel à mon validateur et 
  si la validation est correcte j'envoie les données dans la méthode `save()` du repository.
  Dans la méthode `save()` du repository on enregitre alors la tâche en utisant l'ORM de **Prisma**, au sein de
  celle-ci on teste si les données contiennent un identifiant si oui, alors on met à jour la tâche en base sinon 
  on insère une nouvelle tâche en base.
  A ce niveau j'ai rencontré un problème concernant le type des données dans la méthode create et update de prisma,
  je mettais directement en paramètre les données sans préciser le type de celles-ci, en regardant les paramètres 
  en entrée je me suis rendu compte qu'il me fallait faire une assertion de type en fonction de l'opération à éffectuer.
  En effet, il y'a format de données en entrée correspondant à une insertion en base qui est `Prisma.TaskCreateInput`
  et celle correspondant à une mise à jour en base `Prisma.TaskUpdateInput`.
  J'ai été ensuite confronté à un bug lors du test de ces deux API, lorsque j'éffectuait des appels sur les endpoints
  d'insertion et de modification celles-ci me donnaient une réponse **201** pourtant aucune ressource n'étaient crée
  ni modifiée en base. J'ai donc essayé de passer en revue le code implémenté mais il n'y avait aucune erreur, j'ai donc 
  coupé l'API puis redémarré et tout est revenu à la normale.
  Pour la saisie des noms des tâches j'ai implémenté quelques un **"handler"** permettant de modifier le texte de celles-ci.


## Conclusion
  Malgré certaines diffulcultés rencontrées j'ai pu connecter le back-end et le front-end et finaliser les fonctionnalitées
  demandées. Ce test m'a permit de voir ma capacitée à m'adapter sur un petit projet en utilisant un framework back-end qui
  n'était pas de mon domaines de compétences. Néanmoins j'ai pu remarquer quelques similairitée avec SpringBoot dans la 
  structure et la logique d'implémentation des endpoints et le contrôleur.
