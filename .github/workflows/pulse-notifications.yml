import admin from "firebase-admin";

const serviceAccount = JSON.parse(
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

async function sendNotifications(){

    console.log(
        "🚀 Iniciando envio..."
    );

    const snapshot =
    await db
    .collection("tokens")
    .get();

    if(snapshot.empty){

        console.log(
            "⚠️ Nenhum token encontrado."
        );

        return;

    }

    let success = 0;
    let failed = 0;

    for(const doc of snapshot.docs){

        const data =
        doc.data();

        const token =
        data.token;

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

            success++;

            console.log(
                `✅ Enviado para ${data.uid}`
            );

        }
        catch(error){

            failed++;

            console.error(
                `❌ Erro em ${data.uid}:`,
                error.message
            );

        }

    }

    console.log(
        `🎉 Concluído. Sucesso: ${success} | Falhas: ${failed}`
    );

}

sendNotifications()
.catch(console.error);
