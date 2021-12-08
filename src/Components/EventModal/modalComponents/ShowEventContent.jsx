import React from 'react';
const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = ('0'+dateObject.getDate()).slice(-2);
    const month = ('0'+parseInt(dateObject.getMonth()+1)).slice(-2);
    const year = dateObject.getFullYear();
    return day + '/' + month + '/' + year;
}
export const ShowEventContent = ({eventData, onClose, onDelete, isEdditing, openSaveModal}) => {
    return (
        <>
        <h2>Events for {formatDate(eventData.date)}</h2>
        {eventData.events.map((event, index) => (
            <div className="single-event" key={index}>
                <div className="single-event-info">
                    <time className="eventStartTime">starts at: {event.startTime}</time> / <span className="eventDuration">duration: {event.duration}</span>
                </div>
                <p className="eventText">{event.title}</p>
                <button data-index={index} className="icon-wrapper" id="deleteButton"
                    onClick={(e) => {
                        onDelete(e.target.getAttribute('data-index'));
                    }}
                    ><img src="../../../../deletar-lixeira-small.png" className="edit-btn"></img>
                </button>
                <button data-index={index} className="icon-wrapper" id="editButton"
                    onClick={(e) => {
                        isEdditing(e.target.getAttribute('data-index'));
                    }}
                    ><img src="../../../../editar-small.png" className="edit-btn"></img>
                </button>
            </div>
        ))}
        <button onClick={openSaveModal} id="createButton">New</button>
        <button onClick={onClose} id="closeButton">Close</button>
        </>
    );
};
