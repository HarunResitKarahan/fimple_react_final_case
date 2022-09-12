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
    let taxBsmv = ((formValues.taxBsmv * formValues.creditAmount) / 100) / By
    let taxKkdf = ((formValues.taxKkdf * formValues.creditAmount) / 100) / By
    const Rate = ((formValues.interestRate / 100) + (formValues.taxBsmv / 100) + (formValues.taxKkdf / 100)) / By
    const Nper = formValues.installmentCount
    let Pv = formValues.creditAmount
    const interestRate = (formValues.interestRate / 100)

    // const payment = Pv * ((Rate * ((1 + Rate) ** Nper)) / ((((1 + Rate) ** Nper) - 1)))
    const payment = (Rate * Pv) / (1 - (1 + Rate) ** (-Nper))
    let profit = (formValues.creditAmount * ((formValues.interestRate / By) / 100))
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
        tableValues['profit'].push((Pv * (interestRate / By)))
        tableValues['taxKkdf'].push(taxKkdf)
        tableValues['taxBsmv'].push(taxBsmv)
        Pv = Number(tableValues.unpaidMainMoney[i])
        taxBsmv = ((formValues.taxBsmv / By) * Number(tableValues.unpaidMainMoney[i])) / 100
        taxKkdf = ((formValues.taxKkdf / By) * Number(tableValues.unpaidMainMoney[i])) / 100
        profit = (Number(tableValues.unpaidMainMoney[i]) * ((formValues.interestRate / By) / 100))
    }
    // console.log(tableValues)
    // const [unpaidMainMoney, setUnpaidMainMoney] = useState(Number(Pv) - Number(mainMoney))
    // console.log(Pv - mainMoney)
    // console.log(formValues)
    // useEffect(() => {
    //     // console.log(tableValues)
    // }, [])
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
                            {[...Array(tableValues.mainMoney.length)].map((x, i) =>
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
                        </tbody>

                    </table>
                </div>
            </div>
            {JSON.stringify(formValues, null, 2)}
        </div>
    )
}

export default PopUp