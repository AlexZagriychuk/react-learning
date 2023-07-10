const convertDateStrToLocaleStr = (dateStr: string) => {
    return new Date(dateStr).toLocaleString()
}

const convertDateStrToLocaleDateStr = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString()
}

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


export { convertDateStrToLocaleStr, convertDateStrToLocaleDateStr, dateDiffAsString }