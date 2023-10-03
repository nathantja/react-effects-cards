import { useState, useEffect } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck"

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
  }
  const [cards, setCards] = useState(initialState)

  useEffect( ,[])


}

export default DrawCardApp;