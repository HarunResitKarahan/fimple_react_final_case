import React from 'react'
import { useFormik } from 'formik';
import "./Form.css"

function Form() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="firstName">Kredi Tutarı: </label>
                    </div>
                    <div className='input'>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>
                </div>
                <div className='form-items'>
                    <div className='label'>
                        <label htmlFor="lastName">Taksit Sayısı</label>
                    </div>
                    <div className='input'>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
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
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
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
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
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
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Form