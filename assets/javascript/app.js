$(document).ready(function() {
    
        function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Let's Go!</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
            
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); 
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
               
            clearInterval(theClock);
            generateWin();
        }
        else {
          
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); 
    
    });  
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up! The correct answer was: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>YAY! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Booooo! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["Who is the first Pokemon in the Pokedex?", "Which Pokemon is in Smash Bros.?", "Which Pokemon was the first Pseudo-Legendary beast?", "What region was first introduced?", "Who trains a destructive Miltank?", "Who is the Leader of Team Skull?", "What was the Alola Region based on?", "Happy Pride Month! What Pokemon is the Rainbow Pokemon?"];
    var answerArray = [["Rhydon", "Pikachu", "Bulbasaur", "Mew"], ["Mewtwo","Jigglypuff","Pikachu","All the Above"], ["Dragonite", "Charizard", "Celebi", "Salamence"], ["Johto","Kanto","Tokyo","Hoenn"], ["Morty", "Misty", "Erika", "Whitney"], ["Giovanni","Plumeria","Guzma","Lusamine"], ["Cambodia", "Japan", "The Bahamas", "Hawaii"], ["Jigglypuff","Jirachi","Magikarp","Ho-Oh"]];
    var imageArray = ["<img src='assets/images/bulbasaur.png'>", "<img class src='assets/images/smash.png'>","<img src='assets/images/dragonite.png'>", "<img src='assets/images/kanto.png'>", "<img src='assets/images/miltank.png'>", "<img src='assets/images/guzma.png'>", "<img src='assets/images/alola.png'>", "<img src='assets/images/hooh.png'>"];
    var correctAnswers = ["C. Bulbasaur", "D. All the Above", "A. Dragonite", "B. Kanto", "D. Whitney", "C. Guzma", "D. Hawaii", "D. Ho-Oh"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("sound/button-click.mp3");