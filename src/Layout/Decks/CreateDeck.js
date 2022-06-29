import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck ({decks, setDecks}) {
    const history = useHistory();

    //default set for form
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    //change handler funciton
    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value});
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        try {
            const newDeck = await createDeck(formData, abortController.signal);
            setDecks([...decks, newDeck]);
            history.push(`/decks/${newDeck.id}`);
        } catch(error) {
            console.log(error.message)
        };
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            <label htmlFor="create-deck-form">
                <h2>Create Deck</h2>
            </label>
            <DeckForm deck={formData} submitHandler={submitHandler} changeHandler={changeHandler}/>
        </div>
    )
}

export default CreateDeck;