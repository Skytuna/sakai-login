// Filter lessons according to their codes and names
const filterLessons = (unfilteredLessons) => {
    let filteredLessons = [];

    for (const lesson of unfilteredLessons) {
        let isValidLesson = false;

        const stringPieces = lesson.split(' ');
        for (const stringPiece of stringPieces) {
            if (isValidLessonCode(stringPiece)) {
                isValidLesson = true;
                break;
            }
        }

        if (isValidLesson) {
            const formattedLesson = formatLesson(lesson, stringPieces);
            filteredLessons.push(formattedLesson);
        }
    }
    return filteredLessons;
};
module.exports.filterLessons = filterLessons;

const formatLesson = (lesson, stringPieces) => {
    /* 
        stringPieces = ['2021', 'Algorithms and Computational', 'Example', 'CME'];
        return {
            value: 'Algorithms and Computational',
            label: 'Algorithms and Computational',
            code: 'CME 1024'
        }
    */
    const code = getLessonCodeName(stringPieces) + ' ' + getLessonCodeId(stringPieces);
    return { value: lesson, label: lesson, code };
};

const getLessonCodeName = (stringPieces) => {
    for (const stringPiece of stringPieces) {
        if (isCodeName(stringPiece)) return stringPiece;
    }

    return '';
};

const getLessonCodeId = (stringPieces) => {
    for (const stringPiece of stringPieces) {
        if (isCodeId(stringPiece)) return stringPiece;
    }

    return 0;
};

const isWord = (str) => {
    for (const char of str) {
        const isLetter = char.match(/[a-z]/i);
        if (!isLetter) return false;
    }

    return true;
};

const isCodeName = (str) => {
    if (!isWord(str)) return false; //      Not patterns like: 5DA, 24B
    if (str.length !== 3) return false; //  Not patterns like: CMEG, MATH, PHYSICS
    if (!isUpperCase(str)) return false; // Not patterns like: math, Physicsf

    return true;
};

const isCodeId = (str) => {
    if (str.length !== 4) return false;

    const isValidNum = !isNaN(str);
    return isValidNum;
};

const isValidLessonCode = (str) => {
    return isCodeName(str) || isCodeId(str);
};

const isUpperCase = (str) => /^[A-Z]*$/.test(str);
