import React, { useEffect, useState } from "react";

import Deck from "./Deck";
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
    }, []);

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
            </div>
        );
    } else {
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
            </div>
        )
    }
}

export default DeckView;