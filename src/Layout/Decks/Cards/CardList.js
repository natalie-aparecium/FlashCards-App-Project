import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard } from "../../../utils/api/index";

function CardList({cards, setCards}) {
    const history = useHistory();
    const { deckId } = useParams();
    const { url } = useParams();

    //function used to call the function deleteCard
    const callDelete = async(id) => {
        const abortController = new AbortController();

        try {
            setCards(cards.filter((card) => card.id !== id));
            await deleteCard(id, abortController.signal);
            history.push(url);
        } catch (error) {
            console.log(error.message);
        };

        return () => abortController.abort;
    };

    //function to handle delete button
    const deleteHandler = (id) => {
        if ( window.confirm(`Delete this card? \n\nYou will not be able to recover it.`)) {
            callDelete(id);
        }

        history.push(url);
    };

    return (
        <div className="container">
            <h2>Cards</h2>
            {cards.map((card, index) => (
                <div className="card" key={index}>
                    <div className="card-body">
                        <div className="row d-flex justify-content-evenly">
                            <div className="col">{card.front}</div>
                            <div className="col">{card.back}</div>
                        </div>
                        <br/>
                        <div className="row d-flex justify-content-end">
                            <div className="btn btn-secondary mx-1">
                                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="text-white">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/
                                    AP+gvaeTAAAAhUlEQVRIie2QQQ6DIBQFH5XbtMcxMT2NLD1IF+WMmkw3kOACbfSzYzYkQGbgSx1JQACWlvKMbQR4ASt7
                                    gpXcpXU6ijwuyoOkL+Cdc1HSW9JWXrnz8nLmEfBpf0w/ma3kmQ8wpPOntbyMXBr3P3JajKXLu7weaCc/CdyXHwRs5JW
                                    AnbxT4wdVKwZPpL9FqgAAAABJRU5ErkJggg==" alt=""/>
                                    Edit
                                </Link>
                            </div>
                            <div>
                                <button className="btn btn-danger" name="delete" onClick={() => deleteHandler(card.id)}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/
                                    AP+gvaeTAAAAcUlEQVRIie2VzQ2AIAxGW+MW7sRMHh0U5niePIhoWtGokXcjKd8PByryC4CRLZPlrhbEqAmjqivNrkbsNMsbXDF/
                                    ewOTQZ7Q0/AdDZpBM2gGdfSWofwLzs9HPNYgicjgXD7JPAkEIBbW5B4RCI4wH2IGDpt3EfVw3qsAAAAASUVORK5CYII=" alt=""/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <br/>
        </div>
    );
}

export default CardList;