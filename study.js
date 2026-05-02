let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function renderList() {
    let list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach(sub => {
        let li = document.createElement("li");
        li.innerText = sub.name + " (" + sub.priority + ")";
        list.appendChild(li);
    });
}

function addSubject() {
    let name = document.getElementById("subject").value;
    let priority = document.getElementById("priority").value;

    if (name === "") return;

    subjects.push({ name, priority: parseFloat(priority) });

    localStorage.setItem("subjects", JSON.stringify(subjects));

    renderList();
    document.getElementById("subject").value = "";
}

function generatePlan() {

    let totalHours = document.getElementById("hours").value;

    if (subjects.length === 0 || totalHours === "") {
        alert("Add subjects and hours");
        return;
    }

    let totalWeight = subjects.reduce((sum, sub) => sum + sub.priority, 0);

    let startTime = 9; // 9 AM
    let result = "<h3>Today's Smart Plan:</h3>";

    subjects.forEach(sub => {
        let time = (totalHours * sub.priority / totalWeight).toFixed(2);

        let endTime = startTime + parseFloat(time);

        result += `<p>📘 ${sub.name} (${sub.priority}) → ${startTime}:00 - ${endTime.toFixed(2)} hrs</p>`;

        startTime = endTime;
    });

    document.getElementById("output").innerHTML = result;
}

renderList();