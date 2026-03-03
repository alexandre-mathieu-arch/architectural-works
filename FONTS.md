# Caractéristiques des Polices - Atelier Archi

Ce document répertorie les styles typographiques utilisés sur l'ensemble du site.

## Police Globale
- **Police Primaire** : Satoshi (Variable)
- **Fallback** : sans-serif
- **Définition** : `app/assets/css/main.css` via `--font-primary`

---

## 1. Éléments Globaux (Header & Footer)

### Logo (Header)
- **Texte** : "Soñj"
- **Police** : Satoshi
- **Taille** : `12px`
- **Graisse** : `font-bold` (700)
- **Espacement (Tracking)** : `tighter` + `0.2em`

### Navigation (Header)
- **Texte** : "Projets", "Corpus", "Art"
- **Police** : Satoshi
- **Taille** : `12px`
- **Graisse** : `font-medium` (500)
- **Espacement (Tracking)** : `wide` + `0.2em`
- **Lien Actif** : Tilde `~` au-dessus (14px)

### Langue (Header)
- **Texte** : "EN" / "FR"
- **Taille** : `12px`
- **Graisse** : `font-medium`

### Footer
- **Texte** : "Contact"
- **Police** : Satoshi
- **Taille** : `21px`
- **Graisse** : `font-bold` (700)
- **Espacement (Tracking)** : `tighter`

---

## 2. Page d'Accueil (Home)
- **Titre (Overlay)** : Utilise le style **PageTitle** (voir ci-dessous).
- **Meta Title** : "Soñj" (main), "architecture & design" (sub).

---

## 3. Titres de Pages (Composant PageTitle)
- **Titre Principal (H1)** :
  - **Police** : Satoshi
  - **Taille** : 
    - Mobile : `30px` (text-3xl)
    - Tablette : `36px` (md:text-4xl)
    - Desktop : `48px` (lg:text-5xl)
  - **Graisse** : `font-bold` (700)
  - **Hauteur de ligne** : `leading-none` (1)
- **Sous-titre (H2)** :
  - **Taille** : `21px`
  - **Graisse** : `font-bold` (700)

---

## 4. Page Agence (Studio Soñj)
- **Contenu (Description)** :
  - **Style** : `prose` (Tailwind Typography)
  - **Taille** : `text-xl` (20px)
  - **Couleur** : Gris (`#4b5563`)
  - **Hauteur de ligne** : `leading-relaxed` (1.625)
- **Liens de Section ([pratique], [équipes])** :
  - **Taille** : `21px`
  - **Graisse** : `font-medium` (500)
  - **Style** : Uppercase, `tracking-widest` + `0.2em`

---

## 5. Page Projets
### Barre de filtres (Dropdowns)
- **Taille** : `15px`
- **Graisse** : `font-bold` (700)
### Options des menus (Dropdown items)
- **Taille** : `14px`
- **Graisse** : `font-medium` (500)
### Grille de projets (ProjectCard) - Au survol
- **Nom du projet** :
  - **Taille** : `15px`
  - **Graisse** : `font-medium` (500)
  - **Casse** : Normale (identique au fichier .md)
  - **Espacement (Tracking)** : `0.1em`
- **Année & Localisation** :
  - **Taille** : `12px`
  - **Graisse** : `font-light` (300)
  - **Espacement (Tracking)** : `0.1em`

---

## 6. Autres Pages (Art, Corpus, Contact)
- **Textes par défaut** : 
  - **Style** : `leading-relaxed`
  - **Taille** : `text-xl` (20px) pour le texte de contact.
  - **Italique** : Utilisé pour les placeholders de contenu.
