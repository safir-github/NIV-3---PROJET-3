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
async function displayCatways() {
    const result = await getAllCatways();
    const tbody = document.querySelector('#catways tbody');

    if (result.ok && result.data && result.data.length > 0) {
        tbody.innerHTML = result.data.map(catway => `
              <tr>
                  <td>${catway.catwayNumber}</td>
                  <td>${catway.type}</td>
                  <td>${catway.catwayState}</td>
                  <td>
                      <button onclick="viewCatwayDetails('${catway._id}')" class="btn btn-info"
  style="margin-right: 5px;">🔍 Voir</button>
                      <button onclick="openEditCatwayModal('${catway._id}', ${catway.catwayNumber},
  '${catway.catwayState}')" class="btn btn-warning" style="margin-right: 5px;">✏️  Modifier</button>
                      <button onclick="confirmDeleteCatway('${catway._id}')" class="btn btn-danger">
   Supprimer</button>
                  </td>
              </tr>
          `).join('');
    } else {
        tbody.innerHTML = '<tr><td colspan="4">Aucun catway trouvé</td></tr>';
    }
}

/**
 * Affiche les utilisateurs dans un tableau
 */
async function displayUsers() {
    const result = await getAllUsers();
    const tbody = document.querySelector('#users tbody');

    if (result.ok && result.data && result.data.length > 0) {
        tbody.innerHTML = result.data.map(user => `
              <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>
                      <button onclick="viewUserDetails('${user._id}')" class="btn btn-info"
  style="margin-right: 5px;">🔍 Voir</button>
                      <button onclick="openEditUserModal('${user._id}', '${user.name}',
  '${user.email}')" class="btn btn-warning" style="margin-right: 5px;">✏️  Modifier</button>
                      <button onclick="confirmDeleteUser('${user._id}')" class="btn btn-danger">🗑️
  Supprimer</button>
                  </td>
              </tr>
          `).join('');
    } else {
        tbody.innerHTML = '<tr><td colspan="3">Aucun utilisateur trouvé</td></tr>';
    }
}

/**
 * Affiche les réservations dans un tableau
 */
async function displayReservations(reservations) {
    const tbody = document.querySelector('#reservations tbody');

    if (reservations && reservations.length > 0) {
        tbody.innerHTML = reservations.map(reservation => `
              <tr>
                  <td>${reservation.catwayNumber}</td>
                  <td>${reservation.clientName}</td>
                  <td>${reservation.boatName}</td>
                  <td>${new Date(reservation.checkIn).toLocaleDateString('fr-FR')}</td>
                  <td>${new Date(reservation.checkOut).toLocaleDateString('fr-FR')}</td>
                  <td>
                      <button onclick="viewReservationDetails('${reservation._id}')" class="btn
  btn-info" style="margin-right: 5px;">🔍 Voir</button>
                      <button onclick="confirmDeleteReservation('${reservation._id}')" class="btn
  btn-danger">🗑️  Supprimer</button>
                  </td>
              </tr>
          `).join('');
    } else {
        tbody.innerHTML = '<tr><td colspan="6">Aucune réservation trouvée pour ce catway</td></tr>';
    }
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






// ============================================
// FONCTIONS DE GESTION DES MODALES
// ============================================

/**
 * Ouvre une modale
 * @param {string} modalId - L'ID de la modale à ouvrir
 */
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

/**
 * Ferme une modale
 * @param {string} modalId - L'ID de la modale à fermer
 */
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

/**
 * Ferme toutes les modales (utile pour la gestion des clics extérieurs)
 */
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ============================================
// FONCTIONS D'AJOUT (CRUD - CREATE)
// ============================================

/**
 * Crée un nouvel utilisateur
 */
async function addUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    const result = await createUser({ name, email, password });

    if (result.ok) {
        showMessage('Utilisateur créé avec succès', 'success');
        closeModal('userModal');
        loadUsers(); // Recharger la liste
        // Vider le formulaire
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userPassword').value = '';
    } else {
        showMessage(result.data.error || 'Erreur lors de la création', 'error');
    }
}

/**
 * Crée un nouveau catway
 */
async function addCatway() {
    const catwayNumber = parseInt(document.getElementById('catwayNumber').value);
    const type = document.getElementById('catwayType').value;
    const catwayState = document.getElementById('catwayState').value;

    const result = await createCatway({ catwayNumber, type, catwayState });

    if (result.ok) {
        showMessage('Catway créé avec succès', 'success');
        closeModal('catwayModal');
        loadCatways(); // Recharger la liste
        populateCatwaySelect(); // Mettre à jour le dropdown
        // Vider le formulaire
        document.getElementById('catwayNumber').value = '';
        document.getElementById('catwayType').value = '';
        document.getElementById('catwayState').value = '';
    } else {
        showMessage(result.data.error || 'Erreur lors de la création', 'error');
    }
}

/**
 * Crée une nouvelle réservation
 */
async function addReservation() {
    const catwayNumber = parseInt(document.getElementById('resCatway').value);
    const clientName = document.getElementById('resClient').value;
    const boatName = document.getElementById('resBoat').value;
    const checkIn = document.getElementById('resCheckIn').value;
    const checkOut = document.getElementById('resCheckOut').value;

    const result = await createReservation(catwayNumber, {
        clientName,
        boatName,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut)
    });

    if (result.ok) {
        showMessage('Réservation créée avec succès', 'success');
        closeModal('reservationModal');

        // Sélectionner automatiquement le catway dans le dropdown et charger les réservations
        const select = document.getElementById('reservationCatwaySelect');
        if (select) {
            select.value = catwayNumber.toString();
            await loadReservations();
        }

        // Vider le formulaire
        document.getElementById('resCatway').value = '';
        document.getElementById('resClient').value = '';
        document.getElementById('resBoat').value = '';
        document.getElementById('resCheckIn').value = '';
        document.getElementById('resCheckOut').value = '';
    } else {
        showMessage(result.data.error || 'Erreur lors de la création', 'error');
    }
}






// ============================================
// FONCTIONS DE MODIFICATION (CRUD - UPDATE)
// ============================================

/**
 * Ouvre la modale de modification d'utilisateur avec les données pré-remplies
 * @param {string} userId - L'ID de l'utilisateur
 * @param {string} userName - Le nom de l'utilisateur
 * @param {string} userEmail - L'email de l'utilisateur
 */
function openEditUserModal(userId, userName, userEmail) {
    document.getElementById('editUserId').value = userId;
    document.getElementById('editUserName').value = userName;
    document.getElementById('editUserEmail').value = userEmail;
    document.getElementById('editUserPassword').value = '';
    openModal('editUserModal');
}

/**
 * Ouvre la modale de modification de l'état d'un catway
 * @param {string} catwayId - L'ID du catway
 * @param {number} catwayNumber - Le numéro du catway
 * @param {string} currentState - L'état actuel du catway
 */
function openEditCatwayModal(catwayId, catwayNumber, currentState) {
    document.getElementById('editCatwayId').value = catwayId;
    document.getElementById('editCatwayNumber').value = catwayNumber;
    document.getElementById('editCatwayNumberDisplay').value = catwayNumber;
    document.getElementById('editCatwayState').value = currentState;
    openModal('editCatwayModal');
}

/**
 * Met à jour un utilisateur
 */
async function updateUser() {
    const userId = document.getElementById('editUserId').value;
    const name = document.getElementById('editUserName').value;
    const email = document.getElementById('editUserEmail').value;
    const password = document.getElementById('editUserPassword').value;

    // Préparer les données à mettre à jour
    const updateData = { name, email };
    if (password) {
        updateData.password = password;
    }

    const result = await updateUserById(userId, updateData);

    if (result.ok) {
        showMessage('Utilisateur mis à jour avec succès', 'success');
        closeModal('editUserModal');
        loadUsers(); // Recharger la liste
    } else {
        showMessage(result.data.error || 'Erreur lors de la mise à jour', 'error');
    }
}

/**
 * Met à jour l'état d'un catway
 */
async function updateCatwayState() {
    const catwayId = document.getElementById('editCatwayId').value;
    const catwayState = document.getElementById('editCatwayState').value;

    const result = await updateCatwayById(catwayId, { catwayState });

    if (result.ok) {
        showMessage('État du catway mis à jour avec succès', 'success');
        closeModal('editCatwayModal');
        loadCatways(); // Recharger la liste
    } else {
        showMessage(result.data.error || 'Erreur lors de la mise à jour', 'error');
    }
}





// ============================================
// FONCTIONS DE VISUALISATION DES DÉTAILS
// ============================================

/**
 * Affiche les détails d'un catway
 */
async function viewCatwayDetails(catwayId) {
    const result = await getCatwayById(catwayId);

    if (result.ok && result.data) {
        const catway = result.data;
        document.getElementById('detailCatwayNumber').value = catway.catwayNumber;
        document.getElementById('detailCatwayType').value = catway.type;
        document.getElementById('detailCatwayState').value = catway.catwayState;
        document.getElementById('detailCatwayId').value = catway._id;
        openModal('catwayDetailsModal');
    } else {
        showMessage('Erreur lors du chargement des détails', 'error');
    }
}

/**
 * Affiche les détails d'un utilisateur
 */
async function viewUserDetails(userId) {
    const result = await getUserById(userId);

    if (result.ok && result.data) {
        const user = result.data;
        document.getElementById('detailUserName').value = user.name;
        document.getElementById('detailUserEmail').value = user.email;
        document.getElementById('detailUserId').value = user._id;
        document.getElementById('detailUserCreatedAt').value = user.createdAt ? new
            Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A';
        openModal('userDetailsModal');
    } else {
        showMessage('Erreur lors du chargement des détails', 'error');
    }
}

/**
 * Affiche les détails d'une réservation
 */
async function viewReservationDetails(reservationId) {
    const result = await getReservationById(reservationId);

    if (result.ok && result.data) {
        const reservation = result.data;
        document.getElementById('detailReservationCatway').value = reservation.catwayNumber;
        document.getElementById('detailReservationClient').value = reservation.clientName;
        document.getElementById('detailReservationBoat').value = reservation.boatName;
        document.getElementById('detailReservationCheckIn').value = new
            Date(reservation.checkIn).toLocaleDateString('fr-FR');
        document.getElementById('detailReservationCheckOut').value = new
            Date(reservation.checkOut).toLocaleDateString('fr-FR');
        document.getElementById('detailReservationId').value = reservation._id;
        openModal('reservationDetailsModal');
    } else {
        showMessage('Erreur lors du chargement des détails', 'error');
    }
}