const getDateStrEnding = (dateMemberValue: number) => {
    return dateMemberValue === 1 ? "" : "s"
}

// Calculate the difference between 2 dates. Returns a string in one of the the formats (depending on the dates difference value):
// - "x day(s), y hour(s)"
// - "x hour(s), y minute(s)"
// - "x minute(s)"
const dateDiffAsString = (date1: Date, date2 : Date = new Date()) => {
    const diffInMinutesTotal = Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 60000))
    const diffInHoursTotal = Math.floor(diffInMinutesTotal / 60)
    const diffInDaysTotal = Math.floor(diffInHoursTotal / 24)

    if(diffInMinutesTotal < 60) {
        return `${diffInMinutesTotal} minute${getDateStrEnding(diffInMinutesTotal)}`
    }

    if(diffInHoursTotal < 24) {
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

// Generate specified number ${count} of random dates in chronological order with a step of 1 hour:
// - 1st date = between now and now-1 hour; 2nd date = between now-1 hour and now-2 hours and so on... 
const generateDates = (datesCount: number) : Date[] => {
    const result = Array(datesCount) as Date[]
    const oneHourInMs = 1000*3600*1
    let maxDate = new Date()

    for(let i = 0; i < datesCount; i++) {
        let minDate = new Date(maxDate.getTime() - oneHourInMs)
        result[i] = getRandomDate(minDate, maxDate)
        maxDate = minDate
    }

    return  result
}

export { dateDiffAsString, getRandomDate, generateDates }