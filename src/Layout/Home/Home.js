import React from "react";
import { Link } from "react-router-dom";
import ListDecks from "../Decks/ListDecks";

function Home({ decks, deleteHandler }) {

    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary mx-3 mb-3">+Create Deck</Link>
            <br/>
            <div className="container">
                <ListDecks decks={decks} deleteHandler={deleteHandler}/>
            </div>
        </div>
    );
}

export default Home;