import React from 'react';

const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = ('0'+dateObject.getDate()).slice(-2);
    const month = ('0'+parseInt(dateObject.getMonth()+1)).slice(-2);
    const year = dateObject.getFullYear();
    return day + '/' + month + '/' + year;
}

export const DeleteEventModal = ({ onDelete, eventData, onClose }) => {
    return(
        <>
        <div id="deleteEventModal">
            <h2>Events for {formatDate(eventData.date)}</h2>

            <p id="eventText">{eventData.title}</p>
            <p id="eventStartTime">starts at: {eventData.startTime}</p>
            <p id="eventDuration">duration: {eventData.duration}</p>


            <button onClick={onDelete} id="deleteButton">Delete</button>
            <button onClick={onClose} id="closeButton">Close</button>
        </div>
        <div id="modalBackDrop"></div>
  </>
    );
}