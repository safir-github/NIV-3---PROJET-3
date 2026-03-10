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
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Afficher les infos de l'utilisateur connecté
    displayUserInfo();
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