const { expect } = require('chai');
const User = require('../models/user');
const userService = require('../services/userService');

describe('User Service', () => {

    // TEST 1 : Récupérer tous les utilisateurs
    it('devrait retourner tous les utilisateurs SANS password', async () => {
        // Créer deux utilisateurs
        await User.create({
            name: 'Alice Dupont',
            email: 'alice@test.com',
            password: 'password123'
        });

        await User.create({
            name: 'Bob Martin',
            email: 'bob@test.com',
            password: 'password456'
        });

        const result = await userService.getAllUsers();

        expect(result).to.have.lengthOf(2);
        expect(result[0]).to.not.have.property('password');
        expect(result[1]).to.not.have.property('password');
        expect(result[0].name).to.equal('Alice Dupont');
    });

    // TEST 2 : Récupérer un utilisateur par ID
    it('devrait retourner un utilisateur par son ID SANS password', async () => {
        const created = await User.create({
            name: 'Charlie',
            email: 'charlie@test.com',
            password: 'pass123'
        });

        const result = await userService.getUserById(created._id);

        expect(result).to.exist;
        expect(result).to.not.have.property('password');
        expect(result.name).to.equal('Charlie');
        expect(result.email).to.equal('charlie@test.com');
    });

    // TEST 3 : Erreur si utilisateur non trouvé
    it('devrait lancer une erreur si utilisateur non trouvé', async () => {
        try {
            await userService.getUserById('507f1f77bcf86cd799439011');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Utilisateur non trouvé');
        }
    });

    // TEST 4 : Créer un utilisateur (password hashé)
    it('devrait créer un utilisateur avec le password hashé', async () => {
        const userData = {
            name: 'David',
            email: 'david@test.com',
            password: 'monPassword123'
        };

        const result = await userService.createUser(userData);

        // Vérifier que l'utilisateur est créé
        expect(result).to.have.property('_id');
        expect(result.name).to.equal('David');
        expect(result.email).to.equal('david@test.com');

        // Vérifier que le password N'EST PAS retourné
        expect(result).to.not.have.property('password');

        // Vérifier que dans la BDD, le password est hashé (différent du mot de passe en clair)
        const userInDb = await User.findById(result._id);
        expect(userInDb.password).to.not.equal('monPassword123');
        expect(userInDb.password).to.have.lengthOf(60); // Hash bcrypt = 60 caractères
    });

    // TEST 5 : Mettre à jour un utilisateur
    it('devrait mettre à jour un utilisateur SANS password', async () => {
        const created = await User.create({
            name: 'Emma',
            email: 'emma@test.com',
            password: 'oldpassword'
        });

        const updateData = {
            name: 'Emma Martin',
            email: 'emma.martin@test.com'
        };

        const result = await userService.updateUser(created._id, updateData);

        expect(result.name).to.equal('Emma Martin');
        expect(result.email).to.equal('emma.martin@test.com');
        expect(result).to.not.have.property('password');
    });

    // TEST 6 : Mettre à jour avec un nouveau password
    it('devrait mettre à jour un utilisateur avec un nouveau password hashé', async () => {
        const created = await User.create({
            name: 'Frank',
            email: 'frank@test.com',
            password: 'oldpassword'
        });

        const updateData = {
            name: 'Frank Miller',
            email: 'frank.m@test.com',
            password: 'newpassword123'
        };

        const result = await userService.updateUser(created._id, updateData);

        // Vérifier que le password n'est pas retourné
        expect(result).to.not.have.property('password');

        // Vérifier que le password a été changé et hashé dans la BDD
        const userInDb = await User.findById(created._id);
        expect(userInDb.password).to.not.equal('oldpassword');
        expect(userInDb.password).to.not.equal('newpassword123'); // Pas en clair
        expect(userInDb.password).to.have.lengthOf(60); // Hash bcrypt
    });

    // TEST 7 : Supprimer un utilisateur
    it('devrait supprimer un utilisateur', async () => {
        const created = await User.create({
            name: 'Grace',
            email: 'grace@test.com',
            password: 'pass123'
        });

        const result = await userService.deleteUser(created._id);

        expect(result.message).to.equal('Utilisateur supprimé');

        const found = await User.findById(created._id);
        expect(found).to.be.null;
    });

    // TEST 8 : Authentifier un utilisateur (succès)
    it('devrait authentifier un utilisateur avec email et password corrects', async () => {
        // Créer un utilisateur avec un password hashé
        const userData = {
            name: 'Henry',
            email: 'henry@test.com',
            password: 'correctPassword'
        };

        await userService.createUser(userData);

        // Authentifier avec les bons identifiants
        const result = await userService.authenticateUser('henry@test.com', 'correctPassword');

        expect(result).to.exist;
        expect(result.email).to.equal('henry@test.com');
        expect(result).to.not.have.property('password');
    });

    // TEST 9 : Erreur d'authentification avec mauvais email
    it('devrait lancer une erreur si email incorrect', async () => {
        try {
            await userService.authenticateUser('inconnu@test.com', 'password123');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Email ou mot de passe incorrect');
        }
    });

    // TEST 10 : Erreur d'authentification avec mauvais password
    it('devrait lancer une erreur si password incorrect', async () => {
        // Créer un utilisateur
        await userService.createUser({
            name: 'Ivy',
            email: 'ivy@test.com',
            password: 'correctPassword'
        });

        try {
            // Essayer de s'authentifier avec un mauvais password
            await userService.authenticateUser('ivy@test.com', 'wrongPassword');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Email ou mot de passe incorrect');
        }
    });
});