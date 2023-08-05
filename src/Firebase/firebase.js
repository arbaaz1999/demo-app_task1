import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { config } from '../config';

alert("Firebase file is runnning")

const firebaseConfig = {
    apiKey: config.ApiKey,
    authDomain: config.AuthDomain,
    projectId: config.ProjectId,
    storageBucket: config.StorageBucket,
    messagingSenderId: config.MessagingSenderId,
    appId: config.AppId
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)





