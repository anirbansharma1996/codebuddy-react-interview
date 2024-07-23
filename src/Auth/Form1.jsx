import React, { useState } from "react";

const Form1 = ({ nextStep, saveData, values }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(values.emailId)) {
      formErrors.emailId = "Invalid email address";
    }
    if (!passwordRegex.test(values.password)) {
      formErrors.password =
        "Password must contain at least 2 uppercase, 2 lowercase, 2 digits, and 2 special characters";
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
      <h2>Form 1</h2>
      <div>
        <label>Email</label>
        <input
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          type="email"
          onChange={handleChange("emailId")}
          value={values.emailId}
        />
        {errors.emailId && <p className="text-red-500">{errors.emailId}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          type="password"
          onChange={handleChange("password")}
          value={values.password}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <button
          type="button"
          className="mt-3 rounded-lg bg-sky-500 p-2 hover:bg-sky-600 hover:text-white"
          onClick={handleNext}
        >
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default Form1;
