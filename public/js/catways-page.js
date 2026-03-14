// Vérifier l'authentification
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Afficher l'utilisateur connecté
const user = getUser();
document.getElementById('userInfo').textContent = user.name;

// Charger les catways
async function loadCatways() {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById('catwaysTable');

    try {
        const response = await fetch('http://localhost:3000/api/catways', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const catways = await response.json();

        if (catways && catways.length > 0) {
            tbody.innerHTML = catways.map(catway => `
                  <tr>
                      <td>${catway.catwayNumber}</td>
                      <td>${catway.type}</td>
                      <td>${catway.catwayState}</td>
                      <td>
                          <a href="catway-details.html?id=${catway._id}" class="btn btn-primary">🔍 Voir détails</a>
                      </td>
                  </tr>
              `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="4">Aucun catway trouvé</td></tr>';
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4">Erreur lors du chargement des catways</td></tr>';
    }
}

// Charger au chargement de la page
document.addEventListener('DOMContentLoaded', loadCatways);