// Authentification de démonstration : aucun backend n'est branché.
// À remplacer par une vraie session (cookie httpOnly) dès que l'API existe.
const SESSION_KEY = "ibigo-session";

const DEMO_ACCOUNT = { email: "ibigotest@gmail.com", password: "admin123" };

export function signIn(email: string, password: string) {
  if (email.trim().toLowerCase() === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
    try {
      localStorage.setItem(SESSION_KEY, DEMO_ACCOUNT.email);
    } catch {}
    return true;
  }
  return false;
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function readSession() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}
