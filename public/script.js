function callserver() {
    var req = new XMLHttpRequest();

    req.open("POST", '/recieve', true);
    req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    req.setRequestHeader("X-GitHub-Event", "issues");
    req.onreadystatechange = () => {
        console.log(req.readyState);
        if (req.readyState === 4) {
            console.log(req.response);
        }
    }
    req.send(JSON.stringify({ test: 'Hallo', date: new Date() }));
}