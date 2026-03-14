// Vérifier l'authentification
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Récupérer l'ID de la réservation depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const reservationId = urlParams.get('id');

if (!reservationId) {
    window.location.href = 'reservations.html';
}


// Charger les détails de la réservation
async function loadReservationDetails() {
    const token = localStorage.getItem('token');
    const detailsSection = document.getElementById('reservationDetails');

    try {
        const response = await fetch(`http://localhost:3000/api/reservations/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Réservation non trouvée');
        }

        const reservation = await response.json();

        detailsSection.innerHTML = `
              <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h2>Réservation - Catway #${reservation.catwayNumber}</h2>
                  <div class="form-group">
                      <label>Nom du client :</label>
                      <p><strong>${reservation.clientName}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>Nom du bateau :</label>
                      <p><strong>${reservation.boatName}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>Date d'arrivée :</label>
                      <p><strong>${new Date(reservation.checkIn).toLocaleDateString('fr-FR')}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>Date de départ :</label>
                      <p><strong>${new Date(reservation.checkOut).toLocaleDateString('fr-FR')}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>Identifiant :</label>
                      <p style="font-size: 0.9em; color: #666;">${reservation._id}</p>
                  </div>
              </div>
          `;
    } catch (error) {
        detailsSection.innerHTML = `
              <div style="background: #ffebee; padding: 20px; border-radius: 8px; border-left: 4px solid #f44336;">
                  <h2>Erreur</h2>
                  <p>Réservation non trouvée ou erreur lors du chargement.</p>
                  <a href="reservations.html" class="btn btn-primary">Retour à la liste</a>
              </div>
          `;
    }
}


// Charger au chargement de la page
document.addEventListener('DOMContentLoaded', loadReservationDetails);