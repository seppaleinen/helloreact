import React from "react"
import Card from "./card"
import shuffle from "./shuffle"

const photos = [
  "/images/dog-1.jpg",
  "/images/dog-2.jpg",
  "/images/dog-3.jpg",
  "/images/dog-4.jpg",
  "/images/dog-5.jpg"
]

export default class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: this.duplicatedAndShuffledCards(),
      flippedCards: []
    }
  }

  duplicatedAndShuffledCards = () => (
    shuffle([...photos, ...photos])
  )

  handleCardFlip = (id, src, unflipCallback) => {
    const flippedCards = [...this.state.flippedCards, { id, src, unflipCallback }]
    this.setState({ flippedCards }, this.handleFlippedCardChange)
  }

  handleFlippedCardChange = () => {
    if (this.state.flippedCards.length === 2) {
      console.log(this.state.flippedCards[0].id + ":" + this.state.flippedCards[1].id)
      if(this.state.flippedCards[0].id === this.state.flippedCards[1].id) {
      	console.log("Elseif")
      	          this.state.flippedCards.forEach(card => {
            card.unflipCallback()
          })
      	this.setState({flippedCards: []})
      } else if(this.state.flippedCards[0].src === this.state.flippedCards[1].src) {
      	setTimeout(() => {
      	  let filteredCards = this.state.cards.filter(card => card.src !== this.state.flippedCards[0].src)
      	  this.setState({cards: filteredCards, flippedCards: []})
      	}, 1000)
      } else {
        setTimeout(() => {
          this.state.flippedCards.forEach(card => {
            card.unflipCallback()
          })
          this.setState({ flippedCards: [] })
        }, 1000)
      }
    }
  }

  restart = () => {
  	this.setState({cards: this.duplicatedAndShuffledCards(), flippedCards: []})
  }

  render() {
    return (
      <div>
      	<h1>Card game yo</h1>
        <div>
          {this.state.cards.map(card => (
            <Card
              id={card.id}
          	  key={card.id}
              canFlip={this.state.flippedCards.length < 2}
              onFlip={this.handleCardFlip}
              src={card.src} />
          ))}
        </div>
        <div>
          <button onClick={this.restart}>Restart game</button>
        </div>
      </div>
    )
  }

}