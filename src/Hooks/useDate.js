import React, { useEffect, useState } from 'react';

export const useDate = (events, nav) => {
    const [dateDisplay, setDateDisplay] = useState('');
    const [days, setDays] = useState([]);
    const [years, setYears] = useState([]);
    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    const eventForDate = date => events.find(e => e.date === date);

    useEffect(() => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        setCurrentMonth(month);
        const year = dt.getFullYear();
        setCurrentYear(year);

        const yearsArr = [];
        for (let i = year - 3; i < year + 3; i++) {
            yearsArr.push(i);
        }
        setYears(yearsArr);

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = [];
        for (let i = 0; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;
            if (i > paddingDays) {
                // se não for um padding day, passa valores, habilita eventos e 
                // verifica se é o dia atual
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString
                });
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false,
                    date: ''
                });
            }
        }
        // passa o resultado da iteração para o state Days
        setDays(daysArr);
    }, [events, nav]);

    return {
        days,
        dateDisplay,
        years,
        currentMonth,
        currentYear
    };
};