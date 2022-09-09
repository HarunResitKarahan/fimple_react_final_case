import { useContext, useState, useEffect } from 'react'
import "./PopUp.css"
import FormContext from '../../../context/FormContext'
import { BsXSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import PopUpContext from "../../../context/PopUpContext"

function PopUp() {
    const { formValues } = useContext(FormContext)
    const { setShowPupUp } = useContext(PopUpContext)
    const headers = ['Taksit No', 'Taksit Tutarı', 'Ana Para', 'Kalan Ana Para', 'Kâr Tutarı', 'KKDF', 'BSMV']
    const taxBsmv = (formValues.taxBsmv * formValues.creditAmount) / 100
    const taxKkdf = (formValues.taxKkdf * formValues.creditAmount) / 100
    const Rate = (formValues.interestRate / 100) + (formValues.taxBsmv / 100) + (formValues.taxKkdf / 100)
    const Nper = formValues.installmentCount
    let Pv = formValues.creditAmount
    const interestRate = (formValues.interestRate / 100)
    const payment = Pv * ((Rate * ((1 + Rate) ** Nper)) / ((((1 + Rate) ** Nper) - 1)))
    const profit = (formValues.creditAmount * (formValues.interestRate / 100))
    const tableValues = {
        'mainMoney': [],
        'unpaidMainMoney': [],
        'profit': [],
        'taxKkdf': [],
        'taxBsmv': []
    }
    // console.log(payment)
    // let tempAmount = Pv
    for (let i = 0; i < formValues.installmentCount; i++) {
        tableValues.mainMoney.push(Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit))
        tableValues['unpaidMainMoney'].push(Number(Pv) - (Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit)))
        tableValues['profit'].push((Pv * interestRate))
        tableValues['taxKkdf'].push(taxKkdf)
        tableValues['taxBsmv'].push(taxBsmv)
        Pv = Number(tableValues.unpaidMainMoney[i])
    }
    console.log(tableValues)
    // const [unpaidMainMoney, setUnpaidMainMoney] = useState(Number(Pv) - Number(mainMoney))
    // console.log(Pv - mainMoney)
    // console.log(formValues)
    useEffect(() => {
        // console.log(tableValues)
    }, [])
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

                        {/* <tbody>
                            {[...Array(formValues.installmentCount)].map((x, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{Number(payment.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.mainMoney[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.unpaidMainMoney[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.profit[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.taxKkdf[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.taxBsmv[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                </tr>
                            )}
                        </tbody> */}

                    </table>
                </div>
            </div>
            {JSON.stringify(formValues, null, 2)}
        </div>
    )
}

export default PopUp