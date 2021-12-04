import React from 'react';

export const CalendarHeader = ({currentYear, currentMonth, years, dateDisplay, onBack}) => {

    return(
        <div id="header">
            <div id="upper-header">
                <div id="monthDisplay">
                    {dateDisplay}
                </div>
                <div>
                    <button onClick={ e => onBack(-1) } id="backButton">Back</button>
                    <button onClick={ e => onBack(+1) } id="nextButton">Next</button>
                </div>
            </div>
            <div id="lower-header">
                <div className="jumpToDivs">
                    <label htmlFor="jumpToMonth">Month:</label>
                    <select
                    value={currentMonth}
                    onChange={(e) => {
                        // this select can never change the current year
                        const targetMonth = e.target.value;
                        onBack(targetMonth - currentMonth);
                    }}
                    name="jumpToMonth" id="jumpToMonth">
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>    
                    </select>
                </div>
                <div className="jumpToDivs">
                    <label htmlFor="jumpToYear">Year:</label>
                    <select
                    value={currentYear}
                    onChange={(e) => {
                        const targetYear = e.target.value;
                        const diffInMonths = (targetYear - currentYear) * 12;
                        onBack(diffInMonths);
                    }}
                    name="jumpToYear" id="jumpToYear">
                        { years.map((year, index) => (
                            <option key={index}>
                                {parseInt(year)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}