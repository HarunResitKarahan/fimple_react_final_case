import { createContext, useState } from 'react'

const PopUpContext = createContext()

export const PupUpProvider = ({ children }) => {
    const [showPopUp, setShowPupUp] = useState(false)

    const values = {
        showPopUp,
        setShowPupUp
    }

    return (
        <PopUpContext.Provider value={values}>{children}</PopUpContext.Provider>
    )
}

export default pupUpContext