# Plan de Réalisation - API Port de Plaisance Russell
*Conformité stricte avec le cahier des charges (consignes.pdf)*

## 🏁 Phase 1 : Initialisation & Environnement
Cette phase met en place les fondations techniques de l'application.

- [ ] **1.1 Initialisation**
   - [ ] `npm init -y`
   - [ ] `git init` + `.gitignore`
   - [ ] Installation dépendances : `express`, `mongoose`, `dotenv`, `bcrypt`, `jsonwebtoken` (Auth), `cors`.
   - [ ] Dev : `nodemon`, `mocha`, `chai`, `jsdoc`.

- [ ] **1.2 Architecture stricte (Séparation des préoccupations)**
   - [ ] Création dossiers :
     - `models/`
     - `services/` (⚠️ **CRITIQUE** : Pas de `req` ni `res` ici, pas de codes HTTP).
     - `controllers/` (Gestion des entrées/sorties HTTP).
     - `routes/`
     - `middlewares/`
     - `test/`
     - `docs/`

- [ ] **1.3 Configuration BDD**
   - [ ] Connection MongoDB (Mongoose) dans `config/db.js`.

- [ ] **1.4 Import des Données Initiales** (Requis)
   - [ ] Importer les fichiers fournis via console ou MongoDB Compass :
     - `mongoimport --jsonArray --db russell --collection catways --file catways.json`
     - `mongoimport --jsonArray --db russell --collection reservations --file reservations.json`

---

## 🔐 Phase 2 : Authentification & Utilisateurs
*Livrable : Système sécurisé avec JWT.*

- [ ] **2.1 Modèle User**
   - [ ] Définition : `name`, `email` (unique), `password` (hashé bcrypt).

- [ ] **2.2 Service & Controller User**
   - [ ] `add`, `getById`, `update`, `delete`.
   - [ ] `authenticate` (Login).
   - [ ] Routes : `/users` (CRUD protégé), `/login` (Public).

- [ ] **2.3 Middleware Auth**
   - [ ] Vérification du Token JWT entrante.

---

## ⚓ Phase 3 : Catways (CRUD)
*Ressource principale.*

- [ ] **3.1 Modèle Catway**
   - [ ] Définition : `catwayNumber` (Number), `type` ('long'/'short'), `catwayState` (String).

- [ ] **3.2 Routes API (Conformes PDF)**
   - [ ] `GET /catways` (Liste)
   - [ ] `GET /catways/:id` (Détail)
   - [ ] `POST /catways` (Création)
   - [ ] `PUT /catways/:id` (Remplacement total)
   - [ ] `PATCH /catways/:id` (Modification partielle - ex: état)
   - [ ] `DELETE /catways/:id` (Suppression)

- [ ] **3.3 Logique Métier**
   - [ ] Services découplés du HTTP.

---

## 📅 Phase 4 : Réservations (Sous-ressource)
*Gestion imbriquée dans les catways.*

- [ ] **4.1 Modèle Reservation**
   - [ ] Définition : `catwayNumber`, `clientName`, `boatName`, `checkIn`, `checkOut`.

- [ ] **4.2 Routes API (Conformes PDF)**
   - [ ] `GET /catways/:id/reservations` (Liste pour un catway)
   - [ ] `GET /catways/:id/reservations/:idReservation` (Détail)
   - [ ] `POST /catways/:id/reservations` (Ajout)
   - [ ] `DELETE /catways/:id/reservations/:idReservation` (Suppression)

---

## 🧪 Phase 5 : Tests & Documentation
*Barème : 6 points.*

- [ ] **5.1 Tests Unitaires (Mocha)**
   - [ ] Tester les **9 fonctionnalités** demandées (Créer catway, Lister, Détail, Modifier état, Supprimer catway, Réserver, Supprimer resa, Lister resa, Détail resa).
   - [ ] Script `npm test` qui lance les tests au démarrage.

- [ ] **5.2 Documentation (JSDoc)**
   - [ ] Générer la doc HTML dans `/docs`.
   - [ ] Sections : Vue d'ensemble, Tutoriel, Exemples, Glossaire.

---

## 🖥️ Phase 6 : Front-end (Tableau de Bord)
*Interface HTML/JS simple.*

- [ ] **6.1 Page d'Accueil (`/`)**
   - [ ] Présentation.
   - [ ] Formulaire Login.
   - [ ] Lien vers Documentation.

- [ ] **6.2 Dashboard Utilisateur Connecté**
   - [ ] **Utilisateurs** : Formulaires Créer, Modifier, Supprimer.
   - [ ] **Catways** : 
      - Créer, Supprimer.
      - **Modifier la description de l'état** (Formulaire spécifique).
      - Afficher détails.
   - [ ] **Réservations** : Enregistrer, Supprimer, Afficher détails.
   - [ ] Liens d'accès aux listes complètes.

---

## 🚀 Phase 7 : Déploiement
*Livrable final.*

- [ ] **7.1 Préparation**
   - [ ] Variables d'environnement pour Prod.
- [ ] **7.2 Déploiement**
   - [ ] Déploiement sur hébergeur (ex: Render, Railway, Heroku).
   - [ ] Vérification de l'URL publique.
