# Rationalisation Typographique - Atelier Archi

### Classification Typographique

| Catégorie | Usage Principal | Taille (px) | Graisse | Style / Tracking | Pages Présentes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Titre de page (Principal) | 28 (M), 34 (T), 46 (D) | 700 | `leading-none` | Toutes |
| **H2-800** | Titre Projet (Immersif) | 21 (M) / 25 (D) | 800 | `leading-none`, `0.2em` | Détail Projet |
| **H2** | Sous-titre, Localisation | 21 / 25 | 400 / 700 | `leading-none`, `0.2em` | Agence, Détail Projet |
| **H3** | Titre Projet (Grille), Agence | 15 / 12 | 700 | `tracking-[0.1em]` | Projets (Grille), Agence |
| **H4** | Navigation, Logo, Filtres, Boutons | 13 | 700 / 500 | `0.2em` spacing | Header, Projets, Détail |
| **Body** | Description, Contenu, Contact | 20 / 16 | 400 | `leading-relaxed / 1.1`, `0.2em` | Agence, Détail, Contact |
| **Légende** | Métadonnées (Année, Lieu) | 12 | 400 | `0.2em` spacing | Projets, Détail Projet |

### Inventaire des Polices Utilisées

- **Supreme (Variable)** : Police principale omniprésente (utilisée pour H1-H4, Body, Légende).
- **Lato** : Référencée dans le Footer (`TheFooter.vue`), mais semble être une exception ou un reliquat.
- **DM Sans** : Référencée via `var(--font-dm-sans)` dans `PageTitle.vue`, mais non définie (devrait être rationalisée avec Supreme).
- **Satoshi** : Fichiers présents dans `assets/font/` mais non utilisés dans le code.

---

Modification a faire
La page Agence doit être cohérente avec la page détail projet 
