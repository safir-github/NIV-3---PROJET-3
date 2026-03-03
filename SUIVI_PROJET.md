# 📋 Suivi du Projet - API Port de Plaisance Russell

**Date de création :** 26 février 2026
**Statut actuel :** Phase 2 en cours (Authentification & Utilisateurs)
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

## 🚧 Phase 2 : Authentification & Utilisateurs - EN COURS

### 2.1 Modèle User ✅
**Fichier `models/user.js` créé :**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

**Champs du modèle User :**
- `name` (String, requis) - Nom de l'utilisateur
- `email` (String, requis, unique) - Email (unique, converti en minuscules)
- `password` (String, requis) - Mot de passe (sera hashé)

### 2.2 Service User - PARTIELLEMENT TERMINÉ ⏳

**Fichier `services/userService.js` créé avec :**

✅ **Fonction `getAllUsers` :**
```javascript
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};
```

✅ **Fonction `getUserById` :**
```javascript
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
};
```

**Fonctions restantes à créer :**
- ⏳ `createUser` - Créer un utilisateur
- ⏳ `updateUser` - Modifier un utilisateur
- ⏳ `deleteUser` - Supprimer un utilisateur
- ⏳ `authenticateUser` - Vérifier les identifiants (login)

### 2.3 Controller User - À FAIRE ❌
- ⏳ Créer `controllers/userController.js`
- ⏳ Implémenter les fonctions de gestion HTTP
- ⏳ Ne PAS utiliser de codes HTTP dans le service (séparation des préoccupations)

### 2.4 Routes User - À FAIRE ❌
- ⏳ Créer `routes/userRoutes.js`
- ⏳ Définir les routes :
  - `GET /users` - Lister tous les utilisateurs
  - `GET /users/:id` - Récupérer un utilisateur
  - `POST /users` - Créer un utilisateur
  - `PUT /users/:id` - Modifier un utilisateur
  - `DELETE /users/:id` - Supprimer un utilisateur
  - `POST /login` - Se connecter

### 2.5 Middleware d'authentification - À FAIRE ❌
- ⏳ Créer `middlewares/authMiddleware.js`
- ⏳ Vérifier la présence du token JWT dans les headers
- ⏳ Vérifier la validité du token
- ⏳ Protéger les routes privées

---

## 📋 Phases restantes à compléter

### Phase 3 : Catways (CRUD) ❌
- ⏳ Modèle Catway
- ⏳ Service Catway
- ⏳ Controller Catway
- ⏳ Routes Catway
  - `GET /catways`
  - `GET /catways/:id`
  - `POST /catways`
  - `PUT /catways/:id`
  - `PATCH /catways/:id`
  - `DELETE /catways/:id`

### Phase 4 : Réservations (Sous-ressource) ❌
- ⏳ Modèle Reservation
- ⏳ Service Reservation
- ⏳ Controller Reservation
- ⏳ Routes (s `/catways/:id/reservations`)
  - `GET /catways/:id/reservations`
  - `GET /catways/:id/reservations/:idReservation`
  - `POST /catways/:id/reservations`
  - `DELETE /catways/:id/reservations/:idReservation`

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

## 📝 RÉSUMÉ RAPIDE

**Fonctionnel :**
- ✅ Structure du projet
- ✅ Dépendances dans package.json
- ✅ Configuration MongoDB (.env, config/db.js)
- ✅ Serveur Express (app.js)
- ✅ Données JSON (catways, reservations)
- ✅ Modèle User (models/user.js)
- ✅ Service User partiel (services/userService.js)

**À faire immédiatement sur Mac :**
1. Installer Node.js si non présent
2. `npm install` pour installer les dépendances
3. Installer MongoDB Community Server
4. Installer MongoDB Compass
5. Importer les données dans MongoDB
6. Tester avec `node app.js`

**Suite du développement :**
1. Compléter le service User (createUser, updateUser, deleteUser, authenticateUser)
2. Créer le controller User
3. Créer les routes User
4. Créer le middleware d'authentification JWT
5. Continuer avec les catways et réservations

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
