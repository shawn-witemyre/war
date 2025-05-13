let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;

      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      header.textContent = winnerText;

      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
      }
    });
});

function getCardValue(card) {
  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };
  return cardValues[card.value];
}

function determineCardWinner(card1, card2) {
  const card1Value = getCardValue(card1);
  const card2Value = getCardValue(card2);

  if (card1Value > card2Value) {
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Computer wins!";
  } else if (card2Value > card1Value) {
    myScore++;
    myScoreEl.textContent = `My score: ${myScore}`;
    return "You win!";
  } else {
    return "It's a tie!";
  }
}
