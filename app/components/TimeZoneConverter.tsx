"use client"

import { useState, useEffect } from "react"
// import dayjs from "dayjs"
// import utc from "dayjs/plugin/utc"
// import timezone from "dayjs/plugin/timezone"
import moment from "moment-timezone"

// Dayjs setup and setting of initial values for state.
// Also util functions not directly related to state.
// dayjs.extend(utc)
// dayjs.extend(timezone)
const defaultTimezone: string = moment.tz.guess() || "America/New_York"
moment.tz.setDefault(defaultTimezone)
const defaultToTimezone: string = "Europe/London"
const allTimezones: string[] | null = moment.tz.names() || null // Could use Intl underlyingly, only supported in newer browsers, may want to find a backwards compatible version later.
let timeFormat: string = "hh:mm A"
const defaultStartTime: string = moment().format(timeFormat) // TODO: For default timezone.
const defaultConvertedTime: string = moment().tz(defaultToTimezone).format(timeFormat)

const isEmpty = (str: string) => typeof str === "undefined" || str === null || str.length === 0

const isValidTimeFormat = (timeString: string) => {
    // Not designed to be a perfect check.
    // Should be used as an auxiliary to ensure the
    // time string is generally in the right format.
    const regex = /^(\d{1,2}):(\d{2})( )?(AM|PM|am|pm)?$/

    if (timeString.match(regex)) {
        return true
    }

    return false
}

// Be sure to validate the given time string before calling convert12to24 and convert24to12.
const convert12to24 = (time12: string) => {
    const [time, period] = time12.split(' ') // period is meridiem (AM/PM)
    let [hours, minutes]: [number, number] = time.split(':').map(Number) as [number, number]
  
    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0
    }
  
    // Add leading zeros for single-digit hours/minutes
    hours = hours < 10 ? parseInt('0' + hours) : hours
    minutes = minutes < 10 ? minutes : minutes
  
    return `${hours}:${minutes}`
}

const TimeZoneConverter = () => {
    const [fromTimezone, setFromTimezone] = useState(defaultTimezone)
    const [toTimezone, setToTimezone] = useState(defaultToTimezone)
    const [tfhTimeEnabled, setTFHTimeEnabled] = useState(false)
    const [fromTime, setFromTime] = useState(defaultStartTime)
    const [convertedTime, setConvertedTime] = useState(defaultConvertedTime)

    // Handlers for when an important value is changed.
    // and utilities that use state.
    const isInvalidFromTime = () => isEmpty(fromTime) || !moment(`11-5-2023 ${fromTime}`).isValid() || !isValidTimeFormat(fromTime)

    const fromTimezoneChange = () => {
        moment.tz.setDefault(fromTimezone)

        if (isInvalidFromTime()) {
            setConvertedTime("Invalid Time")
            return
        }

        // NOTE: Though I only care about time here, dayjs only takes complete dates, which is why I insert it in.
        const newConvertedTime = moment(`11-5-2023 ${fromTime}`, `MM-DD-YYYY ${timeFormat}`).tz(fromTimezone).tz(toTimezone).format(timeFormat)
        setConvertedTime(newConvertedTime)
    }

    const toTimezoneChange = () => {
        if (isInvalidFromTime()) {
            setConvertedTime("Invalid Time")
            return
        }

        const newConvertedTime = moment(`11-5-2023 ${fromTime}`, `MM-DD-YYYY ${timeFormat}`).tz(toTimezone).format(timeFormat)
        setConvertedTime(newConvertedTime)
    }

    const tfhTimeEnabledChange = () => {
        if (tfhTimeEnabled) {
            timeFormat = "HH:mm"
        } else {
            timeFormat = "hh:mm A"
        }

        const newFromTime = moment(`11-5-2023 ${fromTime}`, `MM-DD-YYYY ${timeFormat}`).format(timeFormat)
        const newConvertedTime = moment(`11-5-2023 ${fromTime}`, `MM-DD-YYYY ${timeFormat}`).tz(toTimezone).format(timeFormat)
        setFromTime(newFromTime)
        setConvertedTime(newConvertedTime)
    }

    const fromTimeChange = () => {
        if (isInvalidFromTime()) {
            setConvertedTime("Invalid Time")
            return
        }

        const newConvertedTime = moment(`11-5-2023 ${fromTime}`, `MM-DD-YYYY ${timeFormat}`).tz(toTimezone).format(timeFormat)
        setConvertedTime(newConvertedTime)
    }

    useEffect(fromTimezoneChange, [fromTimezone])
    useEffect(toTimezoneChange, [toTimezone])
    useEffect(fromTimeChange, [fromTime])
    useEffect(tfhTimeEnabledChange, [tfhTimeEnabled])

    return (
        <div>
            <div className="mb-1">
                <label htmlFor="tfhTimeCheckbox" className="form-check-label">24-Hour&nbsp;</label>
                <input 
                type="checkbox" 
                name="tfhTimeCheckbox" 
                id="tfhTimeCheckbox" 
                className="form-check-input" 
                checked={tfhTimeEnabled}
                onChange={(e) => setTFHTimeEnabled(e.target.checked)}
                aria-label="Twenty-four hour time checkbox"
                disabled={allTimezones ? false : true}/>
            </div>
            <br />
            <label htmlFor="fromTimezoneDropdown" className="form-label">From:&nbsp;</label>
            {
                allTimezones ? (
                    <select
                    className="form-select form-select-sm" 
                    name="fromTimezoneDropdown" 
                    id="fromTimezoneDropdown" 
                    value={fromTimezone} 
                    onChange={(e) => setFromTimezone(e.target.value)}
                    aria-label="Timezone to convert from dropdown">
                        {
                            allTimezones.map((tzName, index) => (
                                <option value={tzName} key={index}>{tzName}</option>
                            ))
                        }
                    </select>
                ) : (<span className="text-danger">Outdated!</span>)
            }
            <br />
            <label htmlFor="toTimezoneDropdown" className="form-label">To:&nbsp;</label>
            {
                allTimezones ? (
                    <select
                    className="form-select form-select-sm" 
                    name="toTimezoneDropdown" 
                    id="toTimezoneDropdown" 
                    value={toTimezone} 
                    onChange={(e) => setToTimezone(e.target.value)}
                    aria-label="Timezone to convert to dropdown">
                        {
                            allTimezones.map((tzName, index) => (
                                <option value={tzName} key={index}>{tzName}</option>
                            ))
                        }
                    </select>
                ) : (<span className="text-danger">Outdated!</span>)
            }
            <br />
            <label htmlFor="originalTime" className="form-label">Time:&nbsp;</label>
            <input 
            className="form-control bg-transparent text-white text-center"
            type="text" 
            name="originalTime" 
            id="originalTime" 
            value={allTimezones ? fromTime : "UPDATE REQUIRED"}
            onChange={(e) => setFromTime(e.target.value)}
            maxLength={8}
            aria-label="Original time"
            disabled={allTimezones ? false : true}/>
            <br />
            <p 
            className="my-auto fs-1 fw-bolder text-info" 
            id="convertedTimeText"
            aria-label="Converted time">{allTimezones ? convertedTime : "Old/Unsupported browser (No Intl API), update required to use this app."}</p>
        </div>
    )
}

export default TimeZoneConverter