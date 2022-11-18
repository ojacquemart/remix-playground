const fr = {
  title: 'Bienvenue sur Remix',
  auth: {
    fields: {
      email: 'Email',
      password: 'Mot de passe',
      passwordConfirm: 'Confirmer',
      username: 'Nom d\'utilisateur',
    },
    continue: 'Continuer',
    continueSubmitting: 'Continuer...',
    invalidEmail: 'L\'adresse e-mail invalide',
    register: {
      cancel: 'Annuler',
      title: 'Créer un compte',
      showPasswords: 'Afficher les mots de passe',
      cguNotice: 'En cliquant sur Continuer, vous acceptez les <1 style="border-bottom: 1px dashed black">CGU</1>',
      passwordPolicy: '// Utilisez au moins huit caractères <br/>// avec des lettres, des chiffres et des symboles',
      alreadyAccount: 'Déjà un compte ?',
      loginInstead: 'Me connecter',
      validator: {
        email: 'L\'adresse e-mail est obligatoire',
        password: 'Le mot de passe est obligatoire',
        passwordConfirm: 'Les mots de passe ne correspondent pas',
      },
      username: {
        title: 'Choisir votre pseudo',
        required: 'Le pseudo est obligatoire',
      },
      greetings: {
        home: 'Retour vers /',
      },
    },
    login: {
      title: 'Se connecter',
      noAccount: 'Pas encore de compte ?',
      registerInstead: 'S\'inscrire',
      invalidCredentials: 'Identifiants incorrects',
      validator: {
        invalidData: 'Données invalides',
        email: 'Veuillez saisir votre adresse e-mail',
        password: 'Veuillez saisir votre mot de passe',
      },
      logout: {
        title: 'Déconnexion',
      },
    },
  },
  tutorials: {
    blog: 'Démarrage rapide en 15 minutes avec le tutorial "Blog"',
    jokes: 'Plongez au coeur de Remix avec le tutorial "Jokes"',
  },
};

export default fr;
