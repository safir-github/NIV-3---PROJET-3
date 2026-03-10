const { expect } = require('chai');
const Reservation = require('../models/reservation');
const reservationService = require('../services/reservationService');

describe('Reservation Service', () => {

    // TEST 1 : Récupérer toutes les réservations d'un catway
    it('devrait retourner toutes les réservations d\'un catway', async () => {
        // Créer deux réservations pour le même catway
        await Reservation.create({
            catwayNumber: 1,
            clientName: 'Alice Dupont',
            boatName: 'Voilier 1',
            checkIn: '2024-06-01T10:00:00',
            checkOut: '2024-06-05T10:00:00'
        });

        await Reservation.create({
            catwayNumber: 1,
            clientName: 'Bob Martin',
            boatName: 'Catamaran 2',
            checkIn: '2024-07-01T10:00:00',
            checkOut: '2024-07-10T10:00:00'
        });

        // Créer une réservation pour un autre catway
        await Reservation.create({
            catwayNumber: 5,
            clientName: 'Charlie',
            boatName: 'Yacht 3',
            checkIn: '2024-08-01T10:00:00',
            checkOut: '2024-08-15T10:00:00'
        });

        const result = await reservationService.getReservationsByCatway(1);

        // Vérifier qu'on a seulement les réservations du catway 1
        expect(result).to.have.lengthOf(2);
        expect(result[0].catwayNumber).to.equal(1);
        expect(result[1].catwayNumber).to.equal(1);
        expect(result[0].clientName).to.equal('Alice Dupont');
        expect(result[1].clientName).to.equal('Bob Martin');
    });

    // TEST 2 : Récupérer les réservations d'un catway qui n'en a pas
    it('devrait retourner un tableau vide si aucune réservation pour ce catway', async () => {
        // Créer une réservation pour le catway 5
        await Reservation.create({
            catwayNumber: 5,
            clientName: 'David',
            boatName: 'Bateau 5',
            checkIn: '2024-06-01T10:00:00',
            checkOut: '2024-06-05T10:00:00'
        });

        // Chercher les réservations du catway 1 (qui n'en a pas)
        const result = await reservationService.getReservationsByCatway(1);

        expect(result).to.have.lengthOf(0);
        expect(result).to.be.an('array').that.is.empty;
    });

    // TEST 3 : Récupérer une réservation par son ID
    it('devrait retourner une réservation par son ID', async () => {
        const created = await Reservation.create({
            catwayNumber: 2,
            clientName: 'Emma Wilson',
            boatName: 'Schooner',
            checkIn: '2024-09-01T10:00:00',
            checkOut: '2024-09-10T10:00:00'
        });

        const result = await reservationService.getReservationById(created._id);

        expect(result).to.exist;
        expect(result.catwayNumber).to.equal(2);
        expect(result.clientName).to.equal('Emma Wilson');
        expect(result.boatName).to.equal('Schooner');
    });

    // TEST 4 : Erreur si réservation non trouvée
    it('devrait lancer une erreur si réservation non trouvée', async () => {
        try {
            await reservationService.getReservationById('507f1f77bcf86cd799439011');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Réservation non trouvée');
        }
    });

    // TEST 5 : Créer une réservation
    it('devrait créer une nouvelle réservation', async () => {
        const reservationData = {
            catwayNumber: 3,
            clientName: 'Frank Miller',
            boatName: 'Ocean Star',
            checkIn: '2024-10-01T14:00:00',
            checkOut: '2024-10-07T10:00:00'
        };

        const result = await reservationService.createReservation(reservationData);

        expect(result).to.have.property('_id');
        expect(result.catwayNumber).to.equal(3);
        expect(result.clientName).to.equal('Frank Miller');
        expect(result.boatName).to.equal('Ocean Star');

        // Vérifier les dates
        expect(result.checkIn).to.exist;
        expect(result.checkOut).to.exist;
    });

    // TEST 6 : Créer une réservation avec dates au format ISO
    it('devrait créer une réservation et convertir les dates en objets Date', async () => {
        const reservationData = {
            catwayNumber: 4,
            clientName: 'Grace Lee',
            boatName: 'Sea Breeze',
            checkIn: '2024-11-15T10:00:00',
            checkOut: '2024-11-20T10:00:00'
        };

        const result = await reservationService.createReservation(reservationData);

        // Vérifier que checkIn et checkOut sont des objets Date
        expect(result.checkIn).to.be.a('date');
        expect(result.checkOut).to.be.a('date');

        // Vérifier les valeurs des dates
        expect(new Date(result.checkIn).toISOString()).to.contain('2024-11-15');
        expect(new Date(result.checkOut).toISOString()).to.contain('2024-11-20');
    });

    // TEST 7 : Supprimer une réservation
    it('devrait supprimer une réservation', async () => {
        const created = await Reservation.create({
            catwayNumber: 6,
            clientName: 'Henry Davis',
            boatName: 'Wave Rider',
            checkIn: '2024-12-01T10:00:00',
            checkOut: '2024-12-08T10:00:00'
        });

        const result = await reservationService.deleteReservation(created._id);

        expect(result.message).to.equal('Réservation supprimée');

        const found = await Reservation.findById(created._id);
        expect(found).to.be.null;
    });

    // TEST 8 : Erreur lors de la suppression d'une réservation inexistante
    it('devrait lancer une erreur en supprimant une réservation non trouvée', async () => {
        try {
            await reservationService.deleteReservation('507f1f77bcf86cd799439011');
            expect.fail('La fonction aurait dû lancer une erreur');
        } catch (error) {
            expect(error.message).to.equal('Réservation non trouvée');
        }
    });
});