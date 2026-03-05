# Caractéristiques des Marges, Paddings et Containers

Ce document récapitule les règles de mise en page (espacements et structures) utilisées dans le projet.

## 1. Variables Globales (CSS Variables)
Définies dans `app/assets/css/main.css` :

| Variable | Valeur par défaut | Description |
| :--- | :--- | :--- |
| `--header-height` | `45px` | Hauteur du header fixe |
| `--main-padding` | `20px` | Padding latéral de base (mobile) |

### Adaptativité (Responsive)
La variable `--main-padding` s'adapte selon la largeur de l'écran :
- **Mobile (< 768px)** : `5%`
- **Tablette (≥ 768px)** : `5%`
- **Desktop (≥ 1280px)** : `5%`

---

## 2. Container Principal (`.main-container`)
Utilisé pour centrer et aligner le contenu sur toutes les pages.

- **Width** : `100%`
- **Alignement** : Centré (`margin-left/right: auto`)
- **Padding Latéral** : Utilise `var(--main-padding)` (gauche et droite).

---

## 3. Structure du Layout (`app/layouts/default.vue`)
- **Wrapper** : `min-height: 100%`, `margin-bottom: -40px`.
- **Zone de Titre** : `min-height: 120px` (contient `PageTitle`).
- **Main Content** :
    - `padding-top` : Dynamique via `var(--header-height)` (45px).
    - `padding-bottom` : `pb-24` (soit `6rem` ou `96px`).

---

## 4. Navigation & Header (`app/components/Header.vue`)
- **Header** : Fixe en haut (`fixed top-0`), sans bordure basse.
- **Espacements internes** :
    - Gap entre logo et nav : `20px`.
    - Gap entre les liens de navigation : `50px`.
    - Gap entre les éléments de droite (recherche, langue) : `50px`.
- **Padding latéral** : Utilise `px-[var(--main-padding)]` (5%).

---

## 5. Composants Spécifiques

### PageTitle (`app/components/PageTitle.vue`)
- **Padding Bottom** : `pb-2`.

### Dropdowns & Filtres (Projets)
Les filtres situés sous le titre principal de la page Projets suivent ces règles :

- **Espacements verticaux** :
    - Entre le **Titre** et les **Boutons** : `10px` (`mt-[10px]` sur le bloc filtres).
    - Entre les **Triggers** et les **Pills** : `0px` (ils se touchent).

- **Boutons de déclenchement (Trigger)** :
    - **Disposition** : Tous les boutons sur une seule ligne horizontale (`flex-nowrap`).
    - **Largeur** : L'ensemble des 4 filtres + le bouton Reset occupe la largeur de la **première colonne** de la grille, incluant la compensation du gap :
        - `w-full` (mobile)
        - `md:w-[calc((100%-4px)/2)]` (tablette)
        - `xl:w-[calc((100%-8px)/3)]` (desktop)
    - **Individuel** : Chaque bouton est `flex-auto` (proportionnel au texte).
    - **Typographie** : `u-h4` (13px, bold, tracking 0.2em).
    - **Espacement (Gap)** : Aucun espacement horizontal ou vertical entre les boutons (`-ml-[1px] -mt-[1px]` pour superposer les bordures).
    - **Cadre** : Chaque bouton est entouré d'une bordure (`border border-[#121212]/30`). Pas d'arrondi.
    - **Hauteur** : Fixée à `30px`.
    - **Padding** : `px-3 sm:px-4`. (Le padding peut se réduire sur mobile).
    - **Couleurs** : 
        - Défaut : `#121212`.
        - Actif (menu ouvert) : `text-gray-400 border-gray-400`.
        - Sélectionné (filtre appliqué) : `!text-[#8B5CF6] !border-[#8B5CF6]` (pour la typologie).
        - Hover : `text-gray-500` avec bordure `#121212`.
    - **Icônes** : Utilise une icône `+` par défaut, qui devient `-` lorsque le menu est ouvert.
    - **Transition** : `duration-300` sur la couleur et la bordure.

- **Panneau d'options (Panel)** :
    - **Position** : Absolue (`absolute top-0 left-0`).
    - **Largeur** : S'aligne sur la largeur des boutons trigger et de la première colonne :
        - `w-full` (mobile)
        - `md:w-[calc((100%-4px)/2)]` (tablette)
        - `xl:w-[calc((100%-8px)/3)]` (desktop)
    - **Fond** : Transparent.
    - **Padding** : Aucun (`p-0`). Les pills touchent les triggers.
    - **Bordure** : Pas de bordure basse.
    - **Transition d'entrée/sortie** : Opacité et translation verticale de `8px` (`-translate-y-2` vers `translate-y-0`).

- **Boutons d'options (Pills)** :
    - **Typographie** : `text-[14px]`, font-medium.
    - **Style** : Bordure `1px` (`#121212/50`). Pas d'arrondi.
    - **Espacement** : Aucun espacement entre les options (`-ml-[1px] -mt-[1px]` pour superposer les bordures).
    - **Padding** : `px-2 py-0.5`.
    - **État Sélectionné** : Fond `#121212` et texte blanc.

- **Logique de filtrage** :
    - **Catégories** : Typologie, Taille, Année, Pays.
    - **Bouton Réinitialiser** : Un carré (`30x30px`) avec une icône "X" rouge, entouré d'une bordure rouge. Aligné à droite de la ligne des filtres, touche le dernier bouton. Apparaît uniquement si un filtre est actif. Devient rouge plein avec "X" blanc au hover.

---

## 6. Grille de Projets (`app/pages/projects.vue`)
La grille d'affichage des projets utilise les caractéristiques suivantes :

- **Colonnes (Responsive)** :
    - **Mobile** : 1 colonne (`grid-cols-1`)
    - **Tablette / Petit Desktop (md)** : 2 colonnes (`md:grid-cols-2`)
    - **Large Desktop (xl)** : 3 colonnes (`xl:grid-cols-3`)
- **Gouttière (Gaps)** : Espacement minimal de `4px` (`gap-1`).
- **Alignement** : Les items sont centrés verticalement (`items-center`).

### Détails des Cartes (`ProjectCard.vue`)
- **Structure** : Lien block contenant une `div` relative avec `aspect-square`.
- **Comportement de l'Image** :
    - L'image remplit **totalement** la zone (`w-full h-full`).
    - Utilise `object-cover` pour garantir le remplissage sans déformation (rognage si nécessaire).
- **Hover State (Survol)** :
    - Overlay opaque (`rgb(248,248,248)`) qui remplace visuellement l'image.
    - **Zoom** : L'image subit un zoom progressif (`scale-105`) au survol avant d'être masquée par l'overlay.
    - **Padding Interne (Hover)** : `p-10`.

---

## 7. Utilitaires de Texte (Marges)
- **Prose (Markdown)** :
    - `h2`, `h3`, `h4` : `mb-4` ou `mb-2`.
    - `p`, `li` : `mb-4`.

