import React, { useContext, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router-dom";
import "./events.css";

export const EventList = () => {
  const history = useHistory();
  const { events, getEvents, joinEvent, leaveEvent, cancelEvent } =
    useContext(EventContext);

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
        return (
          <section key={event.id} className="registration">
            <div className="registration__game">
              {event.title} | A {event.game.name} event
            </div>
            <div>{event.description}</div>
            <div>
              {event.date} @ {event.time}
            </div>
            {event.joined ? (
              <button
                className="btn btn-3"
                onClick={() => leaveEvent(event.id)}
              >
                Leave
              </button>
            ) : (
              <button className="btn btn-2" onClick={() => joinEvent(event.id)}>
                Join
              </button>
            )}
            <button
              className="btn btn-3"
              onClick={() => {
                cancelEvent(event.id).then(history.push("/events"));
              }}
            >
              Delete Event
            </button>
          </section>
        );
      })}
    </article>
  );
};
