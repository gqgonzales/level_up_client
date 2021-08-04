import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../game/GameProvider";
import { EventContext } from "./EventProvider";

export const EventForm = () => {
  const history = useHistory();
  const { createEvent, getEvents } = useContext(EventContext);
  const { getGames, games } = useContext(GameContext);

  const [currentEvent, setCurrentEvent] = useState({
    host_id: 0,
    game_id: 0,
    title: "",
    date: "",
    time: "",
    description: "",
    attendees: [],
  });

  useEffect(() => {
    // Get all existing games from API
    getGames();
    // .then(getEvents);
    // ^ Do I need the getEvents chained on?
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeEventState = (domEvent) => {
    const newGameState = { ...currentEvent };
    newGameState[domEvent.target.name] = domEvent.target.value;
    setCurrentEvent(newGameState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      {/* -------------- TITLE --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentEvent.title}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      {/* -------------- GAME --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="game_id">Game: </label>
          <select
            name="game_id"
            className="form-control"
            value={currentEvent.game_id}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {/* -------------- DATE --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDate">Date: </label>
          <input
            type="date"
            id="eventDate"
            name="date"
            value={currentEvent.date}
            required
            autoFocus
            className="form-control"
            placeholder="When we doing this?"
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      {/* -------------- TIME -------------- */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input
            type="time"
            id="time"
            name="time"
            value={currentEvent.time}
            required
            autoFocus
            className="form-control"
            placeholder="When should it start?"
            onChange={changeEventState}
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
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          // Create the event
          const newEvent = {
            host_id: currentEvent.host_id,
            game_id: currentEvent.game_id,
            title: currentEvent.title,
            date: currentEvent.date,
            time: currentEvent.time,
            description: currentEvent.description,
            attendees: currentEvent.attendees,
          };

          // Send POST request to your API
          createEvent(newEvent).then(() => history.push("/events"));
          // Once event is created, redirect user to event list
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
