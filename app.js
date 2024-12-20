const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const firebaseAdmin = require("firebase-admin");
const { group } = require("console");
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

const app = express();
const port = 3000;

const firebaseConfig = {
    apiKey: "AIzaSyAMIXRavGGwzOdMWOAkvGtMkkhj5hG3Xt8",
    authDomain: "test1-1f69c.firebaseapp.com",
    projectId: "test1-1f69c",
    storageBucket: "test1-1f69c.appspot.com",
    messagingSenderId: "900878754129",
    appId: "1:900878754129:web:a0924f25c12198ac4cf370"
};

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore();

async function getDocumentNames() {
    try {
        const colRef = db.collection("homeworks");
        
        const snapshot = await colRef.get();
        
        if (snapshot.empty) {
            console.log("No documents found.");
            return [];
        }

        const classGroups = [];

        snapshot.forEach(doc => {
            const className = doc.data().name;
            const groups = doc.data().groups;

            const groupNumbers = Object.keys(groups).map(groupKey => groups[groupKey].group.toString());

            classGroups.push([className, groupNumbers]);
        });

        return classGroups;
    } catch (error) {
        console.error("Error fetching classes and groups:", error);
        return [];
    }
}

async function getSchedule(classSchedule, groupSchedule) {
    try {
        const docRef = db.collection("homeworks").doc(classSchedule);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log("No such document!");
            return [];
        }

        const data = doc.data();
        const groupData = data.groups[`group${groupSchedule}`];

        if (!groupData) {
            console.log("Group not found!");
            return [];
        }

        return {
            schedule: data.schedule,
            homeworks: groupData.homeworks,
            time: data.time,
            groups: data.groups
        };
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return [];
    }
}


app.get("/get-names", async (req, res) => {
    const documentNames = await getDocumentNames();
    if (documentNames.length === 0) {
        return res.status(404).send("No documents found.");
    }
    res.status(200).json(documentNames);
});

app.get("/get-schedule/:class/:group", async (req, res) => {
    const classSchedule = req.params.class;
    const groupSchedule = req.params.group;

    const scheduleData = await getSchedule(classSchedule, groupSchedule);
    if (!scheduleData || Object.keys(scheduleData).length === 0) {
        return res.status(404).send("No schedule found.");
    }
    
    res.status(200).json(scheduleData);
});


app.get("/", (req, res) => {
    res.render("index", {});
});

app.get("/:class/:group", (req, res) => {
    const params = req.params;

    res.render("index", {class: params.class, group: params.group});
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
