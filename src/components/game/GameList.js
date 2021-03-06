import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";
import "./game.css";

export const GameList = (props) => {
  const { games, getGames, deleteGame } = useContext(GameContext);
  const history = useHistory();

  useEffect(() => {
    getGames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      <br></br>
      <article className="games">
        {games.map((game) => {
          return (
            <div key={`game--${game.id}`} className="game">
              <div className="game__name">
                {game.name} by {game.maker}
              </div>
              <div className="game__players">
                {game.number_of_players} players needed
              </div>
              <div className="game__skill_level">
                Skill level is {game.skill_level}
              </div>
              <div className="game__edit">
                <button
                  className="btn btn-3"
                  onClick={() => history.push(`/games/${game.id}/edit`)}
                >
                  Edit
                </button>
              </div>
              <button
                className="btn btn-3"
                onClick={() => {
                  deleteGame(game.id).then(history.push("/games"));
                }}
              >
                Delete Event
              </button>
            </div>
          );
        })}
      </article>
    </>
  );
};
