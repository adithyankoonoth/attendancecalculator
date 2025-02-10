// script.js
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const hoursPerWeekInput = document.getElementById('hoursPerWeek');
const currentAttendanceInput = document.getElementById('currentAttendance');
const calculateButton = document.getElementById('calculateButton');
const workingDaysOutput = document.getElementById('workingDays');
const additionalHoursOutput = document.getElementById('additionalHours');
const dateError = document.getElementById('dateError');

let ktuHolidays = []; // Array to store KTU holidays

// Placeholder holiday data (REPLACE with actual data)
ktuHolidays = [
    new Date(2024, 0, 26),
    new Date(2024, 4, 1),
    new Date(2024, 7, 15),
];

const isHoliday = (date) => {
    return ktuHolidays.some(holiday => holiday.toDateString() === date.toDateString());
};

const calculateWorkingDays = (startDate, endDate) => {
    let days = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !isHoliday(currentDate)) {
            days++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
};

const calculateRequiredHours = () => {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const hoursPerWeek = parseFloat(hoursPerWeekInput.value);
    const currentAttendance = parseFloat(currentAttendanceInput.value);

    // Date Validation
    if (startDate > endDate) {
        dateError.textContent = "End date must be after start date.";
        return;
    } else {
        dateError.textContent = ""; // Clear any previous error
    }

    if (!startDate || !endDate || isNaN(hoursPerWeek) || isNaN(currentAttendance) || currentAttendance < 0 || currentAttendance > 100) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const workingDays = calculateWorkingDays(startDate, endDate);
    const weeks = Math.ceil(workingDays / 5);
    const totalPossibleHours = weeks * hoursPerWeek;
    const requiredAttendanceHours = totalPossibleHours * 0.75;
    const currentAttendedHours = totalPossibleHours * (currentAttendance / 100);
    const additionalHoursNeeded = Math.max(0, requiredAttendanceHours - currentAttendedHours);

    workingDaysOutput.textContent = `Working Days: ${workingDays}`;
    additionalHoursOutput.textContent = `Additional Hours Needed: ${Math.ceil(additionalHoursNeeded)}`;
};


calculateButton.addEventListener('click', calculateRequiredHours);

// Event listeners for date inputs to clear errors
startDateInput.addEventListener('change', () => dateError.textContent = "");
endDateInput.addEventListener('change', () => dateError.textContent = "");