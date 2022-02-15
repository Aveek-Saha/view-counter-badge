module.exports = async (req, res) => {
    const { initializeApp, cert } = require("firebase-admin/app");
    const { getFirestore } = require("firebase-admin/firestore");
    const { makeBadge, ValidationError } = require("badge-maker");

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
        var new_count = 1
        var views = { count: new_count };
        await counterRef.set(views);
    } else {
        var views = doc.data();
        var new_count = views.count + 1
        var update_view = { count: new_count };
        await counterRef.set(update_view);
    }

    const format = {
        label: "Views",
        message: new_count.toString(),
        color: "green",
    };

    const svg = makeBadge(format);

    const { name } = req.query;
    res.status(200).send(svg);
};
