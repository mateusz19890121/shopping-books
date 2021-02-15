import "./Form.css";
import React,{useState, useEffect} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios'



const Form = ({allBooks}) => {
    const [data, setData] = useState(null);
    const [productId, setProductId] = useState(null);
    const [qty, setQty] = useState(null);



useEffect(() => {
    let data = '';
    if (allBooks !== null && localStorage && localStorage.getItem('products')) {
        data = localStorage.getItem('products');
    const getName = data.slice(0, [data.length - 4]);
    const findId = allBooks.allData.filter((item,i) => item.title === getName)[0].id    
        setData(data);
    const getQty = data.slice(-1);
        setProductId(findId);
        setQty(getQty);
    }
  
  }, [allBooks]);
  const sendData = (values)=>{
    axios.post('http://localhost:3001/api/order', {
        order: [
            {
              id: productId,
              quantity: qty
            }
          ],
        first_name: values.first_name,
        last_name: values.last_name,
        city: values.city,
        zip_code: values.zip_code,
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

return(
  <div className="app">
    <h1>
     PODSUMOWANIE ZAMÓWIENIA:
    </h1>

     <div>{data}</div>
    <Formik
      initialValues={{ 
        first_name: "",
        last_name: "",
        city: "",
        zip_code: ""
        }}
      onSubmit={async values => {
        sendData(values);
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().min(4).required("Required"),
        last_name: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        zip_code: Yup.string()
        .min(4).max(6).required("Required"),
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="first_name" style={{ display: "block" }}>
              Imię:
            </label>
            <input
              id="first_name"
              placeholder="Enter your name"
              type="text"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.first_name && touched.first_name
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.first_name && touched.first_name && (
              <div className="input-feedback">{errors.first_name}</div>
            )}
            <label htmlFor="last_name" style={{ display: "block" }}>
              Nazwisko:
            </label>
            <input
              id="last_name"
              placeholder="Enter your surname"
              type="text"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.last_name && touched.last_name
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.last_name && touched.last_name && (
              <div className="input-feedback">{errors.last_name}</div>
            )}
            <label htmlFor="city" style={{ display: "block" }}>
              Miejscowość:
            </label>
            <input
              id="city"
              placeholder="Enter your city"
              type="text"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.city && touched.city
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.city && touched.city && (
              <div className="input-feedback">{errors.city}</div>
            )}
            <label htmlFor="zip_code" style={{ display: "block" }}>
              Kod pocztowy:
            </label>
            <input
              id="zip_code"
              placeholder="Enter your zip code"
              type="text"
              value={values.zip_code}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.zip_code && touched.zip_code
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.zip_code && touched.zip_code && (
              <div className="input-feedback">{errors.zip_code}</div>
            )}
            <button type="submit" disabled={isSubmitting}>
              ZAMAWIAM I PŁACĘ
            </button>

          </form>
        );
      }}
      
    </Formik>
  
  </div>
)};

export default Form;
