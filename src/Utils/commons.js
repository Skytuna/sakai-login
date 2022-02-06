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
