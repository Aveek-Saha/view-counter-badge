module.exports = async (req, res) => {
    const { initializeApp, cert } = require("firebase-admin/app");
    const {
        getFirestore,
        Timestamp,
        FieldValue,
    } = require("firebase-admin/firestore");

    // Fetch the service account key JSON file contents
    var serviceAccount = require("../serviceAccountKey.json");

    // Initialize the app with a service account, granting admin privileges
    initializeApp({
        credential: cert(serviceAccount),
        // The database URL depends on the location of the database
        databaseURL: "https://view-counter-badge-default-rtdb.firebaseio.com",
    });

    const db = getFirestore();
    const counterRef = db.collection("counter").doc("views");
    const doc = await counterRef.get();
    if (!doc.exists) {
        console.log("No such document!");
    } else {
        console.log("Document data:", doc.data());
    }

    const { name } = req.query;
    res.status(200).send(`Hello ${name}!`);
};
