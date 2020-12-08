// Select number of cards for each player.
// Roll dice to see who goes first. Zero is player 1, 1 is player 2.
// Player whose turn it is chooses their action.
  // If the chosen action is to attack, player attacks (SUB). Turn over.
  // If the chosen action is to cast a spell, player casts their spell (SUB). MP is reduced by the spell cost. Turn over.
  // If the chosen action is to swap cards, the first card is moved to the end of the pile, and the next card is put into play (SUB).
  // If the player wants to use an item, they pick which item to use, and then the round is over.
    // A potion restores current fighters' HP.
    // An ether restores current fighters' MP.


$numCards = 0; // Total number of cards per player.
$playerOneCards = []; // Array of objects containing player one's cards.
$playerTwoCards = []; // Array of objects containing player two's cards.
$whichTurn = true; // Designates whose turn it is. True is player 1, false is 2.


$(() => {


  const startGame = () => { // This is called after the number of cards has been selected.

    getCards();

    startRound();

  };


  const getCards = () => {

    // AJAX CALL TO LOAD ALL POKEMON CARDS.
    const ajaxSettings = {
    	"async": true,
    	"crossDomain": true,
    	"url": "https://pokemon-go1.p.rapidapi.com/pokemon_stats.json",
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-key": "adb1b0a27dmsh64ae995b116422ap1abc2ajsn2327c3145d6e",
    		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com"
    	}
    };

    $.ajax(ajaxSettings).then(
      (data) => {

         initCards(data);

      },
      () => {
        console.log('bad');
        console.log(`${error.statusText.toUpperCase()}: bad request, check url`);
      }
    );

  };


  const initCards = (data) => {

    // Select a number of random cards per player equal to the cards in play and assign them to each player.
    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array/38571132#38571132
    const $dataRandom = data.sort(() => 0.5 - Math.random());
    let $dataCards = $dataRandom.slice(0, $numCards);

    $('h1').css('color', '#ffd6e3'); // Lighten title color.

    for (let i = 0; i < $dataCards.length; i++) {

      // If card ID is even, assign it to player 1. If it is odd, assign it to player 2.
      if (i % 2) { $playerOneCards.push($dataCards[i]); } else { $playerTwoCards.push($dataCards[i]); }

      const $pokeCard = $('<div>');
      $pokeCard.addClass('cardId' + i);

      if (i % 2) { $pokeCard.addClass('active1'); } else { $pokeCard.addClass('active0'); }

      // Display cards in either main area or in player reserve.
      if (i % 2) {
        if (i == 1) {
          $('#playerTwoCards').prepend($pokeCard);
        } else {
          $('#reserveArea2').css('display', 'block');
          $('#reserveArea2').append($pokeCard);
        }
      } else {
        if (i == 0) {
          $('#playerOneCards').prepend($pokeCard);
        } else {
          $('#reserveArea1').css('display', 'block');
          $('#reserveArea1').append($pokeCard);
        }
      }

      const $nameBox = $('<div>').addClass('pokemon_name').css('font-weight', 'bold');
      $('.cardId' + i).append($nameBox);
      const $attackBox = $('<div>').addClass('pokemon_attack');
      $('.cardId' + i).append($attackBox);
      const $defenseBox = $('<div>').addClass('pokemon_defense');
      $('.cardId' + i).append($defenseBox);
      const $staminaBox = $('<div>').addClass('pokemon_stamina');
      $('.cardId' + i).append($staminaBox);

      $nameBox.text($dataCards[i].pokemon_name);
      $attackBox.text('Attack: ' + $dataCards[i].base_attack);
      $defenseBox.text('Defense: ' + $dataCards[i].base_defense);
      $staminaBox.text('Stamina: ' + $dataCards[i].base_stamina);

    }

    // $playerOneActiveStats = $('<div>').addClass('active0Stats');
    // $playerOneActiveButtons = $('<div>').addClass('active0Buttons');
    // $playerTwoActiveStats = $('<div>').addClass('active1Stats');
    // $playerTwoActiveButtons = $('<div>').addClass('active1Buttons');
    //
    // $('#playerOneCards').append($playerOneActiveStats);
    // $('#playerOneCards').append($playerOneActiveButtons);
    // $('#playerTwoCards').append($playerTwoActiveStats);
    // $('#playerTwoCards').append($playerTwoActiveButtons);

    // Designate which player's turn it is via a random arrow selection.
    $whichTurn = Math.random() < 0.5;
    attachPlayerTurnArrow($whichTurn);

    // Add action buttons to the active cards.
    $actionButtonCont = $('<div>').addClass('actionButtonCont');
    $('#main').append($actionButtonCont);
    $actionButtonFrame = $('<div>').addClass('actionButtonFrame');
    $('.actionButtonCont').append($actionButtonFrame);

    addActionButtons($whichTurn);

  };


  const addActionButtons = ($whichTurn) => {

    $('.actionButtonFrame button').remove(); // Delete any existing buttons.

    if ($whichTurn == true) { // Add action buttons for the given turn.
      $attackButton = $('<button>').addClass('attack').addClass('player0');
      $itemButton = $('<button>').addClass('item').addClass('player0');
      $switchButton = $('<button>').addClass('switch').addClass('player0');
    } else {
      $attackButton = $('<button>').addClass('attack').addClass('player1');
      $itemButton = $('<button>').addClass('item').addClass('player1');
      $switchButton = $('<button>').addClass('switch').addClass('player1');
    }

    $('.actionButtonFrame').append($attackButton);
    $('.actionButtonFrame').append($itemButton);
    $('.attack').text('Attack');
    $('.item').text('Item');

    if ($numCards > 2) {
      $('.actionButtonFrame').append($switchButton);
      $('.switch').text('Switch');
    }

  }


  const attachPlayerTurnArrow = ($whichTurn) => {

    $('.playerTurnArrow').remove(); // Remove current turn arrow.

    const $playerTurnArrow = $('<div>').addClass('playerTurnArrow');

    $('body').append($playerTurnArrow);
    if ($whichTurn == true) {
      $('.playerTurnArrow').text('>');
      // $whichTurn = true;
    } else {
      $('.playerTurnArrow').text('<');
      // $whichTurn = false;
    }

  }


  const startRound = () => {

    // On click Attack, attack the other card depending on which player's turn it is.


    // On Switch, replace the top card with the next highest card, and move the top card to the bottom.
    return;

  };


  const removeCard = ($whichSide) => {

  }


  $(document).ready(function() {
    $('#numCardsForm input').click(function(e) {
      e.preventDefault;

      // https://forum.jquery.com/topic/how-to-get-the-selected-value-of-dropdownlist-using-jquery
      $numCards = $("#numCards option:selected").val();

      $numCards = $numCards * 2;

      // Deactivate the number of cards field and button once selected.
      $( "#numCards" ).prop( "disabled", true );
      $( "#numCardsForm input" ).prop( "disabled", true );

      startGame($numCards);
    });
  });


});
