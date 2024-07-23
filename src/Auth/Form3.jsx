import React, { useState } from 'react';

const Form3 = ({ handleSubmit, prevStep, saveData, values }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    let phoneRegex = /^\d{10}$/;

    if (!['+91', '+1'].includes(values.countryCode)) {
      formErrors.countryCode = 'Country code must be either +91 or +1';
    }
    if (!phoneRegex.test(values.phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!values.acceptTermsAndCondition) {
      formErrors.acceptTermsAndCondition = 'You must accept terms and conditions';
    }
    return formErrors;
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (input) => (e) => {
    saveData({ ...values, [input]: e.target.value });
  };

  const handleCheckboxChange = () => {
    saveData({ ...values, acceptTermsAndCondition: !values.acceptTermsAndCondition });
  };

  return (
    <form className="m-auto w-10/12 text-center">
      <h2>Form 3</h2>
      <div>
        <label>Country Code</label>
          
        <select className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"  onChange={handleChange('countryCode')} value={values.countryCode}>
          <option value=""  disabled>Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="text-red-500">{errors.countryCode}</p>}
      </div>
      <div>
        <label>Phone Number</label>
        <input
        className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          type="text"
          onChange={handleChange('phoneNumber')}
          value={values.phoneNumber}
        />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div className='mt-3'>
        <label>
          <input
            className='mx-2'
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={values.acceptTermsAndCondition}
          />
          Accept Terms and Conditions
        </label>
        {errors.acceptTermsAndCondition && <p className="text-red-500">{errors.acceptTermsAndCondition}</p>}
      </div>
      <div>
        <button className="mt-3 mx-3 rounded-lg bg-red-500 p-2 hover:bg-red-600  hover:text-white" type="button" onClick={prevStep}>
          Back
        </button>
        <button className="mt-3 rounded-lg bg-sky-500 p-2 hover:bg-sky-600 hover:text-white" type="button" onClick={handleFinalSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

export default Form3;
