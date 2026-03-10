// ============================================
// FONCTIONS D'AUTHENTIFICATION
// ============================================

/**
 * Affiche un message temporaire à l'écran
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de message ('success', 'error', 'info')
 */
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
        // Le message disparaît après 5 secondes
        setTimeout(() => messageDiv.innerHTML = '', 5000);
    }
}

/**
 * Récupère le token JWT depuis le localStorage
 * @returns {string|null} Le token ou null si pas connecté
 */
function getToken() {
    return localStorage.getItem('token');
}

/**
 * Récupère les infos de l'utilisateur connecté
 * @returns {Object|null} L'utilisateur ou null si pas connecté
 */
function getUser() {
    const user = localStorage.getItem('user');
    if (user) {
        // Si user existe (pas null)
        return JSON.parse(user);  // Convertit le texte en objet JavaScript
    } else {
        // Si user n'existe pas
        return null;  // Retourne null
    }
}

/**
 * Vérifie si l'utilisateur est connecté
 * @returns {boolean} true si connecté, false sinon
 */
function isAuthenticated() {
    return getToken() !== null;
}

/**
 * Déconnecte l'utilisateur et redirige vers la page de login
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ============================================
// VÉRIFICATION AUTOMATIQUE DE L'AUTH
// ============================================

// Si on est sur le dashboard et qu'on n'est pas connecté → rediriger vers login
if (window.location.pathname.endsWith('dashboard.html') && !isAuthenticated()) {
    window.location.href = 'index.html';
}

// Si on est sur index.html et qu'on est déjà connecté → rediriger vers dashboard
if (window.location.pathname.endsWith('index.html') && isAuthenticated()) {
    window.location.href = 'dashboard.html';
}

// ============================================
// GESTION DU FORMULAIRE DE LOGIN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Appel à l'API de connexion
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Succès : stocker le token et l'utilisateur
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    showMessage('Connexion réussie ! Redirection...', 'success');

                    // Redirection après 1 seconde
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    // Erreur : afficher le message d'erreur
                    showMessage(data.error || 'Erreur de connexion', 'error');
                }
            } catch (error) {
                showMessage('Erreur de connexion au serveur', 'error');
            }
        });
    }
});