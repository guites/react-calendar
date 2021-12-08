import React, { useState } from 'react';
import { EditEventContent } from './EditEventContent.jsx';
import { ShowEventContent } from './ShowEventContent.jsx';

export const DeleteEventModal = ({ onDelete, onEdit, eventData, onClose }) => {
    const [isEdditing, setIsEdditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(false);
    return(
        <>
        <div id="deleteEventModal">
            {
                isEdditing &&
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
                />
            }
        </div>
        <div id="modalBackDrop"></div>
  </>
    );
}