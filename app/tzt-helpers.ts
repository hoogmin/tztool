export const isEmpty = (str: string) => typeof str === "undefined" || str === null || str.length === 0
export const inRange = (n: number, l: number, u: number) => n >= l && n <= u

export const isValidTimeFormat = (timeString: string) => {
    // Not designed to be a perfect check.
    // Should be used as an auxiliary to ensure the
    // time string is generally in the right format.
    const regex = /^(\d{1,2}):(\d{2})( )?(AM|PM|am|pm)?$/

    if (timeString.match(regex)) {
        return true
    }

    return false
}

export const convert12to24 = (time12: string) => {
    // Be sure to validate the given time string before calling convert12to24.
    // If it is invalid, simply return midnight in 24-hour time.
    const validationRegex = /^(\d{1,2}):(\d{2})( )(AM|PM|am|pm)$/

    if (!time12.match(validationRegex)) {
        return "00:00"
    }

    const [time, period] = time12.split(' ') // period is meridiem (AM/PM)
    let [hours, minutes]: [number | string, number | string] = time.split(':').map(Number) as [number, number]

    // Don't allow the original 12-hour time to be out of range.
    if (!inRange(hours, 1, 12) || !inRange(minutes, 0, 59)) {
        return "00:00"
    }
  
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0
    }
  
    // Add leading zeros for single-digit hours/minutes
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
  
    return `${hours}:${minutes}`
}