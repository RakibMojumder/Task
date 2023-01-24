import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const { state } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`https://task-blue-six.vercel.app/user?email=${state?.email}`)
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [state.email]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-8 text-2xl md:text-4xl font-semibold">
        Welcome <span className="text-teal-500">{user?.name}</span>
      </h1>
      <div className="w-[270px] md:w-[450px] border flex flex-col md:flex-row">
        <div>
          <img
            className="w-full md:w-40 h-36"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMlcKS9YqYErvDmlIP2qf7xYN4FklWFgybw&usqp=CAU"
            alt=""
          />
        </div>
        <div className="p-3 md:p-0 md:pl-3 md:text-lg flex flex-col justify-center">
          <h1>Name: {user?.name}</h1>
          <p>User Name: {user?.userName}</p>
          <p>Email: {user?.email}</p>
          <p>Date of birth: {user?.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
