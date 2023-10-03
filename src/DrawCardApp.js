import { useState, useEffect } from "react";
import Deck from "./Deck";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

/** DrawCardApp: Draw from a deck of cards.
 *
 * State:
 * - {deckId, deck, cardsRemaining}
 *
 * App -> DrawCardApp -> Deck
 */
function DrawCardApp() {
  const initialState = {
    deckId: null,
    deck: [],
    cardsRemaining: 52,
    isShuffling: false,
  };
  const [cards, setCards] = useState(initialState);

  /** Calls Cards API to get and set deckId in local state. */
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
      const deckResult = await response.json();

      setCards(curr => (
        { ...curr, deckId: deckResult.deck_id }
      ));
    }
    fetchDeck();
  }, []);

  /** Draws a card from the Cards API and updates local state. */
  async function drawCard() {
    const response = await fetch(`${BASE_URL}/${cards.deckId}/draw/?count=1`);
    const cardResult = await response.json();

    setCards(curr => (
      {
        ...curr,
        deck: [...curr.deck, cardResult.cards[0]],
        cardsRemaining: cardResult.remaining,
      }
    ));
  }

  /** Shuffle existing deck ID using Cards API. Updates local state. */
  async function shuffleDeck() {
    setCards(curr => (
      {
        ...curr,
        isShuffling: true,
      }
    ))

    const response = await fetch(`${BASE_URL}/${cards.deckId}/shuffle`);
    const deckResult = await response.json();

    setCards(curr => (
      {
        ...curr,
        deck: [],
        cardsRemaining: deckResult.remaining,
        isShuffling: false,
      }
    ));
  }

  return (
    <>
      {cards.cardsRemaining === 0 && <h1>No cards remaining!</h1>}

      <button
        onClick={drawCard}
        disabled={cards.cardsRemaining === 0}>
        Get a card</button>

      <button
      onClick={shuffleDeck}
      disabled={cards.isShuffling}
      >Shuffle Cards</button>

      <Deck cards={cards.deck} />
    </>

  );
}

export default DrawCardApp;