import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

import DeckForm from "./DeckForm";

function EditDeck() {

    const history = useHistory();
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({});
    
    useEffect(() => {
        const abortController = new AbortController();

        const loadDeck = async () => {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.log(error.message);
            };
        };

        loadDeck();

        return () => abortController.abort();

    }, [deckId]);

    const changeHandler = (event) => {
        setDeck({...deck, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck(deck);

        history.push(`/decks/${deck.id}`);
    };

    //if (deck) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">{deck.name}</li>
                        <li className="breadcrumb-item">Edit Deck</li>
                    </ol>
                </nav>
                <label htmlFor="create-deck-form">
                    <h2>Edit Deck</h2>
                </label>
                <DeckForm deck={deck} submitHandler={handleSubmit} changeHandler={changeHandler} />
            </div>
        );
    //} else {
       // return (
       //     <h3>Loading</h3>
      //  );
    //};
    
}

export default EditDeck;