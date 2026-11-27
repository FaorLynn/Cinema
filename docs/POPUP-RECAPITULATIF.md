# Pop-up 3 : récapitulatif

Composant Angular `RecapitulatifReservation`, raccordé au bouton Continuer
de la sélection des sièges. Il reçoit le film, la séance et les places sans
recharger le catalogue. Le nom du cinéma vient du GET existant `/api/cinema/{id}`.

Il affiche le film, le cinéma, la salle, la date, l’heure, le nombre de sièges
et leurs coordonnées. Le retour aux sièges préserve la sélection. Fermer
réinitialise le parcours. Le mode ADMIN ne peut pas entrer dans cette étape ;
le composant lui-même masque également le récapitulatif si utilisé directement.

Périmètre du ticket : affichage récapitulatif uniquement. Aucun achat, paiement
ou blocage de siège n’est effectué. Aucun POST, PUT ou DELETE n’est envoyé.
Le prix n’est pas inventé côté front : l’API de séance ne fournit actuellement
pas le tarif. La validation finale devra fournir un prix côté serveur et
réserver les sièges dans une transaction après contrôle des disponibilités.

Les nouveautés du main (gestion cinéma, espace équipe, programme des séances,
footer et favicon) sont conservées. Le récapitulatif n’enregistre aucun achat.
