import { useContext } from 'react'
import "./PopUp.css"
import FormContext from '../../../context/FormContext'
import { BsXSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import PopUpContext from "../../../context/PopUpContext"

function PopUp() {
    const { formValues } = useContext(FormContext)
    const { setShowPupUp } = useContext(PopUpContext)
    const headers = ['Taksit No', 'Taksit Tutarı', 'Ana Para', 'Kalan Ana Para', 'Kâr Tutarı', 'KKDF', 'BSMV']
    const Rate = (formValues.interestRate / 100) + (formValues.taxBsmv / 100) + (formValues.taxKkdf / 100)
    console.log(Rate)
    const Nper = formValues.installmentCount
    const Pv = formValues.creditAmount
    const payment = Pv * ((Rate * ((1 + Rate) ** Nper)) / ((((1 + Rate) ** Nper) - 1)))
    // console.log(formValues)
    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues])
    return (
        <div className='popUp'>
            <span className='popUpExit' onClick={() => { setShowPupUp(false) }}>
                <IconContext.Provider value={{ color: "#f77c34", className: "global-class-name", size: "27px" }}>
                    <div>
                        <BsXSquare />
                    </div>
                </IconContext.Provider>
            </span>
            <div className='popUpContainer'>
                <div className='containerHeader'>
                    <h1>{formValues.payment} Geri Ödeme Planı Tablosu</h1>
                </div>
                <div className='popUpTable'>
                    <table>
                        <thead>
                            <tr>
                                {headers.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {[...Array(formValues.installmentCount)].map((x, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{payment.toFixed(2)} ₺</td>
                                    <td>{formValues.interestRate} ₺</td>
                                    <td>{formValues.payment} ₺</td>
                                    <td>{formValues.taxBsmv} ₺</td>
                                    <td>{formValues.taxKkdf} ₺</td>
                                    <td>{formValues.taxKkdf} ₺</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            {JSON.stringify(formValues, null, 2)}
        </div>
    )
}

export default PopUp