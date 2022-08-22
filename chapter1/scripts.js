function moveon() {
    let answer = confirm("Ready to move on?");
    if(answer){
        window.location = "https://www.google.com"
    }
}
setTimeout(moveon, 60000);