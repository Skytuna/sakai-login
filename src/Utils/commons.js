export const getCellData = (schedule, hour, day) => {
    const defaultCell = {
        id: '',
        day: '',
        color: '',
        name: '',
        fullname: '',
        code: '',
    };

    const row = schedule.find((row) => row.hour === hour);
    if (!row) return defaultCell;

    const cell = row.cells.find((cell) => cell.day === day);
    if (!cell) return defaultCell;

    return cell;
};

/* 
    Converts turkish day name to day of week enum

    Pazar -> 0
    Salı -> 2
*/
const convertTurkishDay = (dayName) => {
    switch (dayName) {
        case 'Pazar':
            return 0;
        case 'Pazartesi':
            return 1;
        case 'Salı':
            return 2;
        case 'Çarşamba':
            return 3;
        case 'Perşembe':
            return 4;
        case 'Cuma':
            return 5;
        case 'Cumartesi':
            return 6;
    }
};

/* 
    Converts hour string to hour integer

    "09:00" -> 9
    "11:00" -> 11
*/
const convertHourString = (hourString) => {
    return parseInt(hourString.split(':')[0]);
};

/* 
    Converts schedule state object to node-schedule format
*/
export const convertScheduleObj = (schedule) => {
    let lessons = [];

    for (const { cells, hour } of schedule) {
        cells.map((lesson) => {
            lessons.push({
                name: lesson.fullname,
                hour: convertHourString(hour),
                day: convertTurkishDay(lesson.day),
                jobName:
                    convertHourString(hour).toString() + convertTurkishDay(lesson.day).toString(),
            });
        });
    }

    return lessons;
};
