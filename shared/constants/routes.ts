const ROUTES = {
   auth: {
      signIn: '/sign-in',
      signUp: '/sign-up',
      verify: '/verify',
      googleOAuth: `${process.env.NEXT_PUBLIC_API_URL}auth/google`,
      forgotPass: '/forgot-password',
      resetPass: '/reset-password',
      loginWithEmail: '/login-email',
      checkInBox: '/check-inbox',
   },
   home: '/',
   main: {
      profile: (username: string) => `/profile/${username}`,
   },
};

export default ROUTES;
