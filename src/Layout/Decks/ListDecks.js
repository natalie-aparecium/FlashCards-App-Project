import React from "react";
import { Link } from "react-router-dom";

function ListDecks({ decks, deleteHandler }) {

    if (decks.length > 0) {
        return (
            <div>
                {decks.map((deck) => (
                    <div className="card" key={deck.id}>
                        <div className="card-body">
                            <div className="card-title">
                                <div className="row d-flex justify-content-between">
                                    <h5 className="mx-3">{deck.name}</h5>
                                    <p className="mx-3">{deck.cards.length} cards</p>
                                </div>
                            </div>
                            <div className="card-text">
                                <p>{deck.description}</p>
                            </div>
                            <div className="row d-flex justify-content-between">
                                <div>
                                    <div className="btn btn-secondary">
                                        <Link to={`/decks/${deck.id}`} className="text-white">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/
                                            wD/AP+gvaeTAAAA50lEQVQ4je3SO0qDURAF4Ll2QdMZF+AGVDB70MKNaAIivhZgLMW9ZAU+QEGwUGs7LaI2+
                                            jfafBaZQAz5wVbwNPO4c84MMzfiHz+ABRziEs/4SnuBA7TqiAXbeDNEH23Mpu1n/hXdcW5JgdOIWIqIu4hYLKVs
                                            TGnSj4jHrLstpeyMHrq4QgMPWM38MSr0Mm7jPuuu0RkJDLCWfoVm+h859nvGTVTprydvJtBJxUZ2GE3QS5Gjmgm
                                            2xndwEhErv9zBckTclFJ2Jws6eJm4wtzEFQbYnP4JhiIt7OM87/+JJ5xhD/O15L+Lb6mXLlatRLnlAAAAAElFTkSuQmCC" alt=""/>
                                            View
                                        </Link>
                                    </div>
                                    <div className="btn btn-primary mx-2">
                                        <Link to={`/decks/${deck.id}/study`} className="text-white">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/
                                            AP+gvaeTAAAAVklEQVQ4jWNgGGygjYGB4ScDA8N/Ahgn+MnAwCBEwBK8BuCVxKaGhUSDGNEFcBmAoRAXYCJW4TA2AFsg/
                                            mJgYGAl18D/DAwMqmQ7h4GBIZOBwqRMfwAAoUAaEjY5HgQAAAAASUVORK5CYII=" alt=""/>
                                            Study
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-danger" name="delete" onClick={() => deleteHandler(deck.id)}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/
                                        AP+gvaeTAAAAcUlEQVRIie2VzQ2AIAxGW+MW7sRMHh0U5niePIhoWtGokXcjKd8PByryC4CRLZPlrhbEqAmjqivNrkbsNMsbXDF/
                                        ewOTQZ7Q0/AdDZpBM2gGdfSWofwLzs9HPNYgicjgXD7JPAkEIBbW5B4RCI4wH2IGDpt3EfVw3qsAAAAASUVORK5CYII=" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <br />
            </div>
        )
    };
    return (
        "No decks created yet. Please create a deck"
    );
}

export default ListDecks;