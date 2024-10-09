let intervalId = null;
let timer = 0;
let workDuration = 0;
let breakDuration = 0;
let isBreakTime = false;
let isPaused = false;

function startTimer() {
    // Evitar iniciar múltiples temporizadores
    if (intervalId !== null) {
        alert("El temporizador ya está en marcha.");
        return;
    }

    // Obtener minutos del input
    const workMinutes = document.getElementById("work-minutes").value;
    const breakMinutes = document.getElementById("break-minutes").value;

    // Validar input
    if (!isValidInput(workMinutes) || !isValidInput(breakMinutes)) {
        alert("Por favor ingresa valores válidos para los minutos.");
        return;
    }

    // Convertir minutos a segundos
    workDuration = parseInt(workMinutes) * 60;
    breakDuration = parseInt(breakMinutes) * 60;
    timer = workDuration;
    isBreakTime = false; // Empezamos con el tiempo de trabajo

    // Iniciar el temporizador
    intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const display = document.querySelector("#time");

    // Calcular minutos y segundos restantes
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);

    // Formatear con ceros a la izquierda
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Mostrar tiempo en pantalla y en el título
    display.textContent = `${formattedMinutes}:${formattedSeconds}`;
    document.title = `${formattedMinutes}:${formattedSeconds} - Countdown Timer`;

    // Decrementar el temporizador
    timer--;

    // Cambiar entre tiempo de trabajo y descanso
    if (timer < 0) {
        if (isBreakTime) {
            timer = workDuration;
            isBreakTime = false;
            display.classList.remove("break"); // Volver al gris
            playWorkSound();
        } else {
            timer = breakDuration;
            isBreakTime = true;
            display.classList.add("break"); // Cambiar a rojo
            playBreakSound();
        }
    }
}

function pause() {
    if (intervalId !== null && !isPaused) {
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
    }
}

function resume() {
    if (intervalId === null && isPaused) {
        intervalId = setInterval(updateTimer, 1000);
        isPaused = false;
    }
}

function reset() {
    if (confirm("¿Estás seguro que deseas reiniciar el temporizador?")) {
        clearInterval(intervalId);
        intervalId = null;
        timer = workDuration;
        isBreakTime = false;
        isPaused = false;

        // Resetear el color al gris
        const display = document.querySelector("#time");
        display.classList.remove("break");

        // Actualizar la pantalla al tiempo inicial
        const minutes = Math.floor(workDuration / 60);
        const seconds = Math.floor(workDuration % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        display.textContent = `${formattedMinutes}:${formattedSeconds}`;
        
        playResetSound();
    }
}

function isValidInput(value) {
    return /^\d+$/.test(value) && parseInt(value) > 0;
}

function playBreakSound() {
    const audio = new Audio('sounds/stop-sound-effect.mp3');
    audio.play();
}

function playWorkSound() {
    const audio = new Audio('sounds/back-to-work-bak-to-work.mp3');
    audio.play();
}

function playResetSound() {
    const audio = new Audio('sounds/preview_4.mp3');
    audio.play();
}
