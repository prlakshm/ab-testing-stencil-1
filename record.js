// generate a random UID for this user, on page load.
const UID = Math.round(Math.random() * 1000000);
// takes in an event object and updates local storage to contain that event
const recordAction = event => {
    let data = localStorage.getItem("cs1300-ab-testing-data");
    data = JSON.parse(data);
    // check if parsing is correct
    if (!Array.isArray(data)) {
        console.error("DATA is not an array")
        return;
    }

    // get version form the meta tag on the html file
    const version = document.querySelector("meta[name='version']").getAttribute("content");
    const uid = UID;
    const timestamp = Date.now().toString();
    const action = event.type;
    let target = event.target.tagName;
    let targetId = event.target.id;
    if (target == null) {
        target = 'N/A'
    }
    if (targetId) {
        target += `#${targetId}`
    }
    data.push({uid, version, action, target, timestamp});

    localStorage.setItem("cs1300-ab-testing-data", JSON.stringify(data));
}
// to be called on the click that determined when the task is completed to clean up event listeners
const done = event => {
    // record this event
    recordAction(event);

    // TODO: remove event listeners
    window.removeEventListener('load', recordAction);
    window.removeEventListener('click', recordAction);

    location.href = 'index.html';
}

window.addEventListener('load', recordAction);
window.addEventListener('click', recordAction);
