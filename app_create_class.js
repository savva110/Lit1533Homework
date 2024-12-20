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

// 7.2
// const colRef = db.collection("homeworks");
// const docRef = colRef.doc("7.2");
// docRef.set({
//     name: "7.2",
//     groups: {
//         group1: {
//             group: 1,
//             schedule: {
//                 roomsDay1: {
//                     lessonRoom1: "201",
//                     lessonRoom2: "307",
//                     lessonRoom3: "307",
//                     lessonRoom4: "303",
//                     lessonRoom5: "301",
//                     lessonRoom6: "0",
//                     lessonRoom7: "405",
//                 },
//                 roomsDay2: {
//                     lessonRoom1: "211",
//                     lessonRoom2: "211",
//                     lessonRoom3: "501",
//                     lessonRoom4: "303",
//                     lessonRoom5: "405",
//                     lessonRoom6: "301",
//                 },
//                 roomsDay3: {
//                     lessonRoom1: "303",
//                     lessonRoom2: "301",
//                     lessonRoom3: "305",
//                     lessonRoom4: "305",
//                     lessonRoom5: "507",
//                     lessonRoom6: "302",
//                 },
//                 roomsDay4: {
//                     lessonRoom1: "402",
//                     lessonRoom2: "303",
//                     lessonRoom3: "303",
//                     lessonRoom4: "301",
//                     lessonRoom5: "501",
//                     lessonRoom6: "507",
//                 },
//                 roomsDay5: {
//                     lessonRoom1: "0",
//                     lessonRoom2: "405",
//                     lessonRoom3: "301",
//                     lessonRoom4: "303",
//                     lessonRoom5: "301",
//                 },
//                 roomsDay6: {
//                     lessonRoom1: "302",
//                     lessonRoom2: "405",
//                     lessonRoom3: "211",
//                     lessonRoom4: "211",
//                     lessonRoom5: "503",
//                     lessonRoom6: "202",
//                 },
//             },
//             homeworks: {
//                 homework1: {color: "e4a716", homework: "Руcский язык", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/3/6610/"},
//                 homework2: {color: "1773e6", homework: "Алгебра", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/23/5921/"},
//                 homework3: {color: "f22007", homework: "Английский язык", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/19/5451/"},
//                 homework4: {color: "30cb6c", homework: "Литература", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/8/6610/"},
//                 homework5: {color: "fa760a", homework: "Геометрия", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/4/6126/"},
//                 homework6: {color: "08531f", homework: "География", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/13/98/"},
//                 homework7: {color: "3b3e8f", homework: "Физика", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//                 homework8: {color: "717717", homework: "Биология", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/28/64/"},
//                 homework9: {color: "61eeb3", homework: "ВиС", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/56/5921/"},
//                 homework10: {color: "950dd5", homework: "ОПП", link: "https://classroom.google.com/u/2/c/NTQ1ODE4MTYzMjI1"},
//                 homework11: {color: "378c93", homework: "Информатика", link: "https://classroom.google.com/u/2/c/NzA5NzcwNTgxNjA0"},
//                 homework12: {color: "0428b4", homework: "Технология", link: "https://classroom.google.com/u/2/c/NzEzNDY1NTEyNTU3"},
//                 homework13: {color: "c993d2", homework: "Музыка", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/27/1858/"},
//                 homework14: {color: "9c5399", homework: "ИЗО", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/22/5453/"},
//                 homework15: {color: "915436", homework: "История", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//                 homework16: {color: "b3563b", homework: "Обществознание", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//             }
//         },
//         group2: {
//             group: 2,
//             schedule: {
//                 roomsDay1: {
//                     lessonRoom1: "201",
//                     lessonRoom2: "408",
//                     lessonRoom3: "408",
//                     lessonRoom4: "303",
//                     lessonRoom5: "301",
//                     lessonRoom6: "0",
//                     lessonRoom7: "405",
//                 },
//                 roomsDay2: {
//                     lessonRoom1: "410",
//                     lessonRoom2: "410",
//                     lessonRoom3: "501",
//                     lessonRoom4: "303",
//                     lessonRoom5: "405",
//                     lessonRoom6: "301",
//                 },
//                 roomsDay3: {
//                     lessonRoom1: "303",
//                     lessonRoom2: "301",
//                     lessonRoom3: "307",
//                     lessonRoom4: "307",
//                     lessonRoom5: "507",
//                     lessonRoom6: "302",
//                 },
//                 roomsDay4: {
//                     lessonRoom1: "402",
//                     lessonRoom2: "303",
//                     lessonRoom3: "303",
//                     lessonRoom4: "301",
//                     lessonRoom5: "501",
//                     lessonRoom6: "507",
//                 },
//                 roomsDay5: {
//                     lessonRoom1: "0",
//                     lessonRoom2: "405",
//                     lessonRoom3: "301",
//                     lessonRoom4: "303",
//                     lessonRoom5: "301",
//                 },
//                 roomsDay6: {
//                     lessonRoom1: "302",
//                     lessonRoom2: "405",
//                     lessonRoom3: "410",
//                     lessonRoom4: "410",
//                     lessonRoom5: "503",
//                     lessonRoom6: "202",
//                 },
//             },
//             homeworks: {
//                 homework1: {color: "e4a716", homework: "Руcский язык", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/3/6610/"},
//                 homework2: {color: "1773e6", homework: "Алгебра", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/23/5921/"},
//                 homework3: {color: "f22007", homework: "Английский язык", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/19/89/"},
//                 homework4: {color: "30cb6c", homework: "Литература", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/8/6610/"},
//                 homework5: {color: "fa760a", homework: "Геометрия", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/4/6126/"},
//                 homework6: {color: "08531f", homework: "География", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/13/98/"},
//                 homework7: {color: "3b3e8f", homework: "Физика", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//                 homework8: {color: "717717", homework: "Биология", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/28/64/"},
//                 homework9: {color: "61eeb3", homework: "ВиС", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/56/5921/"},
//                 homework10: {color: "950dd5", homework: "ОПП", link: ""},
//                 homework11: {color: "378c93", homework: "Информатика", link: ""},
//                 homework12: {color: "0428b4", homework: "Технология", link: ""},
//                 homework13: {color: "c993d2", homework: "Музыка", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/27/1858/"},
//                 homework14: {color: "9c5399", homework: "ИЗО", link: "https://in.lit.msu.ru/Ulysses/2024-2025/7/22/5453/"},
//                 homework15: {color: "915436", homework: "История", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//                 homework16: {color: "b3563b", homework: "Обществознание", link: "https://school.mos.ru/diary/homeworks/homeworks"},
//             }
//         }
//     },
//     time: [
//         {start: "9:00", end: "9:45"},
//         {start: "9:55", end: "10:40"},
//         {start: "10:05", end: "11:35"},
//         {start: "11:45", end: "12:30"},
//         {start: "12:50", end: "13:35"},
//         {start: "13:55", end: "14:40"},
//         {start: "14:50", end: "15:35"},
//     ],
//     schedule: {
//         day1: {
//             dayName: "Понедельник",
//             lessons: {
//                 lesson1: {color: "000000", lesson: "Разговоры о важном"},
//                 lesson2: {color: "950dd5", lesson: "ОПП"},
//                 lesson3: {color: "378c93", lesson: "Информатика"},
//                 lesson4: {color: "1773e6", lesson: "Алгебра"},
//                 lesson5: {color: "e4a716", lesson: "Русский язык"},
//                 lesson6: {color: "888888", lesson: "Физкультура"},
//                 lesson7: {color: "915436", lesson: "История"},
//             }
//         },
//         day2: {
//             dayName: "Вторник",
//             lessons: {
//                 lesson1: {color: "f22007", lesson: "Английский язык"},
//                 lesson2: {color: "f22007", lesson: "Английский язык"},
//                 lesson3: {color: "08531f", lesson: "География"},
//                 lesson4: {color: "1773e6", lesson: "Алгебра"},
//                 lesson5: {color: "915436", lesson: "История"},
//                 lesson6: {color: "e4a716", lesson: "Русский язык"},
//             }
//         },
//         day3: {
//             dayName: "Среда",
//             lessons: {
//                 lesson1: {color: "1773e6", lesson: "Алгебра"},
//                 lesson2: {color: "e4a716", lesson: "Русский язык"},
//                 lesson3: {color: "0428b4", lesson: "Техноголия"},
//                 lesson4: {color: "0428b4", lesson: "Техноголия"},
//                 lesson5: {color: "3b3e8f", lesson: "Физика"},
//                 lesson6: {color: "fa760a", lesson: "Геометрия"},
//             }
//         },
//         day4: {
//             dayName: "Четверг",
//             lessons: {
//                 lesson1: {color: "c993d2", lesson: "Музыка"},
//                 lesson2: {color: "1773e6", lesson: "Алгебра"},
//                 lesson3: {color: "1773e6", lesson: "Алгебра"},
//                 lesson4: {color: "e4a716", lesson: "Русский язык"},
//                 lesson5: {color: "08531f", lesson: "География"},
//                 lesson6: {color: "3b3e8f", lesson: "Физика"},
//             }
//         },
//         day5: {
//             dayName: "Пятница",
//             lessons: {
//                 lesson1: {color: "888888", lesson: "Физкультура"},
//                 lesson2: {color: "fa760a", lesson: "Геометрия"},
//                 lesson3: {color: "30cb6c", lesson: "Литература"},
//                 lesson4: {color: "61eeb3", lesson: "ВиС"},
//                 lesson5: {color: "30cb6c", lesson: "Литература"},
//             }
//         },
//         day6: {
//             dayName: "Суббота",
//             lessons: {
//                 lesson1: {color: "fa760a", lesson: "Геометрия"},
//                 lesson2: {color: "b3563b", lesson: "Обществознание"},
//                 lesson3: {color: "f22007", lesson: "Английский язык"},
//                 lesson4: {color: "f22007", lesson: "Английский язык"},
//                 lesson5: {color: "717717", lesson: "Биология"},
//                 lesson6: {color: "9c5399", lesson: "ИЗО"},
//             }
//         }
//     }
// }, {merge: true});

const colRef = db.collection("homeworks");
const docRef = colRef.doc("");
docRef.set({
    name: "",
    groups: {
        group1: {
            group: 1,
            schedule: {
                roomsDay1: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                    lessonRoom7: "",
                },
                roomsDay2: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay3: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay4: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay5: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                },
                roomsDay6: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
            },
            homeworks: {
                homework1: {color: "", homework: "", link: ""},
                homework2: {color: "", homework: "", link: ""},
                homework3: {color: "", homework: "", link: ""},
                homework4: {color: "", homework: "", link: ""},
                homework5: {color: "", homework: "", link: ""},
                homework6: {color: "", homework: "", link: ""},
                homework7: {color: "", homework: "", link: ""},
                homework8: {color: "", homework: "", link: ""},
                homework9: {color: "", homework: "", link: ""},
                homework10: {color: "", homework: "", link: ""},
                homework11: {color: "", homework: "", link: ""},
                homework12: {color: "", homework: "", link: ""},
                homework13: {color: "", homework: "", link: ""},
                homework14: {color: "", homework: "", link: ""},
                homework15: {color: "", homework: "", link: ""},
                homework16: {color: "", homework: "", link: ""},
            }
        },
        group2: {
            group: 2,
            schedule: {
                roomsDay1: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                    lessonRoom7: "",
                },
                roomsDay2: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay3: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay4: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
                roomsDay5: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                },
                roomsDay6: {
                    lessonRoom1: "",
                    lessonRoom2: "",
                    lessonRoom3: "",
                    lessonRoom4: "",
                    lessonRoom5: "",
                    lessonRoom6: "",
                },
            },
            homeworks: {
                homework1: {color: "", homework: "", link: ""},
                homework2: {color: "", homework: "", link: ""},
                homework3: {color: "", homework: "", link: ""},
                homework4: {color: "", homework: "", link: ""},
                homework5: {color: "", homework: "", link: ""},
                homework6: {color: "", homework: "", link: ""},
                homework7: {color: "", homework: "", link: ""},
                homework8: {color: "", homework: "", link: ""},
                homework9: {color: "", homework: "", link: ""},
                homework10: {color: "", homework: "", link: ""},
                homework11: {color: "", homework: "", link: ""},
                homework12: {color: "", homework: "", link: ""},
                homework13: {color: "", homework: "", link: ""},
                homework14: {color: "", homework: "", link: ""},
                homework15: {color: "", homework: "", link: ""},
                homework16: {color: "", homework: "", link: ""},
            }
        }
    },
    time: [
        {start: "9:00", end: "9:45"},
        {start: "9:55", end: "10:40"},
        {start: "10:05", end: "11:35"},
        {start: "11:45", end: "12:30"},
        {start: "12:50", end: "13:35"},
        {start: "13:55", end: "14:40"},
        {start: "14:50", end: "15:35"},
    ],
    schedule: {
        day1: {
            dayName: "Понедельник",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
                lesson6: {color: "", lesson: ""},
                lesson7: {color: "", lesson: ""},
            }
        },
        day2: {
            dayName: "Вторник",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
                lesson6: {color: "", lesson: ""},
            }
        },
        day3: {
            dayName: "Среда",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
                lesson6: {color: "", lesson: ""},
            }
        },
        day4: {
            dayName: "Четверг",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
                lesson6: {color: "", lesson: ""},
            }
        },
        day5: {
            dayName: "Пятница",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
            }
        },
        day6: {
            dayName: "Суббота",
            lessons: {
                lesson1: {color: "", lesson: ""},
                lesson2: {color: "", lesson: ""},
                lesson3: {color: "", lesson: ""},
                lesson4: {color: "", lesson: ""},
                lesson5: {color: "", lesson: ""},
                lesson6: {color: "", lesson: ""},
            }
        }
    }
}, {merge: true});
