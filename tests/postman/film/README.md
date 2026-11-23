# Essais HTTP du CRUD Film

La collection vérifie le CRUD Film contre le backend démarré et sa base MySQL.
Ce sont des tests d’API avec persistance réelle, distincts des tests unitaires JUnit.
Aucun changement au code métier, à la sécurité ou à la configuration partagée.

## Depuis Postman

1. Démarrer MySQL et le backend Cinema.
2. Importer `Cinema-Film.postman_collection.json` dans Postman.
3. Vérifier la variable de collection `baseUrl` : `http://localhost:8080` par défaut.
4. Utiliser **Run collection**, conserver les neuf requêtes dans l’ordre et lancer une seule itération.
5. Consulter les assertions dans les résultats du Runner.

La collection crée un film dont le nom commence par `TEST-CRUD-FILM-` avec un
suffixe unique. Elle mémorise son ID automatiquement et supprime uniquement ce
film temporaire après l’avoir relu. Ne pas renseigner manuellement un ID existant.
Si une exécution est interrompue, son film temporaire peut rester en base :
identifier précisément le nom et l’ID dans les résultats avant de le nettoyer.
Ne pas lancer simultanément plusieurs exécutions de cette même collection.

| Étape | Requête | Vérification |
| --- | --- | --- |
| 01 | GET `/api/film` | HTTP 200, réponse sous forme de liste |
| 02 | POST `/api/film` | HTTP 200, ID généré et champs enregistrés |
| 03 | GET `/api/film/{id}` | ID et titre du film créé |
| 04 | GET `/api/film` | Film présent dans la liste |
| 05 | PUT `/api/film/{id}` | Même ID, nouveaux titre, synopsis et durée |
| 06 | GET `/api/film/{id}` | Modification persistée avant suppression |
| 07 | DELETE `/api/film/{id}` | HTTP 200, réponse vide |
| 08 | GET `/api/film/{id}` | HTTP 404 après suppression |
| 09 | GET `/api/film` | Film temporaire absent |

Les HTTP 200 pour POST et DELETE correspondent au contrôleur actuel : la
collection ne présume pas de statuts 201 ou 204 non implémentés.
Les essais ne couvrent pas encore les données invalides, la suppression d’un film
lié à des séances, les droits utilisateur ni les accès simultanés.

## Exécution de la même collection en ligne de commande

Avec Node.js/npm installés, depuis la racine du dépôt et sur une base de développement :

```sh
npm exec --yes --package=newman@6.2.1 -- newman run tests/postman/film/Cinema-Film.postman_collection.json --bail
```

Newman exécute la collection Postman v2.1 sans ouvrir l’interface graphique.
Documentation officielle : https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman/

## Quelques films fictifs pour le front

`films-demo.json` contient trois objets compatibles avec `CreateFilmRequest`.
Ils peuvent servir de corps JSON pour un POST manuel dans Postman.
Pour les ajouter automatiquement avec Node.js 18 minimum :

```sh
node tests/postman/film/seed-films.mjs
```

Autre adresse locale si nécessaire :

```sh
node tests/postman/film/seed-films.mjs http://localhost:8081
```

Le script vérifie d’abord les titres déjà présents. Il conserve ces entrées,
crée seulement les titres manquants et ne modifie ni ne supprime aucun film.
Exécuter une seule instance à la fois : ce n’est pas une contrainte d’unicité SQL.
Les trois titres sont : Au-delà de l’orbite, Dernier arrêt, soleil et La forêt des lucioles.
Ils ne sont pas associés automatiquement à des séances, cinémas ou places.

Chaque membre a sa base locale : le push des fichiers ne copie pas les données
MySQL sur les autres machines. Chacun peut lancer ce script sur sa propre base.

## Démarrage local

La configuration commune vise MySQL sur le port 3306, base `cinema`.
Pour MAMP sur le port 8889, passer uniquement une variable au lancement :

```sh
cd cinema-back
SPRING_DATASOURCE_URL='jdbc:mysql://127.0.0.1:8889/cinema' bash mvnw spring-boot:run
```

La base `cinema` doit déjà exister. Adapter les identifiants avec les variables
Spring habituelles si la configuration de sa machine est différente.
Aucun identifiant personnel ni fichier d’environnement n’est fourni ici.
