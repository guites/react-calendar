import React, { useState } from 'react';
import { EditEventContent } from './EditEventContent.jsx';
import { ShowEventContent } from './ShowEventContent.jsx';

export const DeleteEventModal = ({ onDelete, onEdit, eventData, onClose }) => {
    const [isEdditing, setIsEdditing] = useState(false);
    return(
        <>
        <div id="deleteEventModal">
            {
                isEdditing &&
                <EditEventContent
                eventData={eventData}
                isEdditing={() => {setIsEdditing(!isEdditing)}}
                onSave={(ev) => {
                    onEdit(ev);
                }}
                />
            }
            {
                !isEdditing &&
                <ShowEventContent
                eventData={eventData}
                onClose={onClose}
                isEdditing={() => {setIsEdditing(!isEdditing)}}
                />
            }
        </div>
        <div id="modalBackDrop"></div>
  </>
    );
}