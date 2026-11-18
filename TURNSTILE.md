# Activation sur Cloudflare Pages

Le site conserve index.html, style.css et script.js. La validation réelle ajoute
functions/api/offer.js et _routes.json. GitHub Pages et l’ouverture locale en
file:// ne peuvent pas exécuter cette fonction : le CTA y reste inactif.

1. Dans Cloudflare, ouvrir Turnstile et ajouter un widget.
2. Nom : AliExpress CTA. Mode : Managed / Géré.
3. Autoriser les hostnames aliexpress.opticklix.com et aliexpress-9z8.pages.dev, sans https:// ni chemin.
   Ajouter aussi tout domaine personnalisé utilisé par ce site.
4. Dans Workers et Pages → aliexpress → Settings → Variables and Secrets,
   définir pour Production :
   - TURNSTILE_SITE_KEY : facultatif ; la clé publique fournie est déjà intégrée. Cette variable permet de la remplacer.
   - TURNSTILE_SECRET_KEY : clé secrète du même widget (type Secret).
   - OFFER_URL : facultatif ; la destination approuvée https://to.opticklix.com/5A0C/2J3E6/ est intégrée à la fonction. Cette variable permet de la remplacer.
5. Ne jamais mettre la clé secrète dans le JavaScript, le dépôt ou le chat.
6. Déployer les fichiers par Git et redéployer après un changement de variables.
   Le framework reste Aucun, la commande de build vide et la sortie « . ».

Sans clé secrète valide, l’API ne révèle aucune destination et le CTA reste
désactivé. Aucun mode de test passant automatiquement n’est livré.

Après activation : le CTA ouvre le dialogue, Turnstile remet un jeton et la
fonction valide ce jeton avec Siteverify (succès, hostname et action « offer »).
La destination n’est renvoyée qu’après validation. Le visiteur clique ensuite
sur « Continuer vers l’offre » pour ouvrir un nouvel onglet avec rel=noopener.
Aucune redirection ni ouverture d’onglet automatique. Les paramètres d’entrée,
y compris les valeurs répétées, sont transmis à la destination approuvée.

Les textes du dialogue suivent les six langues du popup. Tester sur HTTP(S),
avec le hostname autorisé et les vraies clés. Ne pas simuler un clic d’offre
pour vérifier uniquement la présentation ou les paramètres de tracking.

Turnstile limite l’accès à la destination via ce parcours ; ce n’est pas un
filtre de tout le trafic public du site ni une garantie d’absence de bots.
