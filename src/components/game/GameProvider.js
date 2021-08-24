import React, { useState } from "react";

export const GameContext = React.createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gameTypes, setTypes] = useState([]);

  const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGames);
  };

  const getGameById = (game_id) => {
    return fetch(`http://localhost:8000/games/${game_id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then((response) => response.json());
  };

  const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames);
    // .then();
  };

  const editGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames);
  };

  const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setTypes);
  };

  const deleteGame = (game_id) => {
    return fetch(`http://localhost:8000/games/${game_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then(getGames);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        gameTypes,
        getGames,
        createGame,
        getGameTypes,
        getGameById,
        editGame,
        deleteGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
