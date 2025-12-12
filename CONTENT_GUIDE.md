# Guide d'ajout de contenu

Ce guide explique comment ajouter facilement du nouveau contenu à votre site.

## 📝 Ajouter une nouvelle carte

### Étape 1 : Préparer votre image
Placez votre image dans le dossier `/images/`

### Étape 2 : Éditer le fichier content.json
Ouvrez `content.json` et ajoutez une nouvelle entrée dans le tableau `cards` :

```json
{
  "id": "mon-projet",
  "title": "Titre de ma carte",
  "description": "Description courte de mon projet",
  "image": "/images/mon-image.png",
  "link": "/src/examples/ma-page.html",
  "type": "image"
}
```

### Étape 3 : Sauvegarder
C'est tout ! Rechargez la page et votre nouvelle carte apparaîtra automatiquement.

## 📋 Structure d'une carte

- **id** : Identifiant unique (pas d'espaces, utilisez des tirets)
- **title** : Titre affiché sur la carte
- **description** : Texte descriptif sous le titre
- **image** : Chemin vers l'image (doit être dans `/images/`)
- **link** : URL ou chemin vers la page de destination
- **type** : `"image"` pour une carte avec image statique

## 📁 Structure des fichiers

```
indigo.github.io/
├── content.json          ← Éditez ce fichier pour ajouter des cartes
├── cards.js             ← Script qui charge les cartes (ne pas modifier)
├── images/              ← Placez vos images ici
│   ├── Thumbnail_portfolio.png
│   └── votre-image.png
├── src/
│   └── examples/        ← Créez vos pages HTML ici
│       └── votre-page.html
└── index.html           ← Page principale
```

## 🎨 Exemple complet

Pour ajouter une carte "Mon Nouveau Projet" :

1. Copiez `mon-projet.png` dans `/images/`
2. Créez `/src/examples/mon-projet.html` (optionnel)
3. Ajoutez dans `content.json` :

```json
{
  "cards": [
    {
      "id": "portfolio",
      "title": "My gaming portfolio",
      "description": "My life as a Video Game Producer",
      "image": "/images/Thumbnail_portfolio.png",
      "link": "/src/examples/portfolio.html",
      "type": "image"
    },
    {
      "id": "nouveau",
      "title": "Mon Nouveau Projet",
      "description": "Un projet incroyable que j'ai créé",
      "image": "/images/mon-projet.png",
      "link": "/src/examples/mon-projet.html",
      "type": "image"
    }
  ]
}
```

## 💡 Conseils

- Utilisez des images optimisées (PNG ou JPG, max 1MB recommandé)
- Les titres courts fonctionnent mieux (max 30 caractères)
- Les descriptions doivent être concises (max 60 caractères)
- N'oubliez pas la virgule entre les cartes dans le JSON

## 🔧 Dépannage

**La carte n'apparaît pas ?**
- Vérifiez la syntaxe JSON (virgules, guillemets)
- Vérifiez que le chemin de l'image est correct
- Ouvrez la console du navigateur (F12) pour voir les erreurs

**L'image ne s'affiche pas ?**
- Vérifiez que le fichier existe dans `/images/`
- Vérifiez l'orthographe du nom de fichier (sensible à la casse)
