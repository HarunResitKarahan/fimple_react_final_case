import React from 'react'
import { useFormik } from 'formik';
import "./Form.css"

function Form() {
    const formik = useFormik({
        initialValues: {
            creditAmount: 0,
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
                            onChange={formik.handleChange}
                            placeholder={formik.values.creditAmount}
                            // value={formik.values.creditAmount}
                            autocomplete="nope"
                        />
                        <span style={{ position: "absolute", color: '#818181', right: '12px' }}>₺</span>
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="lastName">Taksit Sayısı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="email">Kâr oranı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="email">Taksit aralığı seçimi → aylık, haftalık, yıllık</label>
                    </div>
                    <div className='input'>
                        <input
                            id="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autocomplete="off"
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="email">Vergi oranı → bsmv ve kkdf</label>
                    </div>
                    <div className='input'>
                        <input
                            id="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            autocomplete="off"
                        />
                    </div>
                </div>
                <button type="submit">Hesapla</button>
            </form>
        </>
    )
}

export default Form