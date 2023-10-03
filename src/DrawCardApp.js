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
  };
  const [cards, setCards] = useState(initialState);

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

  /** Handles clicking on button */
  async function handleClick() {
    const response = await fetch(`${BASE_URL}/${cards.deckId}/draw/?count=1`);
    const cardResult = await response.json();

    setCards(curr => (
      {
        ...curr,
        deck: [...curr.deck, cardResult.cards[0]],
        cardsRemaining: (cardResult.remaining)
      }
    ));
  }

  return (
    <>
      {cardsRemaining === 0 &&
        <p>Error: no cards remaining!</p>}
      <button onClick={handleClick}>Get a card</button>
      <Deck deck={cards.deck} />
    </>

  );
}

export default DrawCardApp;