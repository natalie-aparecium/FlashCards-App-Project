import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../../utils/api";

import CardForm from "./CardForm";


function EditCard() {
    const history = useHistory();
    const { deckId } = useParams();
    const { cardId } = useParams();
    const [ deck, setDeck ] =useState({});
    const [ card, setCard ] = useState({
        id: cardId,
        front: "",
        back: "",
        deckId: deckId,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const loadCard = async () => {
            try {
                const getDeck = await readDeck(deckId, abortController.signal);
                setDeck(getDeck);
                const getCard = await readCard(cardId, abortController.signal);
                setCard(getCard);
            } catch (error) {
                console.log(error.message);
            };
        };

        loadCard();

        return () => abortController.abort();

    }, [cardId]);

    const changeHandler = (event) => {
        setCard({...card, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        updateCard(card);

        history.push(`/decks/${deckId}`);
    };

    if (deck) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item"> Deck {deck.name}</li>
                        <li className="breadcrumb-item"> Edit Card {cardId}</li>
                    </ol>
                </nav>
                <label htmlFor="create-deck-form">
                    <h2>Edit Card</h2>
                </label>
                <CardForm card={card} changeHandler={changeHandler} submitHandler={submitHandler} />
            </div>
        );
    } else {
        return (
            <h3>Loading</h3>
        );
    };
}

export default EditCard;