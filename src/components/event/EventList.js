import React, { useContext, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router-dom";
import "./events.css";

export const EventList = () => {
  const history = useHistory();
  const { events, getEvents, joinEvent } = useContext(EventContext);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <article className="events">
      <header className="events__header">
        <h1>Level Up Game Events</h1>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/events/new" });
          }}
        >
          Host a New Event
        </button>
      </header>
      {events.map((event) => {
        // const attending = profile.events.some((evt) => evt.id === event.id);
        return (
          <section key={event.id} className="registration">
            <div className="registration__game">{event.title}</div>
            <div>
              {event.description}. We'll be playing {event.game.name}!
            </div>
            <div>
              {event.date} @ {event.time}
            </div>
            <button className="btn btn-2" onClick={() => joinEvent(event.id)}>
              Join
            </button>
          </section>
        );
      })}
    </article>
  );
};
