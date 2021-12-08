import React, { useState } from 'react';
import { EditEventContent } from './modalComponents/EditEventContent.jsx';
import { ShowEventContent } from './modalComponents/ShowEventContent.jsx';
import { NewEventContent } from './modalComponents/NewEventContent.jsx';

export const EventModal = ({ onSave, onDelete, onEdit, eventData, onClose, clickedDay }) => {
    const [isEdditing, setIsEdditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [event] = useState(eventData ? eventData : {date: clickedDay, events: []});
    return(
        <>
        <div id="deleteEventModal">
            {
                isEdditing &&
                !isAdding &&
                <EditEventContent
                eventData={currentEvent}
                isEdditing={() => {
                    setIsEdditing(!isEdditing)
                }}
                onSave={(ev) => {
                    eventData.events.splice(ev.index, 1, ev.event);
                    onEdit(eventData);
                }}
                />
            }
            {
                !isEdditing &&
                !isAdding &&
                event.events.length > 0 &&
                <ShowEventContent
                eventData={eventData}
                onClose={onClose}
                isEdditing={(index) => {
                    setCurrentEvent({ index: index, event: eventData.events[index]});
                    setIsEdditing(!isEdditing)
                }}
                onDelete={(index) => {
                    onDelete(index);
                }}
                openSaveModal={() => setIsAdding(true)}
                />
            }
            {
                !isEdditing &&
                (event.events.length == 0 ||
                isAdding) &&
                <NewEventContent
                clickedDay={clickedDay}
                onClose={onClose}
                onSave={(ev)=>{onSave(ev)}}
                /> 
            }
        </div>
        <div id="modalBackDrop"></div>
  </>
    );
}