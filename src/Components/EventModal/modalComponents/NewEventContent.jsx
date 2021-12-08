import React, { useState, useEffect } from 'react';
const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = ('0'+dateObject.getDate()).slice(-2);
    const month = ('0'+parseInt(dateObject.getMonth()+1)).slice(-2);
    const year = dateObject.getFullYear();
    return day + '/' + month + '/' + year;
}
export const NewEventContent = ({onSave, onClose, clickedDay}) => {

    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            document.getElementById(`${error}Input`).focus();
        }
    }, [error]);

    return(
        <>
            <h2>New Event for {formatDate(clickedDay)}</h2>
            <div>
                <label htmlFor="eventTitleInput">Describe the event:</label>
                <input
                    className={ error == 'title' ? 'error' : '' }
                    value={title}
                    onChange={ e => setTitle(e.target.value) }
                    id="titleInput"
                    placeholder="Event Title"
                />
                <div>
                    <label htmlFor="eventTimeInput">Choose the time:</label>
                    <input 
                    className={ error == 'startTime' ? 'error' : '' }
                    value={startTime}
                    onChange={ e => setStartTime(e.target.value) }
                    id="startTimeInput" type="time" />
                </div>
                <div>
                    <label htmlFor="eventDurationInput">Duration:</label>
                    <input
                    value={duration}
                    onChange={ e => setDuration(e.target.value) }
                    className={ error == 'duration' ? 'error' : '' }
                    id="durationInput" type="time" />
                </div>
            </div>
            <button
                onClick = {
                    () => {
                        if (!title) {
                            setError('title');
                        } else if (!startTime) {
                            setError('startTime');
                        } else if (!duration) {
                            setError('duration');
                        } else {
                            setError(false);
                            onSave({title, startTime, duration});
                        }
                    }   
                }
                id="saveButton">
                    Save
            </button>
            <button onClick = { onClose } id="cancelButton">Cancel</button>
      </>
    );
}