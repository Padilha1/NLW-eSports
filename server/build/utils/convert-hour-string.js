"use strict";
// 18:00 -> 1080
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHourString = void 0;
function convertHourString(hourString) {
    const [hours, minutes] = hourString.split(':').map(Number);
    const minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}
exports.convertHourString = convertHourString;
