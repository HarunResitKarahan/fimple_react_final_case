import { createContext, useState } from 'react'

const FormContext = createContext()

export const FormContextProvider = ({ children }) => {
    const [formValues, setFormValues] = useState([])
    const values = {
        formValues,
        setFormValues,
    }

    return (
        <FormContext.Provider value={values}>{children}</FormContext.Provider>
    )
}

export default FormContext