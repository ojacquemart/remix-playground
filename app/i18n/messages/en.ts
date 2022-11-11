const en = {
  title: 'Welcome to Remix',
  auth: {
    fields: {
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm',
    },
    continue: 'Continue',
    continueSubmitting: 'Continue...',
    invalidEmail: 'Must be a valid email',
    register: {
      title: 'Create account',
      showPasswords: 'Show passwords',
      cguNotice: 'By clicking "Continue", you agree to the <1>Terms and conditions</1>',
      passwordPolicy: '// Use 8 or more characters<br/>// with a mix of letters, numbers & symbols',
      alreadyAccount: 'Already an account?',
      loginInstead: 'Login',
      validator: {
        email: 'Email is required',
        password: 'Password is required',
        passwordConfirm: 'Passwords must match',
      },
    },
    login: {
      title: 'Login',
      noAccount: 'No account yet?',
      registerInstead: 'Register',
      validator: {
        email: 'Enter your email',
        password: 'Enter your password',
      },
    },
  },
  tutorials: {
    blog: '15m Quickstart Blog Tutorial',
    jokes: 'Deep Dive Jokes App Tutorial',
  },
  docs: 'Remix Docs',
};

export default en;
