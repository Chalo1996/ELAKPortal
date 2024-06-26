import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Policy = () => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/policies/${policyId}`)
      .then((response) => response.json())
      .then((data) => setPolicy(data))
      .catch((error) => console.error("Error fetching policy details:", error));
  }, [policyId]);

  const handleCancelPolicy = (policyId) => {
    fetch(`http://localhost:3001/api/policies/${policyId}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/home/policies");
      })
      .catch((error) => console.error("Error canceling policy:", error));
  };

  if (!policy) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold'>{policy.name}</h2>
      <p className='text-gray-700'>{policy.description}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
        ratione reiciendis velit reprehenderit dignissimos esse explicabo
        tempore quasi illo veniam sit! Minus cupiditate quibusdam ratione ullam
        nemo dolores debitis ad.
      </p>
      <p className='mt-4'>More policy details...</p>
      <button
        className='mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'
        onClick={handleCancelPolicy}
      >
        Back to policies
      </button>
    </div>
  );
};

export default Policy;
