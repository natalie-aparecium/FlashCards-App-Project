import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { listDecks, deleteDeck } from "../utils/api/index";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import Study from "./Study/Study";
import CreateDeck from "./Decks/CreateDeck";
import AddCard from "./Decks/Cards/AddCard";
import DeckView from "./Decks/DeckView";
import EditCard from "./Decks/Cards/EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
      const abortController = new AbortController();
  
      const loadDecks = async () => {
        try {
          const response = await listDecks(abortController.signal);
          setDecks(...decks, response);
        } catch (error) {
          console.log(error.message);
        }
      };
      loadDecks();
      return () => abortController.abort;
  }, []);

  //function used to call the function deleteDeck from "api" index file
  const callDelete = async(id) => {
    const abortController = new AbortController();

    try {
      setDecks(decks.filter((deck) => deck.id !== id));
      await deleteDeck(id, abortController.signal);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    };

    return () => abortController.abort;
  };

  //function use to handle the delete button
  const deleteHandler = (id) => {
    if (window.confirm(`Delete this deck? \n\nYou will not be able to recover it.`)) {
      callDelete(id);
    }

    history.push("/");
  };


  return (
    <div className="container">
      <Header />
      <div className="container">
        <Switch>
          {/* Home screen */}
          <Route exact={true} path={'/'}>
            <Home decks={decks} deleteHandler={deleteHandler}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView deleteHandler={deleteHandler}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            {/* Not found screen */}
            <NotFound />
          </Route>
          
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
