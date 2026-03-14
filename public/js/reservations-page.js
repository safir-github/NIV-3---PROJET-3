// Vérifier l'authentification
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Afficher l'utilisateur connecté
const user = getUser();
document.getElementById('userInfo').textContent = user.name;



// Charger TOUTES les réservations
async function loadAllReservations() {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById('reservationsTable');

    try {
        // Récupérer tous les catways
        const catwaysResponse = await fetch('http://localhost:3000/api/catways', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const catways = await catwaysResponse.json();

        // Récupérer les réservations pour chaque catway
        let allReservations = [];

        for (const catway of catways) {
            const resResponse = await fetch(`http://localhost:3000/api/catways/${catway.catwayNumber}/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const reservations = await resResponse.json();

            if (reservations && reservations.length > 0) {
                allReservations = [...allReservations, ...reservations];
            }
        }

        if (allReservations.length > 0) {
            tbody.innerHTML = allReservations.map(reservation => `
                  <tr>
                      <td>${reservation.catwayNumber}</td>
                      <td>${reservation.clientName}</td>
                      <td>${reservation.boatName}</td>
                      <td>${new Date(reservation.checkIn).toLocaleDateString('fr-FR')}</td>
                      <td>${new Date(reservation.checkOut).toLocaleDateString('fr-FR')}</td>
                      <td>
                          <a href="reservation-details.html?id=${reservation._id}" class="btn btn-primary">🔍 Voir
  détails</a>
                      </td>
                  </tr>
              `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="6">Aucune réservation trouvée</td></tr>';
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6">Erreur lors du chargement des réservations</td></tr>';
    }
}



// Charger au chargement de la page
document.addEventListener('DOMContentLoaded', loadAllReservations);