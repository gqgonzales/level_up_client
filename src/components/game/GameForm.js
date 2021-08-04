import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";
import "./game.css";

export const GameForm = () => {
  const history = useHistory();
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skill_level: 1,
    number_of_players: 0,
    name: "",
    maker: "",
    description: "",
    game_type_id: 0,
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */

  const changeGameState = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newGameState = { ...currentGame };
    newGameState[event.target.name] = event.target.value;
    setCurrentGame(newGameState);
  };

  //   const changeGamenameState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.name = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameMakerState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.maker = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameDescriptionState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.description = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGamePlayersState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.number_of_players = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameSkillLevelState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.skill_level = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameTypeState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.game_type_id = event.target.value;
  //     setCurrentGame(newGameState);
  //   };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      {/* -------------- NAME --------------*/}
      <h2 className="gameForm__name">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentGame.name}
            onChange={changeGameState}
            // onChange={changeGamenameState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}
      {/* -------------- MAKER --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            // autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
            // onChange={changeGameMakerState}
          />
        </div>
      </fieldset>
      {/* -------------- DESCRIPTION --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            // autoFocus
            className="form-control"
            value={currentGame.description}
            onChange={changeGameState}

            // onChange={changeGameDescriptionState}
          />
        </div>
      </fieldset>
      {/* -------------- NUMBER OF PLAYERS --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Number Of Players: </label>
          <input
            type="number"
            name="number_of_players"
            required
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
            // onChange={changeGamePlayersState}
          />
        </div>
      </fieldset>
      {/* -------------- GAME TYPE --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="game_type_id">Game Type </label>
          <select
            defaultValue=""
            name="game_type_id"
            ref={gameTypes}
            id="game_gameType"
            className="form-control"
            onChange={changeGameState}
            // onChange={changeGameTypeState}
          >
            <option value="0">Select a Game Type</option>
            {gameTypes.map((game_type) => (
              <option key={game_type.id} value={game_type.id}>
                {game_type.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {/* -------------- SKILL LEVEL --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level </label>
          <select
            name="skill_level"
            required
            className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
            // onChange={changeGameSkillLevelState}
          >
            <option value={1}>1 (Easy)</option>
            <option value={2}>2 (Moderate)</option>
            <option value={3}>3 (Challenging)</option>
            <option value={4}>4 (Hard)</option>
            <option value={5}>5 (Impossible)</option>
          </select>
        </div>
      </fieldset>

      {/* BUTTON */}
      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            name: currentGame.name,
            description: currentGame.description,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: parseInt(currentGame.skill_level),
            game_type_id: parseInt(currentGame.game_type_id),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
