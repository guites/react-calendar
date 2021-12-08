import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { EventModal } from '../EventModal';
import { useDate } from '../../Hooks/useDate';

export const App = () => {
    // nav saves distance from current month, setNav changes current month
    const [nav, setNav] = useState(0);
    const [clicked, setClicked] = useState();
    const [events, setEvents] = useState(
        localStorage.getItem('events') ? 
            JSON.parse(localStorage.getItem('events')) :
            []
    );

    const eventForDate = date => events.find(e => e.date === date);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const { days, dateDisplay, years, currentMonth, currentYear } = useDate(events, nav);

    return(
        <>
        <div id="container">
            <CalendarHeader
                currentYear={currentYear}
                currentMonth={currentMonth}
                years={years}
                dateDisplay={dateDisplay}
                onBack={(ev)=>setNav(nav+ev)}
            />

            <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>
            <div id="calendar">
                {days.map((d, index) => (
                    <Day
                    key={index}
                    day={d}
                    onClick={() => {
                        if (d.value !== 'padding') {
                            setClicked(d.date);
                        }
                    }}
                    />
                ))}
            </div>
        </div>
        {
            clicked &&
            <EventModal
            clickedDay={clicked}
            eventData={eventForDate(clicked)}
            onEdit={(ev)=> {
                const filtered = events.filter(e => e.date !== clicked);
                ev.date = clicked;
                filtered.push(ev);
                setEvents(filtered);
                setClicked(null);
            }}
            onClose={() => setClicked(null)}
            onDelete={(index) => {
                // could not do it without using two loop functions, if I splice the value directly from events array it updates on the current session but not on localStorage
                const clickdDateObject = events.find(e => e.date === clicked);
                const filtered = events.filter(e => e.date !== clicked);
                clickdDateObject.events.splice(index, 1);
                filtered.push(clickdDateObject);
                setEvents(filtered);
                setClicked(null);
            }}
            onSave={(ev) => {
                const event = eventForDate(clicked);
                if (!event) {
                    setEvents([...events,
                        {
                            date: clicked,
                            events: [{ title: ev.title, startTime: ev.startTime, duration: ev.duration }]
                        }
                    ]);
                } else {
                    const currentDayObject = events.find(e => e.date === clicked);
                    currentDayObject.events.push(ev);
                    const filtered = events.filter(e => e.date !== clicked);
                    filtered.push(currentDayObject);
                    setEvents(filtered);
                }
                setClicked(null);
            }}
            onClose={() => setClicked(null)}
            />
        }

        </>
    );
}