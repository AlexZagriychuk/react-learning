const getDateStrEnding = (dateMemberValue: number) => {
    return dateMemberValue === 1 ? "" : "s"
}

// Calculate the difference between 2 dates. Returns a string in one of the the formats (depending on the dates difference value):
// - "x day(s), y hour(s)"
// - "x hour(s), y minute(s)"
// - "x minute(s)"
const dateDiffAsString = (date1: Date, date2: Date = new Date()) => {
    const diffInMinutesTotal = Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 60000))
    const diffInHoursTotal = Math.floor(diffInMinutesTotal / 60)
    const diffInDaysTotal = Math.floor(diffInHoursTotal / 24)

    if (diffInMinutesTotal < 60) {
        return `${diffInMinutesTotal} minute${getDateStrEnding(diffInMinutesTotal)}`
    }

    if (diffInHoursTotal < 24) {
        const minutes = Math.floor(diffInMinutesTotal - diffInHoursTotal * 60)
        return `${diffInHoursTotal} hour${getDateStrEnding(diffInHoursTotal)}, ${minutes} minute${getDateStrEnding(minutes)}`
    }

    const hours = Math.floor(diffInHoursTotal - diffInDaysTotal * 24)
    return `${diffInDaysTotal} day${getDateStrEnding(diffInDaysTotal)}, ${hours} hour${getDateStrEnding(hours)}`
}

const getRandomDate = (startDate: Date, endDate: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate
}

// Generate specified number ${datesToGenerateCount} of random dates in chronological order with the specified step range (1 hour by default):
// - 1st date = random date between firstDateOfRange and firstDateOfRange-1 hour (if datesRangeStep is default); 
// - 2nd date = random date between firstDateOfRange-1 hour and firstDateOfRange-2 hours (if datesRangeStep is default);
// - and so on... 
const generateDates = (datesToGenerateCount: number, firstDateOfRange: Date = new Date(), datesRangeStepUnit: DateUnit = DateUnit.HOUR, datesRangeStepValue: number = -1): Date[] => {
    const result = Array(datesToGenerateCount) as Date[]
    const dateStepRangeInMs = datesRangeStepUnit * datesRangeStepValue

    for (let i = 0; i < datesToGenerateCount; i++) {
        let secondDateOfRange = new Date(firstDateOfRange.getTime() + dateStepRangeInMs)
        result[i] = getRandomDate(secondDateOfRange, firstDateOfRange)
        firstDateOfRange = secondDateOfRange
    }

    return result
}

enum DateUnit {
    SECOND = 1000,
    MINUTE = 1000 * 60,
    HOUR = 1000 * 60 * 60,
    DAY = 1000 * 60 * 60 * 24
}

export { dateDiffAsString, getRandomDate, generateDates, DateUnit }