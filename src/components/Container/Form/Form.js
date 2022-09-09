import { useContext } from 'react'
import { useFormik } from 'formik';
import "./Form.css"
import PopUpContext from "../../../context/PopUpContext"
import FormContext from '../../../context/FormContext'

function Form() {
    const { setShowPupUp } = useContext(PopUpContext)
    const { setFormValues } = useContext(FormContext)
    const formik = useFormik({
        initialValues: {
            creditAmount: 0,
            installmentCount: 1,
            interestRate: 0,
            payment: '',
            taxBsmv: 0,
            taxKkdf: 0,
        },
        onSubmit: values => {
            setShowPupUp(true)
            // setFormValues(JSON.stringify(values, null, 2))
            setFormValues(values)
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} autocomplete="off">
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="credit-amount">Kredi Tutarı: </label>
                    </div>
                    <div className='input'>
                        <input
                            id="credit-amount"
                            type="number"
                            min="1"
                            onChange={formik.handleChange}
                            placeholder={formik.values.creditAmount}
                            // value={formik.values.creditAmount}
                            autocomplete="nope"
                            required
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>₺</span>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="installment-count">Taksit Sayısı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="installment-count"
                            type="number"
                            onChange={formik.handleChange}
                            placeholder={formik.values.installmentCount}
                            autocomplete="off"
                            required
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="interest-rate">Kâr oranı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="interest-rate"
                            type="number"
                            onChange={formik.handleChange}
                            placeholder={formik.values.interestRate}
                            autocomplete="off"
                            required
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>%</span>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="payment">Taksit aralığı</label>
                    </div>
                    <div className='input'>
                        <select
                            id="payment"
                            onChange={formik.handleChange}
                            required
                        >
                            <option label="Seçiniz" value="" selected disabled hidden>Seçiniz</option>
                            <option value="weekly">Haftalık</option>
                            <option value="monthly">Aylık</option>
                            <option value="yearly">Yıllık</option>
                        </select>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="taxBsmv">Vergi oranı (Bsmv)</label>
                    </div>
                    <div className='input'>
                        <input
                            id="taxBsmv"
                            type="number"
                            onChange={formik.handleChange}
                            placeholder={formik.values.taxBsmv}
                            autocomplete="off"
                            required
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>%</span>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="taxKkdf">Vergi oranı (Kkdf)</label>
                    </div>
                    <div className='input'>
                        <input
                            id="taxKkdf"
                            type="number"
                            onChange={formik.handleChange}
                            placeholder={formik.values.taxKkdf}
                            autocomplete="off"
                            required
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>%</span>
                    </div>
                </div>
                <button type="submit">Hesapla</button>
            </form>
        </>
    )
}

export default Form