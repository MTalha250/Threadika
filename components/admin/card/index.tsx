import React from "react";

interface Props {
  name: string;
  value: string | number;
}

const Card = ({ name, value }: Props) => {
  return (
    <div className="w-[320px] border-secondary overflow-hidden shadow-lg border rounded-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white m-3">
      <div className="p-4 bg-primary rounded-t-2xl">
        <h1 className="font-semibold text-xl text-white">{name}:</h1>
      </div>
      <div className="p-4 bg-white rounded-b-2xl">
        <p className="text-gray-800 text-xl font-semibold leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Card;
