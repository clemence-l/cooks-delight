# Cooks Delight

Application web permettant de consulter, créer et gérer des recettes, avec un système d’authentification utilisateur.

---

## Fonctionnalités principales

* Homepage & settings gérés dans le CMS Sanity
* Grille de recettes dynamique via l’API express avec pagination
* Système de connexion / déconnexion
* middleware pour protéger les pages de dashboard
* middleware pour rediriger vers le dashboard un utilisateur déjà connecté
* Listing de livres de recettes gérés dans le CMS Sanity
* Interface responsive et composants réutilisables

---

## Convention de nommage des commits et des Pull Requests

Tout au long du projet, une convention de nommage claire a été utilisée pour les **commits** et les **Pull Requests**, afin de faciliter la compréhension de l’historique du projet.

### Commits

Les messages de commit sont principalement en anglais et suivent la structure suivante :

type(nom_de_la_feature) : description de la modification

#### Les types utilisés

* **feat** : ajout d’une fonctionnalité
  `feat(favorite) : add favorite logic`
* **fix** : correction d’un bug
  `fix(recipe) : fix recipe display on profile`
* **style** : modifications liées au style ou au CSS
  `style(card) : upgrade cards layout`

---

### Pull Requests

Les Pull Requests utilisent un titre explicite reprenant le type de modification principale :

type(nom_de_la_feature) : description des principales modification

Exemples :

* `feat(rating) : add rating logic and display on recipe page`
* `fix(favorite) : fix favorite loading on profile page`

---
