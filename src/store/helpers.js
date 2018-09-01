// sort appointment list by starting date
const sorter = (a,b) => ((Number(a.start.hour) * 60) + Number(a.start.minute)) - ((Number(b.start.hour * 60)) + Number(b.start.minute));

// check if supplied appointment date range does not collide with other
// -----10:00--12:00-------
// --09:00------------13:00
const dateRangeOverlap = (a, b) => {
    let endA = ((Number(a.end.hour * 60)) + Number(a.end.minute));
    let startA = ((Number(a.start.hour * 60)) + Number(a.start.minute));

    let endB = ((Number(b.end.hour * 60)) + Number(b.end.minute));
    let startB = ((Number(b.start.hour * 60)) + Number(b.start.minute));

    if (endA <= startB || startA >= endB) {
        return false;
    }
    return true;
}

// generate a hashtable of years, months and days of a gregorian calendar for multiple year range specified in parameters
const calendarGenerator = (startYear, range) => {

    let calendar = {};

    for (let year = startYear-range; year<startYear+range; year++) {
        calendar[year] = {};
        for (let month = 1; month<=12; month++) {
            calendar[year][month] = {};
            let dayCount = 31; // january has 31 days
            if (month <= 7 && !(month % 2) || month > 7 && month % 2) { // august(7) has 31 days and the pattern shifts
                dayCount = 30;
            }
            if (month==2) { // leap year
                (year % 4 == 0 && year % 100 !== 0 || year % 400 == 0) ? dayCount = 29 : dayCount = 28; 
            }
            for (let day=1; day<=dayCount; day++) {
                calendar[year][month][day] = [];
            }
        }
    }
    return calendar;
}

// mutates calendar data structure!
// does not trigger validators!
// only for development
const populateCalendar = (calendar, date, amount) => {
    for (let i = 1; i<=amount; i++) {
        calendar[date.getFullYear()][date.getMonth()][date.getDate()].push({
            id: `${i}`,
            name: `name${i}`,
            description: `description${i}`,
            priority: i%2 ? 'low' : 'high',
            start:{
                hour: `${i}`,
                minute: "00"
            },
            end:{
                hour: `${i+1}`,
                minute: "00"
            }
        });
    }
    return calendar;
}


const calendarMaker = (range, populate) => {
    let currentDate = new Date();
    let calendar = calendarGenerator(currentDate.getFullYear(), range);
    if (populate) {
        populateCalendar(calendar, currentDate, 5);
    }
    return calendar;
}

export default {
    dateRangeOverlap,
    sorter,
    calendarMaker,
    calendarGenerator
}