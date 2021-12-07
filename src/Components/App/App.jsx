import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal';
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
            clicked && !eventForDate(clicked) &&
            <NewEventModal
            onSave={(ev) => {
                setEvents([...events, { title: ev.title, startTime: ev.startTime, duration: ev.duration, date: clicked }]);
                setClicked(null);
            }}
            onClose={() => setClicked(null)}
            />
        }
        {
            clicked && eventForDate(clicked) &&
            <DeleteEventModal

            eventData={eventForDate(clicked)}
            onEdit={(ev)=> {
                const filtered = events.filter(e => e.date !== clicked);
                ev.date = clicked;
                filtered.push(ev);
                setEvents(filtered);
                setClicked(null);
            }}
            onClose={() => setClicked(null)}
            onDelete={() => {
                setEvents(events.filter(e => e.date !== clicked));
                setClicked(null);
            }}
            onClose={() => setClicked(null)}
            />
        }

        </>
    );
}