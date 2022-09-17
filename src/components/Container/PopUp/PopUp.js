import { useContext, forwardRef, useImperativeHandle, useState } from 'react'
import "./PopUp.css"
import FormContext from '../../../context/FormContext'
import { BsXSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import PopUpContext from "../../../context/PopUpContext"

function PopUp(props, ref) {
    const { formValues } = useContext(FormContext)
    const { setShowPupUp } = useContext(PopUpContext)
    const [popUpState, setPopUpState] = useState(false)
    let tableValues = {}

    useImperativeHandle(ref, () => ({
        openModal: () => setPopUpState(true)
    }));
    if (!popUpState) return null;

    const tableHeaders = ['Taksit No', 'Taksit Tutarı', 'Ana Para', 'Kalan Ana Para', 'Kâr Tutarı', 'KKDF', 'BSMV']
    let By = 1
    if (formValues.interestRateTimeInterval !== formValues.payment) {
        if (formValues.interestRateTimeInterval === "Haftalık" && formValues.payment === "Aylık") {
            By = 1 / 4
        } else if (formValues.interestRateTimeInterval === "Haftalık" && formValues.payment === "Yıllık") {
            By = 1 / 52
        } else if (formValues.interestRateTimeInterval === "Aylık" && formValues.payment === "Haftalık") {
            By = 4
        } else if (formValues.interestRateTimeInterval === "Aylık" && formValues.payment === "Yıllık") {
            By = 1 / 12
        } else if (formValues.interestRateTimeInterval === "Yıllık" && formValues.payment === "Haftalık") {
            By = 52
        } else if (formValues.interestRateTimeInterval === "Yıllık" && formValues.payment === "Aylık") {
            By = 12
        }
    }
    const calculateCompoundInterest = () => {
        const interestRate = (formValues.interestRate / 100) / By
        let profit = (formValues.creditAmount * (interestRate))
        let taxBsmv = (((formValues.taxBsmv) * profit) / 100)
        let taxKkdf = (((formValues.taxKkdf) * profit) / 100)
        const Rate = ((interestRate) + (((taxBsmv * 100) / formValues.creditAmount) / 100) + (((taxKkdf * 100) / formValues.creditAmount) / 100))
        // const Rate = 0.0285,
        // console.log(interestRate)
        // console.log(((taxKkdf * 100) / formValues.creditAmount) / 100)
        // console.log(((taxBsmv * 100) / formValues.creditAmount) / 100)
        // console.log(By)
        // console.log(Rate)
        // console.log(((formValues.interestRate / 100) + (((taxBsmv * 100) / formValues.creditAmount) / 100) + (((taxKkdf * 100) / formValues.creditAmount) / 100)))
        const Nper = formValues.installmentCount
        let Pv = formValues.creditAmount
        // const payment = Pv * ((Rate * ((1 + Rate) ** Nper)) / ((((1 + Rate) ** Nper) - 1)))
        const payment = (Rate * Pv) / (1 - (1 + Rate) ** (-Nper))
        const tableValues = {
            'payment': payment,
            'mainMoney': [],
            'unpaidMainMoney': [],
            'profit': [],
            'taxKkdf': [],
            'taxBsmv': []
        }
        for (let i = 0; i < formValues.installmentCount; i++) {
            tableValues.mainMoney.push(Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit))
            // console.log(Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit))
            tableValues['unpaidMainMoney'].push(Number(Pv) - (Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit)))
            tableValues['profit'].push((Pv * interestRate))
            tableValues['taxKkdf'].push(taxKkdf)
            tableValues['taxBsmv'].push(taxBsmv)
            Pv = Number(tableValues.unpaidMainMoney[i])
            profit = (Number(tableValues.unpaidMainMoney[i]) * (interestRate))
            taxBsmv = ((formValues.taxBsmv * profit) / 100)
            taxKkdf = ((formValues.taxKkdf * profit) / 100)
        }
        return tableValues
    }
    const calculateSimpleInterest = () => {
        const interestRate = (formValues.interestRate / 100) / By
        const simpleInterest = formValues.creditAmount * interestRate * formValues.installmentCount
        let profit = simpleInterest
        let taxBsmv = (((formValues.taxBsmv) * profit) / 100)
        let taxKkdf = (((formValues.taxKkdf) * profit) / 100)
        let Pv = formValues.creditAmount
        const payment = (simpleInterest + formValues.creditAmount + taxBsmv + taxKkdf) / formValues.installmentCount
        const tableValues = {
            'payment': payment,
            'mainMoney': [],
            'unpaidMainMoney': [],
            'profit': [],
            'taxKkdf': [],
            'taxBsmv': []
        }
        for (let i = 0; i < formValues.installmentCount; i++) {
            tableValues.mainMoney.push(formValues.creditAmount / formValues.installmentCount)
            tableValues['unpaidMainMoney'].push(Pv - (Number(payment) - Number(taxBsmv) - Number(taxKkdf) - Number(profit)))
            tableValues['profit'].push(simpleInterest / formValues.installmentCount)
            tableValues['taxKkdf'].push(taxKkdf)
            tableValues['taxBsmv'].push(taxBsmv)
            Pv = Number(tableValues.unpaidMainMoney[i])
            // profit = (Number(tableValues.unpaidMainMoney[i]) * (interestRate))
            // taxBsmv = ((formValues.taxBsmv * profit) / 100)
            // taxKkdf = ((formValues.taxKkdf * profit) / 100)
        }
        // console.log(`Basit Faiz: ${simpleInterest}`)
        // console.log(`Total Amount: ${simpleInterest + formValues.creditAmount}`)
        return tableValues
    }
    if (formValues.interestType === "BileşikFaiz") {
        tableValues = calculateCompoundInterest()
    } else if (formValues.interestType === "BasitFaiz") {
        tableValues = calculateSimpleInterest()
    }
    // useEffect(() => {
    //     // console.log(tableValues)
    // }, [])
    return (
        <div className='popUp'>
            <span className='popUpExit' onClick={() => {
                setShowPupUp(false)
                setPopUpState(false)
            }}>
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
                                {tableHeaders.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {[...Array(tableValues.mainMoney.length)].map((x, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{Number(tableValues.payment.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.mainMoney[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.unpaidMainMoney[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.profit[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.taxKkdf[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                    <td>{Number(tableValues.taxBsmv[i].toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            <span style={{ fontSize: "12px", color: "#444343" }}>*Ödeme Planı {formValues.payment} Olarak Hesaplanmıştır.</span>
            {/* {JSON.stringify(formValues, null, 2)} */}
        </div>
    )
}

export default forwardRef(PopUp) 