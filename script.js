document.addEventListener("DOMContentLoaded", function() {
    const minutesInput = document.getElementById("minutes");
    const startButton = document.getElementById("startButton");
    const countdownText = document.getElementById("countdownText");
    const endTimeText = document.getElementById("endTime");
    const alarm = document.getElementById("alarm");
    const message = document.getElementById("message");
    const okButton = document.getElementById("okButton");

    let countdownInterval;

    minutesInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            startCountdown();
        }
    });

    startButton.addEventListener("click", startCountdown);

    function startCountdown() {
        const minutes = parseInt(minutesInput.value);
        if (isNaN(minutes) || minutes <= 0) {
            return;
        }

        const endTime = new Date(Date.now() + minutes * 60000);
        updateEndTime(endTime);

        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const currentTime = new Date().getTime();
            const remainingTime = endTime - currentTime;

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownText.textContent = "00:00";
                alarm.play();
                message.classList.remove("hidden");
            } else {
                const minutesRemaining = Math.floor(remainingTime / 60000);
                const secondsRemaining = Math.floor((remainingTime % 60000) / 1000);
                countdownText.textContent = `${minutesRemaining.toString().padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`;
            }
        }
    }

    function updateEndTime(endTime) {
        const endHour = endTime.getHours().toString().padStart(2, "0");
        const endMinute = endTime.getMinutes().toString().padStart(2, "0");
        endTimeText.textContent = `Finaliza a las ${endHour}:${endMinute}`;
    }

    okButton.addEventListener("click", function() {
        message.classList.add("hidden");
        minutesInput.value = "";
        clearInterval(countdownInterval);
        countdownText.textContent = "00:00";
        endTimeText.textContent = "";
    });
});
