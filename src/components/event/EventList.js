import React, { useContext, useEffect } from "react";
import { EventContext } from "../event/EventProvider.js";
import { useHistory } from "react-router-dom";

export const EventList = (props) => {
  const { events, getEvents } = useContext(EventContext);
  const history = useHistory();

  useEffect(() => {
    getEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/events/new" });
        }}
      >
        Host a New Event
      </button>
      <article className="events">
        <header className="events__header">
          <h1>Level Up Game Events</h1>
        </header>
        {events.map((event) => {
          return (
            <section key={event.id} className="registration">
              <div className="registration__game">{event.game.name}</div>
              <div>{event.description}</div>
              <div>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                @ {event.time}
              </div>
            </section>
          );
        })}
      </article>
    </>
  );
};
