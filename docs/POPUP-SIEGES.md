# Pop-up 2 : choix des sièges

Composant de sélection des sièges, raccordé au choix des séances.

## Essayer

Dans le front, ouvrir À l’affiche, cliquer sur Réserver puis choisir une séance.
Les sièges appartiennent à la salle de cette séance. Les places occupées sont
hachurées et désactivées. Un utilisateur peut sélectionner plusieurs places,
les désélectionner et revenir au choix de la séance. Un administrateur peut
uniquement consulter le plan.

Le composant `ChoisirPlaces` reçoit une séance et émet les places choisies.
Le parent `TableauFilmComponent` conserve cette sélection pour la future
confirmation. Continuer affiche un état de préparation explicite : cette étape
ne crée aucun achat et ne bloque pas de place en base.

## Contrats existants et suite

Les disponibilités utilisent actuellement les GET `/api/place` et
`/api/detailAchat`, filtrés dans le composant par salle et séance. Aucun POST,
PUT ou DELETE n’est envoyé. Si une lecture échoue, aucune place ne peut être
sélectionnée. Un changement de séance efface la sélection précédente.

Pour une intégration finale, prévoir un endpoint limité aux disponibilités de
la séance (sans charger tous les détails d’achat), puis raccorder la pop-up 3.
La réservation devra vérifier côté serveur le rôle, l’utilisateur, le prix,
l’appartenance des places à la salle et leur disponibilité au moment de
l’enregistrement, dans une transaction. La vue admin désactivée ici est une
règle d’interface, pas une autorisation serveur.

## Vérification

Compilation de production et tests ciblés du composant : filtrage salle/séance,
multisélection, désélection, admin en consultation, erreur et nouvelle séance.
