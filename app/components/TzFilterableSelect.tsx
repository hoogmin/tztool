"use client"

import { 
    useState, 
    Dispatch, 
    SetStateAction 
} from "react"
import {
    isEmpty
} from "@/app/tzt-helpers"

interface FilterableSelectProps {
    nameId: string,
    options: string[],
    tzValue: string,
    setTzFunc: Dispatch<SetStateAction<string>>
}

const TzFilterableSelect = ({
    nameId,
    options,
    tzValue,
    setTzFunc
}: FilterableSelectProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value)
    }

    const filterOptions = (query: string) => {
        if (isEmpty(query)) {
            return options
        }

        const filteredOptions = options.filter(option => {
            return option.toLowerCase().indexOf(query.toLowerCase()) >= 0 || option.replaceAll("_", " ").toLowerCase().indexOf(query.toLowerCase()) >= 0 || option === tzValue
        })

        return filteredOptions
    }

    const filteredOptions = filterOptions(searchTerm)

    return (
        <div className="searchable-tzselect">
            <input
            className="form-control form-select-sm mb-2" 
            type="search" 
            value={searchTerm} 
            onChange={handleSearchChange}
            placeholder="Filter..."
            maxLength={60} />
            <select
                className="form-select form-select-sm"
                name={nameId}
                id={nameId}
                value={tzValue}
                onChange={(e) => setTzFunc(e.target.value)}
                aria-label={`${nameId} dropdown`}>
                {
                    filteredOptions.map((tzName, index) => (
                        <option value={tzName} key={index}>{tzName.replaceAll("_", " ")}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default TzFilterableSelect