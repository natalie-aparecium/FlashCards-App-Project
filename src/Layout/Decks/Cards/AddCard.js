import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { createCard, readDeck } from "../../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();

    const newCard = {
        front: "",
        back: "",
        deckId: deckId,
    }

    const [deck, setDeck] = useState();
    const [formData, setFormData] = useState(newCard);

    useEffect(() => {
        const abortController = new AbortController();

        const loadDeck = async () => {
            try {
                const deckFetch = await readDeck(deckId, abortController.signal);
                setDeck(deckFetch);
            } catch (error) {
                console.log(error.message);
            };
        };

        loadDeck();
        return () => abortController.abort();
    }, []);

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await createCard(deckId, formData, abortController.signal);
            setFormData(newCard);
        } catch(error) {
            console.log(error.message);
        };
    };

    if(deck){
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/">{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item">Add Card</li>
                    </ol>
                </nav>

                <label htmlFor="create-deck-form">
                    <h2>{deck.name}: Add Card</h2>
                </label>
                <CardForm card={formData} changeHandler={changeHandler} submitHandler={submitHandler} />
            </div>
        );
    }
    else {
        return <h1>Loading</h1>
    };
}

export default AddCard;