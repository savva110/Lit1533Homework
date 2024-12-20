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
    });
    
    getClass.addEventListener("change", () => {
        const scheduleHTML = document.querySelector(".schedule");
        const homeworkHTML = document.querySelector(".homework");

        scheduleHTML.innerHTML = "";
        homeworkHTML.innerHTML = "";

        if (setClass.value != "option0" && setGroup.value != "option0") {
            fetch(`/get-schedule/${setClass.value}/${setGroup.value}`)
            .then(res => res.json())
            .then(data => {

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
                for (let i = 0; i < Object.keys(schedule).length; i++) {
                    daysList += `<td class="bold day${i+1}">${schedule[`day${i+1}`].dayName}</td>`;
                }


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
                            const room = groups[`group${setGroup.value}`].schedule[`roomsDay${i1+1}`][`lessonRoom${i+1}`];
                            
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
                let aTarget = ""

                if (
                    navigator.userAgent.includes('Android') ||
                    navigator.userAgent.includes('iPhone')  ||
                    navigator.userAgent.includes('iPad')
                ) {
                    aTarget = ""
                } else {
                    aTarget = `target="_blank"`
                }

                let homeworkText = `<ul>`
                for (let i = 0; i < Object.keys(homework).length; i++) {
                    const homeworkObj = homework[`homework${i+1}`]
                    homeworkText += `<li><a style="color:#${homeworkObj.color}" href="${homeworkObj.link}" ${aTarget}">${homeworkObj.homework}</a></li>`
                }
                homeworkText += `</ul>`;
                homeworkHTML.innerHTML = homeworkText;


                // ЦВЕТ ДНЯ

                let date = new Date()
                let hours = date.getHours()
                let minutes = date.getMinutes()

                let number = date.getDay()

                let today = document.querySelector(`.day${number}`)
                let nextDay = document.querySelector(`.day${number+1}`)

                let yesterday = document.querySelector(`.day${number-1}`)

                function updateTime(){
                    try {
                        date = new Date()
                        hours = date.getHours()
                        minutes = date.getMinutes()
    
                        number = date.getDay()
    
                        // Day color
    
                        yesterday = document.querySelector(`.day${number-1}`)
                        today = document.querySelector(`.day${number}`)
                        nextDay = document.querySelector(`.day${number+1}`)
    
                        if(nextDay == null) { nextDay = document.querySelector(`.day${1}`) }
    
                        if(yesterday != null) { yesterday.style.color = "" }
                        if(yesterday != null) { today.style.color = "" }
    
                        if(today != null) { today.style.color = "red" } 
                        nextDay.style.color = "lime"
                    }
                    catch {
                        null;
                    }
                }
                updateTime()
                setInterval(updateTime, 10000);
            })
        }
    })
});