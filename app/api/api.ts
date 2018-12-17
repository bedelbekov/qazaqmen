import firebase from "firebase";
import "firebase/firestore";
import config from "../config";

const firebaseApp = firebase.initializeApp(config);

const api = firebaseApp.firestore();
api.settings({ timestampsInSnapshots: true });

export default api;
