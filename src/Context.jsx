import { createContext, useState } from "react";

export const User = createContext({})
export const Data = createContext({})


export default function UserProvider({ children }) {
    const [sh, setsh] = useState(null)

    return <User.Provider value={{ sh, setsh }}>{children}</User.Provider>


}


export function DataProvider({ children }) {
    const [weather, setweather] = useState({})

    return <Data.Provider value={{ weather, setweather }}>{children}</Data.Provider>


}