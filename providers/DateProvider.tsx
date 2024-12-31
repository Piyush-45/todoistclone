import { createContext, useState } from "react";

const DateContext = createContext()



export const DateContextProvider = ({ children }: any) => {

    const [selectedDate, setSelectedDate] = useState()

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    )
}