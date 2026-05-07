# BISKAR — Portfolio AR

Portfolio immersif en réalité augmentée construit avec **Expo Router**, **React Native Web** et **AR.js**.

**Démo live** → [briskar-portfolio.netlify.app](https://briskar-portfolio.netlify.app)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Expo SDK 55 + Expo Router |
| Mobile | React Native + WebView |
| Web | React Native Web |
| AR | A-Frame 1.3 + AR.js |
| Tunnel local | @expo/ngrok |
| Déploiement | Netlify |

---

## Prérequis

- **Node.js** v18+
- **npm** v9+
- **Expo CLI** → `npm install -g expo-cli`
- Un téléphone Android avec **Chrome** ou **Expo Go**
- Le marker **Hiro** imprimé ou affiché sur écran (voir section dédiée)

---

## Installation

```bash
git clone https://github.com/NashieArtz/portfolioAR.git
cd portfolioAR
npm install
```

---

## Lancer le projet localement

### Web uniquement (desktop)

```bash
npx expo start -c --web
```

Ouvre `http://localhost:8081` dans ton navigateur.

---

### Web + mobile avec tunnel HTTPS (nécessaire pour la caméra AR)

La caméra AR.js requiert **HTTPS**. Le tunnel Ngrok génère une URL HTTPS publique.

```bash
npx expo start -c --web --tunnel
```

Expo génère une URL du type :
```
https://xxxxxx-ton_user-8081.exp.direct
```

---

### Tester l'AR sur mobile

1. Lance le projet avec `--tunnel` (voir ci-dessus)
2. Ouvre l'URL tunnel dans **Chrome Android**
3. Va dans l'onglet **Vue AR** (icône ⬡)
4. Autorise l'accès à la caméra si Chrome le demande
5. Pointe la caméra vers le marker **Hiro**
6. Appuie sur **"Lancer l'expérience"** quand il apparaît

Si Chrome bloque la caméra : appuie sur le cadenas 🔒 dans la barre d'adresse → **Autorisations** → active la caméra.

---

## Marker Hiro

Le marker utilisé est le **Hiro standard d'AR.js** (`preset="hiro"`), aucun fichier `.patt` n'est nécessaire.

**Affiche ou imprime ce marker :**

![Hiro Marker](https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg)

Conseils pour une bonne détection :
- Taille minimale : **8 cm × 8 cm**
- Bonne luminosité, pas de reflet sur le papier
- Distance caméra : **20 à 50 cm**
- Le marker doit avoir sa **bordure noire épaisse** visible

---

## Structure du projet

```
portfolioAR/
├── public/
│   ├── ar.html              # Scène AR (A-Frame + AR.js)
│   └── projects/            # Images des projets pour l'AR
│       ├── proj_crm_1.png
│       ├── proj_web4_1.png
│       ├── proj_mustcle_1.png
│       ├── proj_hydrouqam.png
│       └── proj_tower_2.png
├── src/
│   └── app/
│       ├── _layout.tsx      # Layout racine (Stack + navigation)
│       ├── ar-view.tsx      # Page AR (WebView mobile / redirect web)
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── index.tsx    # Accueil
│           ├── projets.tsx  # Page projets
│           ├── about.tsx    # À propos
│           ├── contact.tsx  # Contact
├── assets/
│   └── images/
│       └── projects/        # Images pour la page projets React Native
├── netlify.toml             # Config build Netlify
├── app.json
└── package.json
```

---

## Build de production (web statique)

```bash
npx expo export --platform web
```

Le build est généré dans le dossier `dist/`.

---

## Déploiement Netlify

Le projet est connecté à Netlify via GitLab. Chaque push sur `main` déclenche un déploiement automatique.

Config dans `netlify.toml` :
```toml
[build]
  command = "npx expo export --platform web"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Pour déployer manuellement :
```bash
npm install -g netlify-cli
netlify deploy --dir dist --prod
```

---

## Dépannage

| Problème | Solution |
|----------|----------|
| `Cannot read properties of undefined (reading 'body')` | Change `"output"` de `"static"` à `"single"` dans `app.json` pour le dev local |
| Caméra refusée (`NotAllowedError`) | Vérifie les permissions caméra dans Chrome → cadenas 🔒 → Autorisations |
| Marker non détecté | Vérifie l'éclairage, la taille (min 8cm) et que le marker Hiro a bien sa bordure noire |
| URL tunnel expirée | Relance `npx expo start -c --web --tunnel` et mets à jour `AR_URL` dans `ar-view.tsx` |
| Images projets absentes dans l'AR | Les images doivent être dans `public/projects/`, pas dans `assets/` |