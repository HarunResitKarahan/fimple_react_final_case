import React from 'react'
import { useFormik } from 'formik';

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
            <label htmlFor="firstName">Kredi Tutarı</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />
            <label htmlFor="lastName">Taksit Sayısı</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />
            <label htmlFor="email">Kâr oranı</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="email">Taksit aralığı seçimi → aylık, haftalık, yıllık</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="email">Vergi oranı → bsmv ve kkdf</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default Form