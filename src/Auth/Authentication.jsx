import React, { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTandC: false,
  });
  const navigate = useNavigate();
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleTabChange = (index) => setStep(index);

  const handleSave = (data) => setUserData({ ...userData, ...data });

  const handleSubmit = async () => {
    const { acceptTandC, ...otherData } = userData;
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otherData),
      });
      const result = await response.json();
      if (result.message) {
        navigate("/posts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-auto w-96">
      <div className="flex justify-between p-4">
        <div
          className="shadow-lg cursor-pointer rounded-xl p-4 hover:bg-orange-200"
          onClick={() => handleTabChange(0)}
        >
          Form 1
        </div>
        <div
          className="shadow-lg cursor-pointer rounded-xl p-4 hover:bg-orange-200"
          onClick={() => handleTabChange(1)}
        >
          Form 2
        </div>
        <div
          className="shadow-lg cursor-pointer rounded-xl p-4 hover:bg-orange-200"
          onClick={() => handleTabChange(2)}
        >
          Form 3
        </div>
      </div>
      <div className="form-container shadow-lg p-5 rounded-2xl">
        {step === 0 && <Form1 nextStep={nextStep} saveData={handleSave} values={userData} />}
        {step === 1 && (
          <Form2 nextStep={nextStep} prevStep={prevStep} saveData={handleSave} values={userData} />
        )}
        {step === 2 && (
          <Form3
            prevStep={prevStep}
            saveData={handleSave}
            handleSubmit={handleSubmit}
            values={userData}
          />
        )}
      </div>
    </div>
  );
};

export default Authentication;
