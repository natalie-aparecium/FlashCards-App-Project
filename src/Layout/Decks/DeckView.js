import React, { useEffect, useState } from "react";

import Deck from "./Deck";
import CardList from "./Cards/CardList";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";


function DeckView({ deleteHandler }) {
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
    
        const loadDeck = async () => {
          try {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
            setCards(currentDeck.cards);
          } catch (error) {
            console.log(error.message);
          }
        };
        loadDeck();
        return () => abortController.abort;
    }, [deckId]);

    if (cards.length > 0) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">{deck.name}</li>
                    </ol>
                </nav>
                <Deck deck={deck} deleteHandler={deleteHandler}/>
                <br />
                <CardList cards={cards} setCards={setCards} />
            </div>
        );
    } else {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item">{deck.name}</li>
                    </ol>
                </nav>
                <Deck deck={deck} deleteHandler={deleteHandler}/>
                <br />
                <div>
                    <h5>No cards to show. Please add cards.</h5>
                </div>
            </div>
        )
    }
}

export default DeckView;