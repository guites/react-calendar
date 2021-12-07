import React, { useState, useEffect } from 'react';
export const EditEventContent = ({eventData, isEdditing, onSave}) => {

    const [title, setTitle] = useState(eventData.title);
    const [startTime, setStartTime] = useState(eventData.startTime);
    const [duration, setDuration] = useState(eventData.duration);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            document.getElementById(`${error}Input`).focus();
        }
    }, [error]);

    return (
        <>
            <div>
                <label htmlFor="eventTitleInput">Describe the event:</label>
                <input
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
            <button onClick={isEdditing} id="cancelButton">Cancel</button>
        </>
    );
};
