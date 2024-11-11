export default function ({ store, redirect }) {
  // Check if the user is not logged in or the token is missing/expired
  if (!store.state.auth.isLoggedIn || !store.state.auth.token) {
    // Optionally, you can clear any residual auth data here

    // Redirect to the login page if not authenticated
    return redirect('');
  }
}
