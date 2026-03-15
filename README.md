# ⚠️ IMPORTANT - À LIRE AVANT TOUTE CHOSE

**Ce projet a été réalisé personnellement par l'étudiant, avec l'assistance d'une intelligence artificielle dans un rôle de mentorat.**

L'IA n'a PAS réalisé le projet à ma place. Au contraire :
- J'ai pris le temps de comprendre la structure du projet (plusieurs journées de travail)
- J'ai étudié et compris chaque fonction, chaque script
- L'IA m'a guidé, expliqué, corrigé quand je faisais des erreurs
- C'est MOI qui ai codé, testé, déployé et compris le projet

Si j'avais demandé à l'IA de faire le projet, elle l'aurait fait en quelques minutes. Mais j'ai choisi d'apprendre et de comprendre, ce qui a pris du temps mais m'a permis de réellement acquérir les compétences.

Ce projet représente MON travail et MON apprentissage.

---

# ⚓ Port de Plaisance Russell - API REST

Application web de gestion des réservations de catways pour le port de plaisance Russell.

## 🌐 Application en production

**URL de l'application hébergée :** https://niv-3-projet-3.onrender.com

**Repository GitHub :** https://github.com/safir-github/NIV-3---PROJET-3

---

## 📋 Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Accès à l'application](#accès à-lapplication)
- [Comptes de test](#comptes-de-test)
- [Documentation API](#documentation-api)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)

---

## 🔧 Installation

```bash
npm install
```

---

## ⚙️ Configuration

1. **Créer un fichier `.env`** à la racine du projet :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/russell
JWT_SECRET=0b6487059a24384b7ddf32bf33ebfb39bfc63db8bd2dd30020232e1fd4e119ba
```

2. **Pour la production** (Render) :
   - Utiliser MongoDB Atlas pour `MONGO_URI`
   - La variable `PORT` est automatiquement définie par Render

---

## 🚀 Démarrage

### En local

```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

### En production

L'application est automatiquement déployée sur Render : https://niv-3-projet-3.onrender.com

---

## 🌐 Accès à l'application

### Application en production (Recommandé)

- **Page de connexion** : https://niv-3-projet-3.onrender.com/index.html
- **Dashboard** : https://niv-3-projet-3.onrender.com/dashboard.html
- **Liste des catways** : https://niv-3-projet-3.onrender.com/catways.html
- **Liste des réservations** : https://niv-3-projet-3.onrender.com/reservations.html
- **Documentation API** : https://niv-3-projet-3.onrender.com/documentation.html

### En local (après démarrage du serveur)

- **Page de connexion** : http://localhost:3000/index.html
- **Dashboard** : http://localhost:3000/dashboard.html (après connexion)

---

## 👤 Comptes de test

### Compte de test pré-configuré

Vous pouvez créer votre propre compte via l'interface ou l'API :

```bash
curl -X POST https://niv-3-projet-3.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Votre Nom",
    "email": "votre@email.com",
    "password": "VotreMotDePasse123!"
  }'
```

Ou utiliser le formulaire de création sur : https://niv-3-projet-3.onrender.com/index.html

### Se connecter

Une fois le compte créé, connectez-vous sur : https://niv-3-projet-3.onrender.com/index.html

---

## 📚 Documentation API

La documentation JSDoc complète est disponible dans le dossier `/docs`.

Pour générer la documentation :

```bash
npm run doc
```

Puis ouvrez `docs/index.html` dans votre navigateur.

Ou consultez la documentation en ligne : https://niv-3-projet-3.onrender.com/documentation.html

---

## ✅ Tests

Pour lancer les tests unitaires :

```bash
npm test
```

**Résultats :**
- 25 tests qui passent ✅
- Couverture : Catways, Users, Réservations
- Framework : Mocha + Chai + mongodb-memory-server

---

## 📁 Structure du projet

```
├── config/           # Configuration MongoDB
├── controllers/      # Contrôleurs (gestion HTTP)
├── middlewares/      # Middlewares (authentification)
├── models/          # Modèles Mongoose
├── public/          # Front-end (HTML, CSS, JS)
│   ├── css/        # Styles
│   ├── js/         # JavaScript client
│   ├── index.html  # Page de connexion
│   ├── dashboard.html  # Dashboard principal
│   ├── catways.html    # Liste des catways
│   ├── catway-details.html  # Détails d'un catway
│   ├── reservations.html    # Liste des réservations
│   ├── reservation-details.html  # Détails d'une réservation
│   └── documentation.html  # Documentation API
├── routes/          # Routes Express
├── services/        # Logique métier
├── scripts/         # Scripts utilitaires
├── test/            # Tests unitaires
└── docs/            # Documentation JSDoc générée
```

---

## 🔐 Authentification

L'API utilise **JSON Web Tokens (JWT)** pour l'authentification.

- Les routes publiques : `POST /api/users`, `POST /api/login`
- Les routes privées : toutes les autres (nécessitent un token)

### Exemple d'utilisation

1. Créer un compte ou se connecter
2. Récupérer le token JWT
3. Inclure le token dans les requêtes :

```bash
curl -X GET https://niv-3-projet-3.onrender.com/api/catways \
  -H "Authorization: Bearer VOTRE_TOKEN_ICI"
```

---

## 🛣️ Routes principales

### Catways

- `GET /api/catways` - Liste tous les catways
- `GET /api/catways/:id` - Récupère un catway
- `POST /api/catways` - Crée un catway
- `PUT /api/catways/:id` - Modifie un catway
- `PATCH /api/catways/:id` - Modifie partiellement un catway
- `DELETE /api/catways/:id` - Supprime un catway

### Réservations (sous-ressource)

- `GET /api/catways/:catwayNumber/reservations` - Liste des réservations d'un catway
- `POST /api/catways/:catwayNumber/reservations` - Crée une réservation
- `DELETE /api/reservations/:id` - Supprime une réservation
- `GET /api/reservations/:id` - Récupère une réservation par ID

### Utilisateurs

- `GET /api/users` - Liste tous les utilisateurs
- `POST /api/users` - Crée un utilisateur (publique)
- `POST /api/login` - Connexion (publique)

---

## 💻 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB / Mongoose** - Base de données NoSQL
- **JWT** - Authentification
- **HTML5 / CSS3 / JavaScript** - Front-end (vanilla, pas de framework)
- **Mocha / Chai** - Tests unitaires
- **JSDoc** - Documentation du code
- **Render** - Hébergement cloud

---

## 📝 Fonctionnalités implémentées

### ✅ Backend (API REST)

- CRUD complet pour Catways
- CRUD complet pour Utilisateurs
- CRUD complet pour Réservations
- Authentification JWT
- 25 tests unitaires qui passent
- Documentation JSDoc complète

### ✅ Front-end

- Page de connexion / déconnexion
- Dashboard avec gestion CRUD
- Création de Catways, Utilisateurs, Réservations
- Modification d'Utilisateurs et Catways
- Suppression de toutes les ressources
- Visualisation des détails par ID
- 4 pages HTML séparées (catways, catway-details, reservations, reservation-details)
- Formulaires de recherche par ID
- Interface responsive et moderne

---

## 🎯 Pour l'évaluateur

Pour tester rapidement le projet :

1. **Allez sur** : https://niv-3-projet-3.onrender.com
2. **Créez un compte** via le formulaire ou l'API
3. **Connectez-vous** et accédez au dashboard
4. **Testez les fonctionnalités CRUD** : création, modification, suppression
5. **Explorez les pages séparées** : catways.html, reservations.html
6. **Consultez la documentation** : documentation.html

Toutes les fonctionnalités sont opérationnelles en production ! 🚀
