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
                        <label htmlFor="creditAmount">Kredi Tutarı: </label>
                    </div>
                    <div className='input'>
                        <input
                            id="creditAmount"
                            type="number"
                            min={1}
                            onChange={formik.handleChange}
                            placeholder={0}
                            // value={formik.values.creditAmount}
                            autocomplete="nope"
                            required
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>₺</span>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="installmentCount">Taksit Sayısı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="installmentCount"
                            type="number"
                            min={1}
                            onChange={formik.handleChange}
                            placeholder={1}
                            autocomplete="off"
                            required
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="interestRate">Kâr oranı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="interestRate"
                            type="number"
                            min={0}
                            onChange={formik.handleChange}
                            placeholder={0}
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
                            <option value="Haftalık">Haftalık</option>
                            <option value="Aylık">Aylık</option>
                            <option value="Yıllık">Yıllık</option>
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
                            min={0}
                            onChange={formik.handleChange}
                            placeholder={0}
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
                            min={0}
                            onChange={formik.handleChange}
                            placeholder={0}
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