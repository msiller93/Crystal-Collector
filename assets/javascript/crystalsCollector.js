
$(document).ready(function() {

  // This number changes when we click a crystal
  var yourMatchingNumber = 0;

  // This makes our random score we are trying to reach
  var randomNum = randomNumGen();

  
  var wins = 0;
  var losses = 0;
  var crystals;

  // This function will give the crystals random values
  function randomNumCrystals() {
    
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/red.png"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/blue.png"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/yellow.png"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/green.png"
      }
    };
  }

  // This function creates a random number between 19 and 102
  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  //Resets the game once you win or lose
  function setGame() {
    // Resets the score to 0
    yourMatchingNumber = 0;
    // Gives the crystals a random value
    crystals = randomNumCrystals();
    // Resets the random score you are trying to reach
    randomNum = randomNumGen();
    $("#random-score").text(randomNum);
  }

  // This updates the win/loss score
  function updateDom(didUserWin) {
    $("#wins").empty();


    if (didUserWin === true) {
  
      $("#wins").append($("<p>").text("You won!!"));
      setGame();
      renderMatchingNumber();
    }

    else if (didUserWin === false) {

      $("#wins").append($("<p>").text("You lost!!"));
      setGame();
      renderMatchingNumber();
    }

    // Building our win/loss display and appending it to the page.
    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#wins").append(pWins);
    $("#wins").append(pLosses);
  }

  // Function to render our crystals to the page.
  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystal-area").append(crystalDiv);
    }
  }

  // This updates our current score as we click on crystals
  function updateMatchingNumber(crystal) {
   
    yourMatchingNumber += crystals[crystal.attr("data-name")].points;
  }

  // This will show your running score as you are clicking the crystals
  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#running-score").html();
    $("#running-score").html(scoreNumDiv);
  }

  // Starts the game 
  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  
  $(".crystals-button").on("click", function(event) {

    updateMatchingNumber($(this));
    renderMatchingNumber();

   //checking to see if we hit the target random number
    if (yourMatchingNumber === randomNum) {
      // this will add wins if you matched the random number
      wins++;
      setGame();
      updateDom(true);
    }
    // If our guess number exceeded our target number...
    else if (yourMatchingNumber > randomNum) {
      // this will add losses if you did not match the random number
      losses++;
      setGame();
      updateDom(false);
    }
  });

});
