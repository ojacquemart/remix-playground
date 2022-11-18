const en = {
  title: 'Welcome to Remix',
  auth: {
    fields: {
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm',
      username: 'Username',
    },
    continue: 'Continue',
    continueSubmitting: 'Continue...',
    invalidEmail: 'Must be a valid email',
    register: {
      cancel: 'Cancel',
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
      username: {
        title: 'Select your username',
        required: 'Username is required',
      },
      greetings: {
        home: 'Go back to /',
      },
    },
    login: {
      title: 'Login',
      noAccount: 'No account yet?',
      registerInstead: 'Register',
      invalidCredentials: 'Invalid credentials',
      validator: {
        invalidData: 'Invalid data',
        email: 'Enter your email',
        password: 'Enter your password',
      },
    },
    logout: {
      title: 'Logout',
    },
  },
  tutorials: {
    blog: '15m Quickstart Blog Tutorial',
    jokes: 'Deep Dive Jokes App Tutorial',
  },
  docs: 'Remix Docs',
};

export default en;
