module.exports = async (req, res) => {
    const { initializeApp, cert } = require("firebase-admin/app");
    const { getFirestore } = require("firebase-admin/firestore");

    // Fetch the service account key JSON file contents
    var serviceAccount = require("../serviceAccountKey.json");

    // Initialize the app with a service account, granting admin privileges
    initializeApp({
        credential: cert(serviceAccount),
    });

    const db = getFirestore();
    const counterRef = db.collection("counter").doc("views");
    const doc = await counterRef.get();
    if (!doc.exists) {
        var views = { count: 1 };
        await counterRef.set(views);
    } else {
        var views = doc.data();
        var update_view = { count: views.count + 1 }
        await counterRef.set(update_view);
    }

    const { name } = req.query;
    res.status(200).send(`Views ${views.count}!`);
};
