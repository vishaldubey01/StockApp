import admin, { ServiceAccount } from "firebase-admin";
import { Auth } from "firebase-admin/auth";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

console.log("[FIREBASE] RUNNING", firebaseApp.options.projectId);

const firebaseAuth: Auth = admin.auth(firebaseApp);

export { admin, firebaseApp, firebaseAuth };
