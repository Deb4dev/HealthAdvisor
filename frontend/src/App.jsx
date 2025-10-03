import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { OutputCard } from "./components/ResponseCard.jsx";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [response, setResponse] = useState(null);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/generate", data);
      console.log(res);
      setResponse(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "auto",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
        />
        {errors.age && <span>This field is required</span>}

        <input
          type="number"
          placeholder="Weight (kg)"
          {...register("weight", { required: true })}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          {...register("height", { required: true })}
        />
        {errors.height && <span>This field is required</span>}

        {errors.weight && <span>This field is required</span>}
        <input
          type="text"
          placeholder="gender"
          {...register("gender", { required: true })}
        />
        {errors.gender && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Goal (e.g. weight loss)"
          {...register("goal", { required: true })}
        />
        {errors.goal && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
      {response && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <OutputCard text={response?.result} />
        </div>
      )}
    </div>
  );
}

export default App;
