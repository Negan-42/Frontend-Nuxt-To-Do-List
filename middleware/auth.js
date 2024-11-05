export default function ({ store, redirect }) {
    // Check if the user is authenticated
    if (!store.state.auth.token) {
      return redirect('/login'); // Redirect to login if no token is found
    }
  }
  