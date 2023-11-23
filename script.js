let highscore = parseInt(localStorage.getItem('highscore')) || 0;
let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';


soundEnabled = true;



function playSound(soundFile) {
    if (soundEnabled) {
        const audio = new Audio(soundFile);
        audio.play();
    }
    else {
    }
}



function showSettings() {
    const gameContainer = document.getElementById('game-container');
    const settingsContainer = document.getElementById('settings-container');
    const guessingcont = document.getElementById('newcont');

    gameContainer.style.display = 'none';
    guessingcont.style.display = 'none';
    settingsContainer.style.display = 'block';

    if (window.innerWidth <= 600) {
        navLinks.style.display = 'none'; 
    }

}

function closesettings() {
    const startButtonDiv = document.getElementById("startbuttondiv");
    
    startButtonDiv.style.display = 'block';

    history.back()
    const gameContainer = document.getElementById('game-container');
    const settingsContainer = document.getElementById('settings-container');
    const guessingcont = document.getElementById('newcont');

    settingsContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    guessingcont.style.display = 'block';
}



function soundon() {
    soundEnabled = true;
    document.getElementById("soundOffButton").disabled = false;
    document.getElementById("soundOnButton").disabled = true;

}

function soundoff() {
    soundEnabled = false;
    document.getElementById("soundOnButton").disabled = false;
    document.getElementById("soundOffButton").disabled = true;
}

function startup() {
    const result2Element = document.getElementById("result2");
    result2Element.textContent = `Your HIGH SCORE: ${highscore}`;

    const startButtonDiv = document.getElementById("startbuttondiv");
    
    // Show the start button initially
    startButtonDiv.style.display = 'block';
}




function toggleDarkMode() {
    const darkModeIcon = document.querySelector(".darkmodphoto");
    const lightModeIcon = document.querySelector(".lightmodephoto");

    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        darkModeIcon.style.display = "block";
        lightModeIcon.style.display = "none";
        darkModeEnabled = false;
    } else {
        document.body.classList.add("dark-mode");
        darkModeIcon.style.display = "none";
        lightModeIcon.style.display = "block";
        darkModeEnabled = true;
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let shuffledNumbers = [];
let shuffledColors = [];
let assignedColors = {};
let score = 0;
let timer = 5000;



function startgame() {

    computerguesses = [];
    userguesses = [];

    shuffledNumbers = [1, 2, 3, 4];
    shuffleArray(shuffledNumbers);
    shuffledColors = ['blue', 'red', 'green', 'orange'];
    shuffleArray(shuffledColors);


    const startgameButton = document.getElementById('startgame');
    startgameButton.disabled = true;

    const checkguessButton = document.getElementById('checkGuess');
    checkguessButton.disabled = true;


    const shapes = document.querySelectorAll('.shape p');

    for (let i = 0; i < shuffledColors.length; i++) {
        shapes[i].textContent = shuffledNumbers[i]; 
        const shapeId = `shape${i + 1}`;
        const shape = document.getElementById(shapeId);
        shape.style.backgroundColor = shuffledColors[i]; 
        assignedColors[shapeId] = { color: shuffledColors[i], number: shuffledNumbers[i] };
    }

    console.log(assignedColors)

    setTimeout(() => {
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].textContent = '';
            const shapeId = `shape${i + 1}`;
            const shape = document.getElementById(shapeId);
            shape.style.backgroundColor = 'black';
        }
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        for (const radioButton of radioButtons) {
            radioButton.removeAttribute('disabled');
        }
        checkguessButton.disabled = false;

    }, timer);
}

function getNumberForColor(color) {
    for (const shapeId in assignedColors) {
        if (assignedColors[shapeId].color === color) {
            return assignedColors[shapeId].number;
        }
    }
    return null; 
}


function checkGuessNumbers() {


    computerguesses.push(getNumberForColor('blue'), getNumberForColor('red'), getNumberForColor('green'), getNumberForColor('orange'));

    const resultElement = document.getElementById("result");
    const result2Element = document.getElementById("result2");
    let correctGuess = true;


    for(let i = 0; i <= 3; i++) {
        var userGuess = getSelectedRadioValue('shape-' + (i + 1) + '-color');
        userguesses.push(userGuess)
    }

    
    for (let i = 0; i < 4; i++) {
        if (userguesses[i] !== computerguesses[i]) {
            correctGuess = false;
            break;
        }
    }



    const checkGuessButton = document.getElementById('checkGuess');
    checkGuessButton.disabled = true; 

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    for (const radioButton of radioButtons) {
        radioButton.setAttribute('disabled', true);
    }


    if (correctGuess) {
        score++;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore);
        }
        timer -= 500;
        resultElement.textContent = "Correct guess!";
        resultElement.style.color = "green";
        result2Element.textContent = `Your score: ${score}  HIGH SCORE: ${highscore}`;
        playSound('ding.mp3');
        startgame();
    } else {
        timer = 5000;
        score = 0;
        resultElement.textContent = "Incorrect guess. Try again!";
        resultElement.style.color = "red";
        result2Element.textContent = `Your score: ${score}  HIGH SCORE: ${highscore}`;
        playSound('buzzer.mp3');
        startgame();
    }
}

function getSelectedRadioValue(name) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return parseInt(radioButton.value);
        }
    }
    return null;
}

function getAssignedNumber(color) {
    for (const shapeId in assignedColors) {
        if (assignedColors[shapeId].color === color) {
            return assignedColors[shapeId].number;
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    const darkModeIcon = document.querySelector(".darkmodphoto");
    const lightModeIcon = document.querySelector(".lightmodephoto");

    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        darkModeIcon.style.display = "none";
        lightModeIcon.style.display = "block";
    } else {
        document.body.classList.remove("dark-mode");
        darkModeIcon.style.display = "block";
        lightModeIcon.style.display = "none";
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const cookieConsent = document.getElementById('cookie-consent');

    if (!localStorage.getItem('cookieConsentDismissed')) {
        cookieConsent.style.display = 'block';
    }
});

function dismissCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    cookieConsent.style.display = 'none';
    localStorage.setItem('cookieConsentDismissed', 'true');
}



function submitTestimonial() {
    window.alert("Thank you!")
    emailjs.init("gBlS97W9mCMXx6qRf");
    event.preventDefault();
    var testimonial = document.getElementById('testimonial-2').value;
    var name = document.getElementById('name-2').value;
    var affiliation = document.getElementById('affiliation-2').value;

    // Prepare email parameters
    var emailParams = {
        to_email: "rishibhunji@gmail.com",  
        from_name: name,
        affiliation: affiliation,
        user_testimonial: testimonial
    };

    emailjs.send("default_service", "template_j346pnj", emailParams)
        .then(function(response) {
            console.log("Email sent successfully", response);
            var submittedTestimonials = document.getElementById('submittedTestimonials');
            var newTestimonial = document.createElement('div');
            newTestimonial.innerHTML = '<p><strong>Name:</strong> ' + name + '</p>' +
                                       '<p><strong>Affiliation:</strong> ' + affiliation + '</p>' +
                                       '<p><strong>Testimonial:</strong> ' + testimonial + '</p>';
            submittedTestimonials.appendChild(newTestimonial);

            document.getElementById('testimonial-2').value = '';
            document.getElementById('name-2').value = '';
            document.getElementById('affiliation-2').value = '';
        })
        .catch(function(error) {
            console.error("Error sending email", error);
        });
}


function toggleMenu() {
    console.log("Toggle menu function called!");
    const navLinks = document.getElementById('navLinks');
    const startButtonDiv = document.getElementById('startbuttondiv');

    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
        startButtonDiv.style.display = 'block';
    } else {
        navLinks.style.display = 'block';
        startButtonDiv.style.display = 'none';
    }
}
