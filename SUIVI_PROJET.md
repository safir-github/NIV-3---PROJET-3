# 📋 Suivi du Projet - API Port de Plaisance Russell

**Date de création :** 26 février 2026
**Dernière mise à jour :** 10 mars 2026
**Statut actuel :** Phase 4 TERMINÉE (Backend 100% complet)
**Plateforme précédente :** Windows
**Plateforme actuelle :** Mac

---

## 🎯 Objectif du Projet

Créer une API REST pour le Port de Plaisance Russell permettant de gérer :
- Les catways (emplacements pour bateaux)
- Les réservations de catways
- Les utilisateurs de la capitainerie
- L'authentification via JWT

---

## ✅ Phase 1 : Initialisation & Environnement - TERMINÉE

### 1.1 Initialisation du projet ✅
- ✅ `npm init` effectué
- ✅ Fichier `package.json` créé
- ✅ Git initialisé avec `.gitignore`
- ✅ Structure des dossiers créée

**Arborescence du projet :**
```
niv3 - projet 3/
├── config/          # Configuration (BDD, etc.)
├── controllers/     # Gestion des requêtes/réponses HTTP
├── docs/           # Documentation générée
├── middlewares/    # Middlewares (auth, etc.)
├── models/         # Modèles Mongoose
├── routes/         # Routes Express
├── services/       # Logique métier
├── test/           # Tests unitaires
├── node_modules/   # Dépendances
├── .env            # Variables d'environnement
├── .gitignore      # Fichiers ignorés par Git
├── app.js          # Point d'entrée de l'application
├── catways.json    # Données initiales (catways)
├── reservations.json # Données initiales (réservations)
└── package.json    # Dépendances du projet
```

### 1.2 Dépendances installées ✅

**Dépendances de production :**
```bash
npm install express mongoose dotenv bcrypt jsonwebtoken cors
```

**Dépendances de développement :**
```bash
npm install -D nodemon mocha chai jsdoc
```

**Liste complète des paquets :**
- `express` (5.2.1) - Framework web
- `mongoose` (9.1.3) - ODM MongoDB
- `dotenv` (17.2.3) - Gestion des variables d'environnement
- `bcrypt` (6.0.0) - Hashage des mots de passe
- `jsonwebtoken` (9.0.3) - Génération de tokens JWT
- `cors` (2.8.5) - Gestion CORS
- `nodemon` (3.1.11) - Redémarrage auto du serveur
- `mocha` (11.7.5) - Framework de tests
- `chai` (6.2.2) - Librairie d'assertions
- `jsdoc` (4.0.5) - Génération de documentation

### 1.3 Configuration de la base de données ✅

**Fichier `.env` créé avec les variables suivantes :**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/russell
JWT_SECRET=0b6487059a24384b7ddf32bf33ebfb39bfc63db8bd2dd30020232e1fd4e119ba
```

**Fichier `config/db.js` créé :**
- Fonction `connectDB()` pour se connecter à MongoDB
- Gestion des erreurs de connexion
- Messages de confirmation dans la console

**Fichier `app.js` créé :**
- Import de dotenv, express, et la connexion BDD
- Middleware `express.json()` pour parser le JSON
- Route de test sur `/` (page d'accueil)
- Serveur démarré sur le port 3000
- Connexion à MongoDB automatique au démarrage

**Lancement du serveur :**
```bash
node app.js
```

**Résultat attendu :**
```
✅ MongoDB connecté
🚀 Serveur démarré sur http://localhost:3000
```

### 1.4 Données initiales ✅

**Fichier `catways.json` créé avec 5 catways :**
```json
[
  {
    "catwayNumber": 1,
    "type": "long",
    "catwayState": "En bon état, réparations récentes"
  },
  {
    "catwayNumber": 2,
    "type": "short",
    "catwayState": "Disponible"
  },
  {
    "catwayNumber": 3,
    "type": "long",
    "catwayState": "Indisponible"
  },
  {
    "catwayNumber": 4,
    "type": "short",
    "catwayState": "Satisfaisant"
  },
  {
    "catwayNumber": 5,
    "type": "long",
    "catwayState": "Disponible partiellement"
  }
]
```

**Fichier `reservations.json` créé avec 5 réservations :**
```json
[
  {
    "catwayNumber": 1,
    "clientName": "Pierre Dupont",
    "boatName": "L'Aigle des Mers",
    "checkIn": "2024-06-15T09:00:00Z",
    "checkOut": "2024-06-22T17:00:00Z"
  },
  {
    "catwayNumber": 2,
    "clientName": "Thomas Leroy",
    "boatName": "Le Dauphin Bleu",
    "checkIn": "2024-07-12T11:30:00Z",
    "checkOut": "2024-07-19T11:30:00Z"
  },
  {
    "catwayNumber": 3,
    "clientName": "Marc Bernard",
    "boatName": "L'Orque",
    "checkIn": "2024-08-05T08:00:00Z",
    "checkOut": "2024-08-12T16:00:00Z"
  },
  {
    "catwayNumber": 4,
    "clientName": "Luc Petit",
    "boatName": "Le Faucon Pèlerin",
    "checkIn": "2024-09-01T14:00:00Z",
    "checkOut": "2024-09-08T10:00:00Z"
  },
  {
    "catwayNumber": 5,
    "clientName": "Antoine Moreau",
    "boatName": "Le Requin",
    "checkIn": "2024-07-25T12:00:00Z",
    "checkOut": "2024-08-03T12:00:00Z"
  }
]
```

**Import effectué dans MongoDB via MongoDB Compass :**
- Collection `catways` créée avec 5 documents
- Collection `reservations` créée avec 5 documents
- Base de données : `russell`

---

## ✅ Phase 2 : Authentification & Utilisateurs - TERMINÉE

### 2.1 Modèle User ✅
**Fichier `models/user.js` créé :**
- name (String, requis, trim)
- email (String, requis, unique, lowercase)
- password (String, requis)

### 2.2 Service User ✅
**Fichier `services/userService.js` créé avec 6 fonctions :**
- ✅ `getAllUsers()` - Récupère tous les utilisateurs (SANS password)
- ✅ `getUserById(id)` - Récupère un utilisateur par ID (vérif existence, SANS password)
- ✅ `createUser(userData)` - Crée un utilisateur (hash password avec bcrypt, SANS password dans la réponse)
- ✅ `updateUser(id, userData)` - Modifie un utilisateur (hash password si fourni, SANS password dans la réponse)
- ✅ `deleteUser(id)` - Supprime un utilisateur (vérif existence)
- ✅ `authenticateUser(email, password)` - Vérifie identifiants (bcrypt.compare, message d'erreur générique, SANS password)

**Point clé SÉCURITÉ :** Toutes les fonctions suppriment le password avant de retourner (`toObject()` + `delete password`)

### 2.3 Controller User ✅
**Fichier `controllers/userController.js` créé avec 6 fonctions :**
- ✅ `getAllUsers(req, res)` → 200 ou 500
- ✅ `getUserById(req, res)` → 200 ou 404
- ✅ `createUser(req, res)` → 201 ou 500
- ✅ `updateUser(req, res)` → 200 ou 500
- ✅ `deleteUser(req, res)` → 200 ou 404
- ✅ `login(req, res)` → Génère token JWT avec `{ userId, exp: "24h" }`, renvoie `{ user, token }` → 200 ou 500

**Import important :** `const jwt = require("jsonwebtoken");` pour générer les tokens

### 2.4 Routes User ✅
**Fichier `routes/userRoutes.js` créé :**
- ✅ `GET /api/users` (protégé par authMiddleware)
- ✅ `GET /api/users/:id` (protégé)
- ✅ `POST /api/users` (PUBLIQUE - création de compte)
- ✅ `PUT /api/users/:id` (protégé)
- ✅ `DELETE /api/users/:id` (protégé)
- ✅ `POST /api/login` (PUBLIQUE - pour obtenir un token)

**Import dans `app.js` :** `app.use('/api', userRoutes);`

### 2.5 Middleware d'authentification JWT ✅
**Fichier `middlewares/authMiddleware.js` créé :**
- ✅ Récupère le token depuis `req.header("Authorization")` (enlève "Bearer ")
- ✅ Vérifie que le token existe → 401 si manquant
- ✅ Vérifie le token avec `jwt.verify(token, process.env.JWT_SECRET)`
- ✅ Extrait `userId` du token et l'ajoute à `req.userId`
- ✅ Appelle `next()` pour continuer vers le controller
- ✅ Gère les erreurs (token invalide/expiré) → 401

---

---

## ✅ Phase 3 : Catways (CRUD) - TERMINÉE

### 3.1 Modèle Catway ✅
**Fichier `models/catway.js` créé :**
- `catwayNumber` (Number, requis, unique) - Numéro unique du catway
- `type` (String, requis, enum: ['long', 'short']) - Type limité à ces 2 valeurs
- `catwayState` (String, requis) - État du catway

**Note :** Pas de password ou d'info sensible, donc pas de suppression de champs dans les réponses

### 3.2 Service Catway ✅
**Fichier `services/catwayService.js` créé avec 6 fonctions :**
- ✅ `getAllCatways()` - Retourne tous les catways directement
- ✅ `getCatwayById(id)` - Vérifie existence, retourne le catway
- ✅ `createCatway(catwayData)` - Crée un nouveau catway
- ✅ `updateCatway(id, catwayData)` - PUT complet (remplace tous les champs)
- ✅ `patchCatway(id, catwayData)` - PATCH partiel (modifie SEULEMENT les champs fournis avec `!== undefined`)
- ✅ `deleteCatway(id)` - Vérifie existence, supprime, retourne message

**Point clé PUT vs PATCH :**
- PUT = Remplace TOUS les champs (même si undefined)
- PATCH = Modifie SEULEMENT les champs fournis

### 3.3 Controller Catway ✅
**Fichier `controllers/catwayController.js` créé avec 6 fonctions :**
- Tous utilisent `req.params.id` et `req.body`
- Codes HTTP : 200 (succès), 201 (créé), 500 (erreur)

### 3.4 Routes Catway ✅
**Fichier `routes/catwayRoutes.js` créé :**
- ✅ `GET /api/catways`
- ✅ `GET /api/catways/:id`
- ✅ `POST /api/catways`
- ✅ `PUT /api/catways/:id`
- ✅ `PATCH /api/catways/:id` (route spéciale PATCH)
- ✅ `DELETE /api/catways/:id`

**Import dans `app.js` :** `app.use('/api', catwayRoutes);`

---

## ✅ Phase 4 : Réservations (Sous-ressource) - TERMINÉE

### 4.1 Modèle Reservation ✅
**Fichier `models/reservation.js` créé :**
- `catwayNumber` (Number, requis) - Relation avec le catway
- `clientName` (String, requis)
- `boatName` (String, requis)
- `checkIn` (Date, requis) - Date/heure d'arrivée (format ISO 8601)
- `checkOut` (Date, requis) - Date/heure de départ

**Note :** Les dates sont automatiquement converties par Mongoose en objets Date JavaScript

### 4.2 Service Reservation ✅
**Fichier `services/reservationService.js` créé avec 4 fonctions :**
- ✅ `getReservationsByCatway(catwayNumber)` - Filtre par `{ catwayNumber }`
- ✅ `getReservationById(id)` - Récupère par ID avec vérif existence
- ✅ `createReservation(reservationData)` - Crée une réservation
- ✅ `deleteReservation(id)` - Supprime avec vérif existence

**Pas de PUT/PATCH pour les réservations (simplification)**

### 4.3 Controller Reservation ✅
**Fichier `controllers/reservationController.js` créé avec 4 fonctions :**
- `getReservationsByCatway` : Utilise `parseInt(req.params.catwayNumber)` pour convertir le paramètre URL en Number
- `createReservation` : Ajoute `catwayNumber` depuis l'URL aux données avec spread operator `{ ...req.body, catwayNumber }`

### 4.4 Routes Réservation ✅
**Ajoutées dans `routes/catwayRoutes.js` (sous-ressource) :**
- ✅ `GET /api/catways/:catwayNumber/reservations` - Liste les réservations d'un catway
- ✅ `GET /api/catways/:catwayNumber/reservations/:id` - Récupère une réservation spécifique
- ✅ `POST /api/catways/:catwayNumber/reservations` - Crée une réservation pour ce catway
- ✅ `DELETE /api/catways/:catwayNumber/reservations/:id` - Supprime une réservation

**Import ajouté :** `const reservationController = require("../controllers/reservationController");`

---

## 📋 Phases restantes à compléter

### Phase 5 : Tests & Documentation ❌
- ⏳ Tests unitaires avec Mocha (9 fonctionnalités)
- ⏳ Documentation avec JSDoc
- ⏳ Script `npm test` fonctionnel

### Phase 6 : Front-end (Tableau de bord) ❌
- ⏳ Page d'accueil avec login
- ⏳ Dashboard utilisateur connecté
- ⏳ Formulaires CRUD pour utilisateurs, catways, réservations

### Phase 7 : Déploiement ❌
- ⏳ Déploiement sur plateforme cloud (Heroku, Render, etc.)
- ⏳ Configuration de production

---

## 🎓 MÉTHODOLOGIE DE TRAVAIL APPLIQUÉE

### Approche pédagogique (Rôle de Mentor)
**Règle principale :** L'utilisateur fait les manipulations lui-même pour apprendre. Le mentor guide et explique, mais n'exécute PAS les commandes à sa place (sauf demande expresse).

### Étapes pour chaque ressource (Users, Catways, Reservations)

**1. Modèle d'abord**
- Créer le schéma Mongoose avec tous les champs
- Définir les types, la validité (required, unique, enum)
- Exporter le modèle

**2. Service ensuite (logique métier)**
- Créer les fonctions async avec try/catch
- JAMAIS de req/res dans le service (séparation des préoccupations)
- JAMAIS de codes HTTP (200, 404, etc.) dans le service
- TOUJOURS retourner les données ou throw error
- Pour Users : supprimer le password avant de retourner (`toObject()` + `delete password`)
- Utiliser Mongoose : `find()`, `findById()`, `findByIdAndUpdate()`, `findOne()`, etc.
- Exporter toutes les fonctions

**3. Controller après (gestion HTTP)**
- Importer le service
- Créer les fonctions async avec (req, res)
- Récupérer `req.params.id` ou `req.params.catwayNumber`
- Récupérer `req.body` pour POST/PUT/PATCH
- Appeler les fonctions du service avec `await`
- Retourner les réponses avec codes HTTP appropriés :
  - 200 : Succès standard
  - 201 : Ressource créée (POST)
  - 404 : Non trouvé
  - 500 : Erreur serveur
- Exporter toutes les fonctions

**4. Routes ensuite**
- Importer express, router, controller
- Créer les routes avec : `router.MÉTHODE(url, controller.fonction)`
- PAS de parenthèses sur la fonction du controller
- Exporter le router

**5. Intégration dans app.js**
- Importer les routes
- Utiliser avec `app.use('/api', routes);`
- Redémarrer le serveur après modifications

**6. Tests avec curl**
- POST pour créer
- GET pour lister/récupérer
- PUT pour remplacer tout
- PATCH pour modifier partiellement
- DELETE pour supprimer

### Points clés à retenir

| Concept | Règle |
|---------|-------|
| **Service vs Controller** | Service = logique métier, Controller = HTTP |
| **Sécurité Users** | Hasher password, ne jamais le retourner |
| **PUT vs PATCH** | PUT remplace tout, PATCH modifie les champs fournis |
| **async/await** | Toujours utiliser avec MongoDB |
| **try/catch** | Toujours pour gérer les erreurs |
| **ObjectId MongoDB** | Les IDs sont des strings, pas des nombres |
| **enum** | Limite les valeurs possibles (ex: type de catway) |
| **Sous-ressource** | Routes imbriquées : `/catways/:id/reservations` |
| **parseInt()** | Convertir les paramètres URL (toujours string) en Number |
| **Spread operator** | `{ ...req.body, champAjouté }` pour fusionner |

### Structure des fichiers créés

```
models/
  user.js (3 champs)
  catway.js (3 champs avec enum)
  reservation.js (5 champs avec dates)

services/
  userService.js (6 fonctions, bcrypt pour password)
  catwayService.js (6 fonctions, avec PATCH)
  reservationService.js (4 fonctions, filtre par catwayNumber)

controllers/
  userController.js (6 fonctions, JWT pour login)
  catwayController.js (6 fonctions)
  reservationController.js (4 fonctions, avec parseInt)

routes/
  userRoutes.js (6 routes, authMiddleware pour protéger)
  catwayRoutes.js (6 routes catways + 4 routes réservations)

middlewares/
  authMiddleware.js (vérifie JWT, ajoute req.userId)
```

### Commandes utiles

```bash
# Démarrer le serveur
node app.js

# Redémarrer après modifications
pkill -f "node app.js" && node app.js

# Tester avec curl
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"...","password":"..."}'

# Vérifier si MongoDB tourne
lsof -i :27017
```

---

## 🔧 INSTRUCTIONS POUR MAC - INSTALLATION REQUISE

### 1️⃣ Vérifier/Installer Node.js et npm

**Vérifier les versions installées :**
```bash
node --version
npm --version
```

**Si non installés, télécharger :**
- Site officiel : https://nodejs.org/
- Installer la version LTS recommandée

### 2️⃣ Installer les dépendances du projet

**Se placer dans le dossier du projet :**
```bash
cd "chemin/vers/niv3 - projet 3"
```

**Installer toutes les dépendances :**
```bash
npm install
```

*Cette commande va lire le `package.json` et installer toutes les dépendances listées.*

### 3️⃣ Vérifier/Installer MongoDB

**Option A : MongoDB Community Server (recommandé)**

1. Télécharger pour Mac :
   - Site : https://www.mongodb.com/try/download/community
   - Choisir : macOS > Version > Package (tgz)

2. Installer et démarrer MongoDB :
   ```bash
   # Démarrer MongoDB
   brew services start mongodb-community
   # Ou si installé manuellement
   mongod --config /usr/local/etc/mongod.conf
   ```

**Option B : Via Homebrew (plus simple)**
```bash
# Installer Homebrew si non installé
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Démarrer MongoDB
brew services start mongodb-community
```

**Vérifier que MongoDB fonctionne :**
```bash
mongosh
# Ou si ancienne version
mongo
```

### 4️⃣ Vérifier/Installer MongoDB Compass (Interface graphique)

**Télécharger pour Mac :**
- Site : https://www.mongodb.com/try/download/compass
- Choisir : macOS > Version > Package (dmg)

**Installer :**
1. Ouvrir le fichier .dmg téléchargé
2. Glisser MongoDB Compass dans Applications
3. Lancer MongoDB Compass

### 5️⃣ Importer les données dans MongoDB

**Via MongoDB Compass (recommandé) :**

1. Ouvrir MongoDB Compass
2. Se connecter à : `mongodb://localhost:27017`
3. Créer la base de données `russell`
4. Créer la collection `catways`
5. Importer le fichier `catways.json`
6. Créer la collection `reservations`
7. Importer le fichier `reservations.json`

**Ou via la commande mongoimport :**
```bash
# Importer catways
mongoimport --jsonArray --db russell --collection catways --file catways.json

# Importer réservations
mongoimport --jsonArray --db russell --collection reservations --file reservations.json
```

### 6️⃣ Tester que tout fonctionne

**Lancer le serveur :**
```bash
node app.js
```

**Attendre les messages :**
```
✅ MongoDB connecté
🚀 Serveur démarré sur http://localhost:3000
```

**Tester dans le navigateur :**
- Ouvrir : http://localhost:3000
- Devrait voir : "Bienvenue sur l'API du Port de Plaisance Russell !"

---

## ⚠️ POINTS D'ATTENTION SPÉCIFIQUES MAC

### Sensibilité à la casse
- Sur Mac/Linux, les noms de fichiers SONT sensibles à la casse
- `models/User.js` ≠ `models/user.js`
- Vérifier les imports dans le code

### Variables d'environnement
- Le fichier `.env` doit exister à la racine
- Ne pas committer `.env` sur Git (déjà dans `.gitignore`)

### Ports
- Vérifier que le port 3000 n'est pas utilisé :
  ```bash
  lsof -i :3000
  ```
- Si utilisé, tuer le processus ou changer le PORT dans `.env`

### Firewall
- Autoriser Node.js et MongoDB dans les paramètres du pare-feu Mac si nécessaire

---

## 📝 RÉSUMÉ ACTUEL (Mise à jour : 10 mars 2026)

**Backend : ✅ 100% TERMINÉ**

**Fonctionnel :**
- ✅ Structure du projet complète
- ✅ Toutes les dépendances installées (express, mongoose, bcrypt, jsonwebtoken, mocha, chai, jsdoc, nodemon)
- ✅ Configuration MongoDB (.env avec JWT_SECRET, config/db.js)
- ✅ Serveur Express fonctionnel (app.js avec 3 routeurs)
- ✅ Données JSON importées (catways, reservations dans MongoDB)
- ✅ Modèles : User, Catway, Reservation
- ✅ Services : User (6 fonctions), Catway (6 fonctions), Reservation (4 fonctions)
- ✅ Controllers : User (6 fonctions avec JWT), Catway (6 fonctions), Reservation (4 fonctions)
- ✅ Routes : Users (6 routes protégées), Catways (6 routes), Réservations (4 routes sous-ressource)
- ✅ Middleware d'authentification JWT fonctionnel
- ✅ Toutes les routes API testées et fonctionnelles

**API Endpoints disponibles :**
```
Users (avec authentification) :
  POST /api/users (créer compte)
  POST /api/login (connexion, retourne token)
  GET /api/users (liste, avec token)
  GET /api/users/:id (avec token)
  PUT /api/users/:id (modifier, avec token)
  DELETE /api/users/:id (supprimer, avec token)

Catways (CRUD complet) :
  GET /api/catways (lister)
  GET /api/catways/:id (récupérer)
  POST /api/catways (créer)
  PUT /api/catways/:id (remplacer tout)
  PATCH /api/catways/:id (modifier partiellement)
  DELETE /api/catways/:id (supprimer)

Réservations (sous-ressource) :
  GET /api/catways/:catwayNumber/reservations (lister réservations d'un catway)
  GET /api/catways/:catwayNumber/reservations/:id (récupérer une réservation)
  POST /api/catways/:catwayNumber/reservations (créer une réservation)
  DELETE /api/catways/:catwayNumber/reservations/:id (supprimer une réservation)
```

**Progression du projet :**
```
✅ Phase 1 : Initialisation (100%)
✅ Phase 2 : Authentification & Users (100%)
✅ Phase 3 : Catways (100%)
✅ Phase 4 : Réservations (100%)
⏳ Phase 5 : Tests & Documentation (0%)
⏳ Phase 6 : Front-end (0%)
⏳ Phase 7 : Déploiement (0%)

PROGRESSION TOTALE : 60%
```

**À faire (prochaine étape - Phase 5) :**
1. ⏳ Créer des tests unitaires avec Mocha/Chai pour tester les 9 fonctionnalités
2. ⏳ Ajouter la documentation JSDoc dans le code
3. ⏳ Générer la documentation dans /docs
4. ⏳ Configurer le script `npm test`

**À faire ensuite (Phases 6-7) :**
- Front-end (Dashboard, formulaires CRUD, authentification)
- Déploiement en production (Heroku, Render, etc.)

---

## 🎯 Ce que vous avez appris (Points clés)

**Architecture MVC :**
- Séparation Modèle / Service / Controller / Routes
- Services = logique métier (pas de HTTP)
- Controllers = gestion HTTP (req, res, codes)
- Middlewares = authentification, logs, etc.

**Sécurité :**
- Hashage des passwords avec bcrypt
- Tokens JWT pour l'authentification
- Protection des routes avec middleware
- Suppression des passwords dans les réponses

**Base de données MongoDB :**
- Mongoose (ODM) pour modéliser les données
- Méthodes : find, findById, findByIdAndUpdate, findOne, save
- Types : String, Number, Date, enum
- Validations : required, unique, lowercase, trim

**API REST :**
- Méthodes HTTP : GET, POST, PUT, PATCH, DELETE
- Codes HTTP : 200, 201, 404, 401, 500
- Routes : /api/ressource/:id
- Sous-ressources : /api/catways/:id/reservations

**Async/await :**
- Utilisation systématique avec MongoDB
- Gestion des erreurs avec try/catch
- throw error pour propager les erreurs

**BON COURAGE POUR LA SUITE ! Vous êtes à 60% du projet ! 🚀**

---

## 🎯 CONSIGNES IMPORTANTES POUR LA SUITE

### Séparation des préoccupations (critique pour l'évaluation)
- **Services** : Pas de `req`, `res`, ni codes HTTP
- **Controllers** : Gèrent uniquement HTTP (req, res, status)
- **Models** : Uniquement la structure des données

### Sécurité
- Toujours hasher les mots de passe avec bcrypt
- Ne JAMAIS stocker de passwords en clair
- Utiliser JWT pour l'authentification
- Protéger les routes avec le middleware d'auth

### Tests
- Tester les 9 fonctionnalités demandées avec Mocha/Chai
- Le script `npm test` doit lancer les tests au démarrage

### Documentation
- Documenter le code avec JSDoc
- Générer la documentation dans le dossier `/docs`
- Inclure : Vue d'ensemble, Tutoriel, Exemples, Glossaire

---

**Fin du fichier de suivi - Bonne continuation sur Mac ! 🚀**
