#!/bin/bash

# ============================================
# Script d'initialisation de la base de données
# Port de Plaisance Russell
# ============================================

echo "🚀 Initialisation de la base de données MongoDB..."
echo ""

# Nom de la base de données
DB_NAME="russell"

# Import des catways
echo "📦 Import des catways..."
mongoimport --jsonArray --db $DB_NAME --collection catways --file catways.json --quiet

if [ $? -eq 0 ]; then
    echo "✅ Catways importés avec succès"
else
    echo "❌ Erreur lors de l'import des catways"
fi

# Import des réservations
echo "📦 Import des réservations..."
mongoimport --jsonArray --db $DB_NAME --collection reservations --file reservations.json --quiet

if [ $? -eq 0 ]; then
    echo "✅ Réservations importées avec succès"
else
    echo "❌ Erreur lors de l'import des réservations"
fi

echo ""
echo "🎉 Initialisation terminée !"
echo "📊 Base de données '$DB_NAME' prête à l'emploi !"
