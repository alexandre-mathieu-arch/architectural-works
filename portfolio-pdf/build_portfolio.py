import os
import re
import yaml
import subprocess

# Chemins
PROJECTS_DIR = "../content/projects"
PUBLIC_DIR = "../public"
OUTPUT_DIR = "output"
TEMPLATE_FILE = "template.tex"
TEX_FILE = os.path.join(OUTPUT_DIR, "portfolio_gen.tex")

def clean_markdown(text):
    """Nettoie le markdown pour LaTeX (très basique)"""
    # Remplacement des gras
    text = re.sub(r'\*\*(.*?)\*\*', r'\\textbf{\1}', text)
    # Remplacement des italiques
    text = re.sub(r'\*(.*?)\*', r'\\textit{\1}', text)
    # Remplacement des sauts de ligne markdown par des sauts de paragraphe LaTeX
    text = text.replace('\n\n', '\\par\\medskip ')
    # Échappement des caractères spéciaux LaTeX courants
    chars = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
    }
    for char, replacement in chars.items():
        text = text.replace(char, replacement)
    return text

def parse_projects():
    projects_data = []
    for filename in sorted(os.listdir(PROJECTS_DIR)):
        if filename.endswith(".md"):
            with open(os.path.join(PROJECTS_DIR, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                # Extraction du frontmatter
                match = re.match(r'^---(.*?)---(.*)', content, re.DOTALL)
                if match:
                    frontmatter = yaml.safe_load(match.group(1))
                    body = match.group(2).strip()
                    
                    # On convertit les chemins d'images relatifs au web en chemins absolus locaux
                    if 'images' in frontmatter:
                        local_images = []
                        for img in frontmatter['images']:
                            # Si l'image commence par /images, elle est dans /public
                            full_path = os.path.abspath(os.path.join(PUBLIC_DIR, img.lstrip('/')))
                            if os.path.exists(full_path):
                                local_images.append(full_path)
                        frontmatter['local_images'] = local_images
                    
                    frontmatter['body_tex'] = clean_markdown(body)
                    projects_data.append(frontmatter)
    
    # Tri par date (plus récent en premier)
    projects_data.sort(key=lambda x: str(x.get('date', '')), reverse=True)
    return projects_data

def generate_tex(projects):
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template = f.read()

    projects_tex = ""
    for p in projects:
        title = p.get('title', 'Sans titre')
        date = p.get('date', '')
        
        # Ajout au sommaire
        projects_tex += f"\\addcontentsline{{toc}}{{section}}{{{title} ({date})}}\n"

        # Construction des métadonnées
        meta = []
        if 'typologies' in p: meta.append(f"\\textbf{{Typologie :}} {', '.join(p['typologies'])}")
        if 'materiaux' in p: meta.append(f"\\textbf{{Matériaux :}} {', '.join(p['materiaux'])}")
        if 'lieu' in p: meta.append(f"\\textbf{{Lieu :}} {p['lieu']}")
        meta_str = " \\\\ ".join(meta)

        # Images
        all_imgs = p.get('local_images', [])
        intro_img = all_imgs[0] if len(all_imgs) > 0 else ""

        # Sous-titre (Lieu + Phase ou Statut)
        subtitle_parts = []
        if 'lieu' in p: subtitle_parts.append(p['lieu'])
        if 'phase' in p: subtitle_parts.append(p['phase'])
        elif 'statut' in p: subtitle_parts.append(p['statut'])
        subtitle = " // ".join(subtitle_parts).upper()

        # Construction de la galerie pour la page de détails
        gallery_tex = ""
        if len(all_imgs) > 1:
            # On essaie de mettre les images par paires ou colonnes
            for img in all_imgs[1:3]: # On en prend 2 pour rester propre sur A5
                gallery_tex += f"\\includegraphics[width=\\textwidth,height=4.5cm,keepaspectratio]{{{img}}}\\par\\vspace{{0.4cm}}\n"

        # On crée un bloc spécifique pour les images de détails
        project_entry = f"""
\\projectIntroPage{{{title}}}{{{date}}}{{{subtitle}}}{{{intro_img}}}

\\renewcommand{{\\PROJECTIMAGES}}{{{gallery_tex}}}
\\projectDetailsPage{{{meta_str}}}{{{p['body_tex']}}}
"""
        projects_tex += project_entry

    full_tex = template.replace("%%PROJECTS_PLACEHOLDER%%", projects_tex)
    
    with open(TEX_FILE, 'w', encoding='utf-8') as f:
        f.write(full_tex)

if __name__ == "__main__":
    print("Extraction des projets...")
    projects = parse_projects()
    print(f"{len(projects)} projets trouvés.")
    generate_tex(projects)
    print(f"Fichier LaTeX généré : {TEX_FILE}")
    print("Note : Exécutez 'xelatex portfolio_gen.tex' dans le dossier output pour générer le PDF.")
