import React from "react";
import { Link, useParams } from "react-router-dom";

function Deck({deck, deleteHandler}) {
    const { deckId } = useParams();
    return (
        <div className="container">
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <div className="row d-flex justify-content-between">
                <div>
                    <div className="btn btn-secondary mx-3">
                        <Link className="text-white">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/
                        AP+gvaeTAAAAhUlEQVRIie2QQQ6DIBQFH5XbtMcxMT2NLD1IF+WMmkw3kOACbfSzYzYkQGbgSx1JQACWlvKMbQR4ASt7
                        gpXcpXU6ijwuyoOkL+Cdc1HSW9JWXrnz8nLmEfBpf0w/ma3kmQ8wpPOntbyMXBr3P3JajKXLu7weaCc/CdyXHwRs5JW
                        AnbxT4wdVKwZPpL9FqgAAAABJRU5ErkJggg==" alt=""/>
                        Edit
                        </Link>
                    </div>
                    <div className="btn btn-primary">
                        <Link to={`/decks/${deckId}/study`} className="text-white">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/
                            AP+gvaeTAAAAlUlEQVRIie2UwQ3DIAxFv6uO0V1yrrpHpuhwySohe7xeQIpaIhzn0qT9Egcbvh8gg3Q6AQ9gZrsScPcAUq
                            B40eQBAOCNW/lLk7hTxwdcvQuBZwRglUJIkpnZMv4w5vk1X9GWKxrz2KdKWw5At4g7YGj53IDoxoqO36Z/wA8Aan/
                            RLOkWeQuS0nuidoI+QyLF+4Dvy/UCYlHk55afe4cAAAAASUVORK5CYII=" alt=" "/>
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
    )

}

export default Deck;