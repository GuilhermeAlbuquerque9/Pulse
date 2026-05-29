import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getAnalytics }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

const firebaseConfig = {

apiKey: "AIzaSyCPn6wULrYReJg5MwzErS69kXBwW06VONw",

authDomain:
"retropixel-pulse-rp.firebaseapp.com",

projectId:
"retropixel-pulse-rp",

storageBucket:
"retropixel-pulse-rp.firebasestorage.app",

messagingSenderId:
"425815558789",

appId:
"1:425815558789:web:b69baaa9c8329fecd877ec",

measurementId:
"G-3EK1LNF2NY"

};

const app =
initializeApp(firebaseConfig);

const analytics =
getAnalytics(app);

export { app };