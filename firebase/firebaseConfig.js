import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnL9pw-cO_DLHSSNEAkaxfyvotrRfHzX4",
  authDomain: "apipelis-c9a56.firebaseapp.com",
  projectId: "apipelis-c9a56",
  storageBucket: "apipelis-c9a56.firebasestorage.app",
  messagingSenderId: "1047185816544",
  appId: "1:1047185816544:web:6d66b5a0426b58cdb08985"
};

// Inicializar Firebase de forma segura: si ya existe una app, reutilizarla.
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  try {
    app = getApp();
  } catch (e) {
    // Si por alguna razón getApp falla, inicializamos con la configuración actual
    app = initializeApp(firebaseConfig);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };