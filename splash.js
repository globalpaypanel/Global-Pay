window.onload = function () {

    const audio = new Audio("startup.mp3");
    audio.play().catch(() => {});

    setTimeout(function () {
        window.location.href = "home.html";
    }, 3000);

};
