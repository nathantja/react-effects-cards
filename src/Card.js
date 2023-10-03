/** Card: Show a card image
 *
 * Props
 * card: { code, image, images, value, suit }
 *
 * Deck -> Card
*/
function Card({ card }) {
  return (
    <img src={`${card.image}`} alt={card.code} />
  );
}

export default Card;