import React, { useState } from 'react';
import './App.css';

function App() {
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: eventName,
      id: eventId,
      code: `
        <a
          href="https://lu.ma/event/${eventId}"
          class="luma-checkout--button"
          data-luma-action="checkout"
          data-luma-event-id="${eventId}"
        >
          Register for ${eventName}
        </a>
        <script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js"></script>
      `,
    };
    setEvents([...events, newEvent]);
    setEventName('');
    setEventId('');
  };

  return (
    <div className="App">
      <h1>Event Embedder</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Event Name -
            <input type="text" value={eventName} onChange={handleEventNameChange} required />
          </label>
        </div>
        <div className="input-container">
          <label>
            Event ID -
            <input type="text" value={eventId} onChange={handleEventIdChange} required />
          </label>
        </div>
        <button type="submit">Add Event</button>
      </form>
      {events.length > 0 && (
        <div className="events-list">
          <h2>Event List</h2>
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <h3>{event.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: event.code }}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
