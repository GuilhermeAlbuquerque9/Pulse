import { app } from "./firebase-config.js";

import {
  getMessaging,
  getToken
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";

const messaging = getMessaging(app);

export async function registerFCM() {

  try {

    const token = await getToken(
      messaging,
      {
        vapidKey: "BIKU2Wu0xdPmXc3BOUTliDYYmZtNo9HRKggA5vLgVHDn7WEc8ljC4QEu6jKXu0XfBzDNGAfQkNWoorpyOA9gerY"
      }
    );

    console.log("FCM Token:", token);

    return token;

  } catch(error) {

    console.error(error);

  }

}