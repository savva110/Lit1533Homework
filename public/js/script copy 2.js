fetch("/get-names")
.then(res => res.json())
.then(data => {
    const getClass = document.querySelector(".getClass");
    const setClass = getClass.querySelector(".class");
    const setGroup = getClass.querySelector(".group");

    data.forEach(className => {
        setClass.innerHTML += `<option value="${className[0]}">${className[0]}</option>`;
    });

    setClass.addEventListener("change", () => {
        setGroup.innerHTML = `<option value="option0">--Выберите группу--</option>`;
        data.forEach(className => {
            if (className[0] == setClass.value) {
                className[1].forEach((groupName, groupNameCount) => {
                    setGroup.innerHTML += `<option value="${groupName}">${groupName} группа</option>`;
                });
            }
        })
    })

    getClass.querySelector(".accept").addEventListener("click", () => {
        const scheduleHTML = document.querySelector(".schedule");
        const homeworkHTML = document.querySelector(".homework");

        scheduleHTML.innerHTML = "";
        homeworkHTML.innerHTML = "";

        if (setClass.value != "option0" && setGroup.value != "option0") {
            fetch(`/get-schedule/${setClass.value}/${setGroup.value}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);

                const time = data.time;
                const schedule = data.schedule;
                const homework = data.homeworks;
                const groups = data.groups;
                
                // РАСПИСАНИЕ
                let maxLessons = 0;
                Object.keys(schedule).forEach(day => {
                    const lessonsCount = Object.keys(schedule[day].lessons).length;
                    if (maxLessons < lessonsCount) maxLessons = lessonsCount;
                })
                
                let daysList = "";
                Object.keys(schedule).forEach(day => {
                    daysList += `<td>${schedule[day].dayName}</td>`;
                })

                let scheduleText = ""
                scheduleText += `
                    <table><tbody><tr><td></td><td></td><td></td>${daysList}</tr>
                `;

                for (let i = 0; i < maxLessons; i++) {
                    let startTime = time[i].start;
                    let endTime = time[i].end;

                    let lessonsText = "";
                    for (let i1 = 0; i1 < Object.keys(schedule).length; i1++) {
                        try {
                            const dayObj = schedule[`day${i1+1}`].lessons[`lesson${i+1}`];
                            const room = groups[`group${setGroup.value}`].schedule[`day${i1+1}`].rooms[`lessonRoom${i+1}`];

                            lessonsText += `<td style="color:#${dayObj.color}">${dayObj.lesson} ${room}</td>`;
                        }
                        catch {
                            lessonsText += `<td></td>`;
                        }
                    }

                    scheduleText += `
                        <tr><td>${i+1}</td><td>${startTime}</td><td>${endTime}</td>${lessonsText}</tr>
                    `;
                }
                scheduleText += `</tbody></table>`;
                scheduleHTML.innerHTML = scheduleText;

                // ДОМАШКА
                console.log(homework);
                let homeworkText = `<ul>`
                for (let i = 0; i < Object.keys(homework).length; i++) {
                    const homeworkObj = homework[`homework${i+1}`]
                    homeworkText += `<li><a style="color:#${homeworkObj.color}" href="${homeworkObj.link}">${homeworkObj.homework}</a></li>`
                }
                homeworkText += `</ul>`;
                homeworkHTML.innerHTML = homeworkText;
            })
        }
    })
});