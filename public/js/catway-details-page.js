// Vérifier l'authentification
if (!isAuthenticated()) {
    window.location.href = 'index.html';
}

// Récupérer l'ID du catway depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const catwayId = urlParams.get('id');

if (!catwayId) {
    window.location.href = 'catways.html';
}

// Charger les détails du catway
async function loadCatwayDetails() {
    const token = localStorage.getItem('token');
    const detailsSection = document.getElementById('catwayDetails');

    try {
        const response = await fetch(`http://localhost:3000/api/catways/${catwayId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Catway non trouvé');
        }

        const catway = await response.json();

        detailsSection.innerHTML = `
              <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px
  rgba(0,0,0,0.1);">
                  <h2>Catway #${catway.catwayNumber}</h2>
                  <div class="form-group">
                      <label>Type :</label>
                      <p><strong>${catway.type}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>État :</label>
                      <p><strong>${catway.catwayState}</strong></p>
                  </div>
                  <div class="form-group">
                      <label>Identifiant :</label>
                      <p style="font-size: 0.9em; color: #666;">${catway._id}</p>
                  </div>
              </div>
          `;
    } catch (error) {
        detailsSection.innerHTML = `
              <div style="background: #ffebee; padding: 20px; border-radius: 8px; border-left: 4px solid
  #f44336;">
                  <h2>Erreur</h2>
                  <p>Catway non trouvé ou erreur lors du chargement.</p>
                  <a href="catways.html" class="btn btn-primary">Retour à la liste</a>
              </div>
          `;
    }
}

// Charger au chargement de la page
document.addEventListener('DOMContentLoaded', loadCatwayDetails);