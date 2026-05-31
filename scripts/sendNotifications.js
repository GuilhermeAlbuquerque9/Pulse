import admin from "firebase-admin";

const serviceAccount =
JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({

    credential:
    admin.credential.cert(
        serviceAccount
    )

});

const db =
admin.firestore();

const dayMap = {

    0: "Dom",
    1: "Seg",
    2: "Ter",
    3: "Qua",
    4: "Qui",
    5: "Sex",
    6: "Sáb"

};

async function sendNotifications(){

    console.log(
        "🚀 Iniciando verificação..."
    );

    const now =
    new Date();

    const currentDay =
    dayMap[now.getDay()];

    const currentTime =
    now.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "America/Fortaleza"
        }
    );

    const notificationStamp =
    `${currentDay}-${currentTime}`;

    console.log(
        `📅 ${currentDay}`
    );

    console.log(
        `⏰ ${currentTime}`
    );

    const usersSnapshot =
    await db
    .collection("users")
    .get();

    let sentCount = 0;

    for(const userDoc of usersSnapshot.docs){

        const uid =
        userDoc.id;

        const user =
        userDoc.data();

        const days =
        user.days || [];

        const notificationTime =
        user.notificationTime;

        const notificationsEnabled =
        user.notificationsEnabled;

        const lastNotificationSent =
        user.lastNotificationSent || "";

        if(
            !notificationsEnabled
        ){

            continue;

        }

        if(
            !days.includes(
                currentDay
            )
        ){

            continue;

        }

        if(
            notificationTime !==
            currentTime
        ){

            continue;

        }

        if(
            lastNotificationSent ===
            notificationStamp
        ){

            console.log(
                `⏭️ Já enviado para ${uid}`
            );

            continue;

        }

        const tokenSnapshot =
        await db
        .collection("tokens")
        .where(
            "uid",
            "==",
            uid
        )
        .get();

        if(
            tokenSnapshot.empty
        ){

            continue;

        }

        let delivered =
        false;

        for(
            const tokenDoc
            of tokenSnapshot.docs
        ){

            const token =
            tokenDoc.data().token;

            if(!token){

                continue;

            }

            try{

                await admin
                .messaging()
                .send({

                    token,

                    notification: {

                        title:
                        "🔔 Pulse",

                        body:
                        "Você tem uma nova notícia! Abra o Pulse para conferir."

                    }

                });

                delivered = true;

                sentCount++;

                console.log(
                    `✅ Enviado para ${uid}`
                );

            }
            catch(error){

                console.error(
                    `❌ ${uid}:`,
                    error.message
                );

            }

        }

        if(delivered){

            await db
            .collection("users")
            .doc(uid)
            .update({

                lastNotificationSent:
                notificationStamp

            });

        }

    }

    console.log(
        `🎉 Finalizado. ${sentCount} notificações enviadas.`
    );

}

sendNotifications()
.catch(console.error);
