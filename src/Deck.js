import Card from "./Card";

/** Deck: Renders Card components.
 *
 * Props
 * - cards: Array of card objects as [{ code, image, images, value, suit }, ... ]
 *
 * Deck -> Card
 */
function Deck({ cards }) {
  return (
    cards.map(card => (
      <Card key={card.code} card={card} />
    ))
  );
}

export default Deck;