// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Fonction utilitaire pour les appels API
 * Ajoute automatiquement le token JWT aux requêtes
 */
async function apiCall(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`http://localhost:3000${url}`, {
            ...options,
            headers
        });

        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}

// ============================================
// API CATWAYS
// ============================================

async function getAllCatways() {
    return await apiCall('/api/catways');
}

async function createCatway(catwayData) {
    return await apiCall('/api/catways', {
        method: 'POST',
        body: JSON.stringify(catwayData)
    });
}

async function deleteCatway(id) {
    return await apiCall(`/api/catways/${id}`, {
        method: 'DELETE'
    });
}

// ============================================
// API USERS
// ============================================

async function getAllUsers() {
    return await apiCall('/api/users');
}

async function createUser(userData) {
    return await apiCall('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

async function deleteUser(id) {
    return await apiCall(`/api/users/${id}`, {
        method: 'DELETE'
    });
}

// ============================================
// API RESERVATIONS
// ============================================

async function getReservationsByCatway(catwayNumber) {
    return await apiCall(`/api/catways/${catwayNumber}/reservations`);
}


async function createReservation(catwayNumber, reservationData) {
    return await apiCall(`/api/catways/${catwayNumber}/reservations`, {
        method: 'POST',
        body: JSON.stringify(reservationData)
    });
}



async function updateUserById(userId, userData) {
    return await apiCall(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

async function updateCatwayById(catwayId, catwayData) {
    return await apiCall(`/api/catways/${catwayId}`, {
        method: 'PUT',
        body: JSON.stringify(catwayData)
    });
}