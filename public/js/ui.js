// ============================================
// FONCTIONS DE NAVIGATION
// ============================================

/**
 * Affiche une section et cache les autres
 * @param {string} sectionId - L'ID de la section à afficher
 */
function showSection(sectionId) {
    // Cacher toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Désactiver tous les boutons de navigation
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Afficher la section sélectionnée
    document.getElementById(sectionId).classList.add('active');

    // Activer le bouton correspondant
    document.querySelector(`nav button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}


// ============================================
// FONCTIONS D'AFFICHAGE
// ============================================

function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => messageDiv.innerHTML = '', 5000);
    }
}

/**
 * Affiche les catways dans un tableau
 */
function displayCatways(catways) {
    const tbody = document.getElementById('catwaysTableBody');
    if (!tbody) return;

    if (catways.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Aucun catway trouvé</td></tr>';
        return;
    }

    tbody.innerHTML = catways.map(catway => `
          <tr>
              <td>${catway.catwayNumber}</td>
              <td>${catway.type}</td>
              <td>${catway.catwayState}</td>
              <td class="actions">
                  <button class="btn btn-danger" onclick="confirmDeleteCatway('${catway._id}')">Supprimer</button>
              </td>
          </tr>
      `).join('');
}

/**
 * Affiche les utilisateurs dans un tableau
 */
function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Aucun utilisateur trouvé</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(user => `
          <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td class="actions">
                  <button class="btn btn-danger" onclick="confirmDeleteUser('${user._id}')">Supprimer</button>
              </td>
          </tr>
      `).join('');
}

/**
 * Affiche les réservations dans un tableau
 */
function displayReservations(reservations) {
    const tbody = document.getElementById('reservationsTableBody');
    if (!tbody) return;

    if (reservations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Aucune réservation pour ce catway</td></tr>';
        return;
    }

    tbody.innerHTML = reservations.map(reservation => `
          <tr>
              <td>${reservation.catwayNumber}</td>
              <td>${reservation.clientName}</td>
              <td>${reservation.boatName}</td>
              <td>${new Date(reservation.checkIn).toLocaleDateString('fr-FR')}</td>
              <td>${new Date(reservation.checkOut).toLocaleDateString('fr-FR')}</td>
              <td class="actions">
                  <button class="btn btn-danger" onclick="confirmDeleteReservation('${reservation._id}')">Supprimer</button>
              </td>
          </tr>
      `).join('');
}

// ============================================
// FONCTIONS DE CHARGEMENT DES DONNÉES
// ============================================

/**
 * Charge et affiche les catways
 */
async function loadCatways() {
    const result = await getAllCatways();
    if (result.ok) {
        displayCatways(result.data);
    } else {
        showMessage('Erreur lors du chargement des catways', 'error');
    }
}

/**
 * Charge et affiche les utilisateurs
 */
async function loadUsers() {
    const result = await getAllUsers();
    if (result.ok) {
        displayUsers(result.data);
    } else {
        showMessage('Erreur lors du chargement des utilisateurs', 'error');
    }
}

/**
 * Charge et affiche les réservations d'un catway
 */
async function loadReservations() {
    const select = document.getElementById('reservationCatwaySelect');
    const catwayNumber = select ? select.value : null;

    if (!catwayNumber) {
        showMessage('Veuillez sélectionner un catway', 'error');
        return;
    }

    const result = await getReservationsByCatway(catwayNumber);
    if (result.ok) {
        displayReservations(result.data);
    } else {
        showMessage('Erreur lors du chargement des réservations', 'error');
    }
}

/**
 * Supprime un catway
 */
async function confirmDeleteCatway(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce catway ?')) {
        const result = await deleteCatway(id);
        if (result.ok) {
            showMessage('Catway supprimé avec succès', 'success');
            loadCatways();
        } else {
            showMessage(result.data.error || 'Erreur lors de la suppression', 'error');
        }
    }
}

/**
 * Supprime un utilisateur
 */
async function confirmDeleteUser(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        const result = await deleteUser(id);
        if (result.ok) {
            showMessage('Utilisateur supprimé avec succès', 'success');
            loadUsers();
        } else {
            showMessage(result.data.error || 'Erreur lors de la suppression', 'error');
        }
    }
}

/**
 * Supprime une réservation
 */
async function confirmDeleteReservation(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {

        showMessage('Fonctionnalité à compléter', 'info');
    }
}



// ============================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Afficher les infos de l'utilisateur connecté
    displayUserInfo();

    // Charger les données
    await loadCatways();
    await loadUsers();
    await populateCatwaySelect();
});

/**
 * Affiche le nom de l'utilisateur dans le header
 */
function displayUserInfo() {
    const user = getUser();  // Fonction définie dans auth.js
    const userInfoDiv = document.getElementById('userInfo');

    if (userInfoDiv && user) {
        userInfoDiv.textContent = `👤 ${user.name}`;
    }

}




/**
  * Peuple le menu déroulant avec les catways disponibles
  */
async function populateCatwaySelect() {
    const result = await getAllCatways();

    if (result.ok) {
        const select = document.getElementById('reservationCatwaySelect');
        if (!select) return;

        // Créer les options à partir des catways
        const options = result.data.map(catway =>
            `<option value="${catway.catwayNumber}">Catway ${catway.catwayNumber} (${catway.type})</option>`
        ).join('');

        // Ajouter l'option par défaut
        select.innerHTML = '<option value="">-- Choisir un catway --</option>' + options;
    }
}