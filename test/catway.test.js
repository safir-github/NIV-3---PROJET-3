const { expect } = require('chai');
const Catway = require('../models/catway');
const catwayService = require('../services/catwayService');

describe('Catway Service', () => {

    // TEST 1 : Récupérer tous les catways
    it('devrait retourner tous les catways', async () => {
        await Catway.create({
            catwayNumber: 1,
            type: 'long',
            catwayState: 'En bon état'
        });

        await Catway.create({
            catwayNumber: 2,
            type: 'short',
            catwayState: 'Disponible'
        });

        const result = await catwayService.getAllCatways();

        expect(result).to.have.lengthOf(2);
        expect(result[0].catwayNumber).to.equal(1);
    });

    // TEST 2 : Récupérer un catway par ID
    it('devrait retourner un catway par son ID', async () => {
        const created = await Catway.create({
            catwayNumber: 10,
            type: 'short',
            catwayState: 'Test'
        });

        const result = await catwayService.getCatwayById(created._id);

        expect(result).to.exist;
        expect(result.catwayNumber).to.equal(10);
    });

    // TEST 3 : Erreur si ID non trouvé
    it('devrait lancer une erreur si ID non trouvé', async () => {
        try {
            await catwayService.getCatwayById('507f1f77bcf86cd799439011');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Catway non trouvé');
        }
    });

    // TEST 4 : Créer un nouveau catway
    it('devrait créer un nouveau catway', async () => {
        const catwayData = {
            catwayNumber: 99,
            type: 'long',
            catwayState: 'Nouveau catway de test'
        };

        const result = await catwayService.createCatway(catwayData);

        expect(result).to.have.property('_id');
        expect(result.catwayNumber).to.equal(99);
        expect(result.type).to.equal('long');
        expect(result.catwayState).to.equal('Nouveau catway de test');
    });

    // TEST 5 : Mettre à jour un catway (PUT complet)
    it('devrait mettre à jour un catway (PUT complet)', async () => {
        const created = await Catway.create({
            catwayNumber: 5,
            type: 'short',
            catwayState: 'État initial'
        });

        const updateData = {
            catwayNumber: 50,
            type: 'long',
            catwayState: 'État modifié'
        };

        const result = await catwayService.updateCatway(created._id, updateData);

        expect(result.catwayNumber).to.equal(50);
        expect(result.type).to.equal('long');
        expect(result.catwayState).to.equal('État modifié');
    });

    // TEST 6 : Modifier partiellement un catway (PATCH)
    it('devrait modifier partiellement un catway (PATCH)', async () => {
        const created = await Catway.create({
            catwayNumber: 7,
            type: 'short',
            catwayState: 'État initial'
        });

        const partialData = {
            catwayState: 'Seulement l\'état modifié'
        };

        const result = await catwayService.patchCatway(created._id, partialData);

        expect(result.catwayNumber).to.equal(7);
        expect(result.type).to.equal('short');
        expect(result.catwayState).to.equal('Seulement l\'état modifié');
    });

    // TEST 7 : Supprimer un catway
    it('devrait supprimer un catway', async () => {
        const created = await Catway.create({
            catwayNumber: 20,
            type: 'long',
            catwayState: 'À supprimer'
        });

        const result = await catwayService.deleteCatway(created._id);

        expect(result.message).to.equal('Catway supprimé');

        const found = await Catway.findById(created._id);
        expect(found).to.be.null;
    });
});