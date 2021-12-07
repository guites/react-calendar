import React from 'react';
const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = ('0'+dateObject.getDate()).slice(-2);
    const month = ('0'+parseInt(dateObject.getMonth()+1)).slice(-2);
    const year = dateObject.getFullYear();
    return day + '/' + month + '/' + year;
}
export const ShowEventContent = ({eventData, onClose, onDelete, isEdditing}) => {
    return (
        <>
        <h2>Events for {formatDate(eventData.date)}</h2>
        <p id="eventText">{eventData.title}</p>
        <p id="eventStartTime">starts at: {eventData.startTime}</p>
        <p id="eventDuration">duration: {eventData.duration}</p>
        <button onClick={onDelete} id="deleteButton">Delete</button>
        <button id="editButton"
        onClick={isEdditing}
        >Edit</button>
        <button onClick={onClose} id="closeButton">Close</button>
        </>
    );
};
