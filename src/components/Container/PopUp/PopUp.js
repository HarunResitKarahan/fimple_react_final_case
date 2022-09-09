import { useContext } from 'react'
import "./PopUp.css"
import FormContext from '../../../context/FormContext'

function PopUp() {
    const { formValues } = useContext(FormContext)
    console.log(formValues)
    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues])
    return (
        <div className='popUp'>{JSON.stringify(formValues, null, 2)}</div>
    )
}

export default PopUp