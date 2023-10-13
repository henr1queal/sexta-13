function getNextFridays13() {
    const today = new Date();
    const fridaysList = document.getElementById("fridays-list");
    fridaysList.innerHTML = "";

    const languageSelector = document.getElementById("language");
    const language = languageSelector.value;
    const halloweenHeader = document.getElementById("halloween-header");
    const languageLabel = document.getElementById("language-label");
    const languageOption = document.getElementById("language-option");
    let string = "";

    if (language === 'en') {
        halloweenHeader.innerHTML = 'Next <br class="br"> Fridays the 13th:';
        languageLabel.innerHTML = 'Language';
        languageOption.innerHTML = 'English';
        if (isFriday13th()) {
            document.getElementById('is-friday-13st').textContent = 'Today is friday 13th!'
        }
        string = (daysRemaining) => {
            if (daysRemaining === 1) {
                return 'Tomorrow!';
            } else {
                return `${daysRemaining} days left`;
            }
        };
    } else {
        halloweenHeader.innerHTML = 'Próximas <br class="br"> Sextas-feiras 13:';
        languageLabel.innerHTML = 'Idioma';
        languageOption.innerHTML = 'Inglês';
        if (isFriday13th()) {
            document.getElementById('is-friday-13st').textContent = 'Hoje é sexta-feira 13!'
        }
        string = (daysRemaining) => {
            if (daysRemaining === 1) {
                return 'É amanhã!';
            } else {
                return `Faltam ${daysRemaining} dias`;
            }
        };
    }
    let count = 0;

    while (count < 10) {
        today.setDate(today.getDate() + 1);
        if (today.getDate() === 13 && today.getDay() === 5) {
            const li = document.createElement("li");
            li.innerHTML = formatFridays13(today, language, string);
            fridaysList.appendChild(li);
            count++;
        }
    }
}

function formatFridays13(date, language, string) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateStr = formatDate(date, language);
    const daysRemaining = calculateDaysRemaining(date);
    return dateStr.replace(/(\d{2})/, '<strong>$1</strong>') + ` <br class="br">(${string(daysRemaining)})`;
}

function formatDate(date, language) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    if (language === "en") {
        return date.toLocaleDateString("en-US", options);
    } else {
        return date.toLocaleDateString("pt-BR", options);
    }
}

function calculateDaysRemaining(friday) {
    const today = new Date();
    const timeDifference = friday.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
}

const languageSelector = document.getElementById("language");
languageSelector.addEventListener("change", getNextFridays13);
getNextFridays13();

function isFriday13th() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayOfMonth = today.getDate();
    const fridayText = document.getElementById('is-friday-13st');

    if (dayOfWeek === 5 && dayOfMonth === 13) {
        return true;
    } else {
        return false;
    }
}

if (isFriday13th()) {
    document.getElementById('is-friday-13st').textContent = 'Hoje é sexta-feira 13!';
}