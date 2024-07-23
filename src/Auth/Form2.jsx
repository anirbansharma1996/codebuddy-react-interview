import React, { useState } from "react";

const Form2 = ({ nextStep, prevStep, saveData, values }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    let nameRegex = /^[A-Za-z]+$/;

    if (
      !nameRegex.test(values.firstName) ||
      values.firstName.length < 2 ||
      values.firstName.length > 50
    ) {
      formErrors.firstName =
        "First name must contain only alphabets and be between 2 and 50 characters";
    }
    if (values.lastName && !nameRegex.test(values.lastName)) {
      formErrors.lastName = "Last name must contain only alphabets";
    }
    if (values.address.length < 10) {
      formErrors.address = "Address must be at least 10 characters long";
    }
    return formErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      saveData(values);
      nextStep();
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (input) => (e) => {
    saveData({ ...values, [input]: e.target.value });
  };

  return (
    <form className="m-auto w-10/12 text-center">
      <h2>Form 2</h2>
      <div>
        <label>First Name</label>

        <input
          type="text"
          onChange={handleChange("firstName")}
          value={values.firstName}
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          onChange={handleChange("lastName")}
          value={values.lastName}
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          onChange={handleChange("address")}
          value={values.address}
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>
      <div>
        <button   className="mt-3 mx-3 rounded-lg bg-red-500 p-2 hover:bg-red-600  hover:text-white" type="button" onClick={prevStep}>
          Back
        </button>
      
        <button
          className="mt-3 rounded-lg bg-sky-500 p-2 hover:bg-sky-600 hover:text-white"
          type="button"
          onClick={handleNext}
        >
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default Form2;
