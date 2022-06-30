import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { readDeck } from "../../utils/api/index";

function Study() {
    const [ deck, setDeck ] = useState({});
    const [ cards, setCards ] = useState([]);
    const [ side , setSide ] = useState(true);
    const [ count, setCount ] = useState(0);
    const history = useHistory();
    const { deckId } = useParams();

    //function to toggle sides
    const flipSide = () => {
        setSide(!side);
    };

    //function to restart deck of cards
    function restart() {
        setCount(0);
        flipSide();
    };

    //function to go to next card
    function nextCard() {
        let counter = count;
        if ( count >= cards.length - 1 ) {
            if ( window.confirm(`Restart cards? \n\n Click 'cancel' to return to the home page.`)) {
                restart();
            }

            history.push("/");
        } else {
            setCount(counter + 1);
            flipSide(true);
        };
    };

    //effect used to read deck with specific id
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

    if (cards.length < 3) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item">Study</li>
                    </ol>
                </nav>
                <div>
                    <h1>{deck.name}: Study</h1>
                    <h2>Not enough cards.</h2>
                    <h6>You need at least 3 cards to study. There are {cards.length} cards in this deck.</h6>
                </div>
                <div className="btn btn-primary">
                    <Link to={`/decks/${deck.id}/cards/new`} className="text-white">+ Add cards</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item">Study</li>
                    </ol>
                </nav>
                <div>
                    <h1>{deck.name}: Study</h1>
                </div>
                <div className="card">
                    <div className="card-title mx-3">Card {count +1} of {cards.length}</div>
                </div>
            </div>
        )
    }
    
}

export default Study;