import React from "react";
import Button from "./Button";
import { LiaDumbbellSolid } from "react-icons/lia";

const pricingPlans = [
  {
    heading: "Browns",
    icon: <LiaDumbbellSolid />,
    title: "Personal Trainer",
    features: [
      "Personal Trainer",
      "Service Locker Room",
      "Fitness Assessment",
      "Morning Slot",
      "Yoga Classes",
      "Health Checkup",
    ],
    price: "$25.99",
  },
  {
    heading: "Silver",
    icon: <LiaDumbbellSolid />,
    title: "Standard Plan",
    features: [
      "Personal Trainer",
      "Service Locker Room",
      "Fitness Assessment",
      "Afternoon Slot",
      "Group Classes",
      "Monthly Checkup",
    ],
    price: "$99.99",
  },
  {
    heading: "Gold",
    icon: <LiaDumbbellSolid />,
    title: "Premium Plan",
    features: [
      "Personal Trainer",
      "Private Locker",
      "Full Assessment",
      "All-Day Access",
      "1-on-1 Yoga",
      "Weekly Checkup",
    ],
    price: "$149.99",
  },
];

const Price = () => {
  return (
    <div>
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col items-center my-14">
        <h1 className="text-[2.7em] font-extrabold mb-2">Pricing Table</h1>
        <img src="circle-line.webp" alt="" className="mb-12" />
        <div className="flex md:flex-row flex-col w-full gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="md:w-[32%] w-full h-[90vh] md:h-[90vh] bg-no-repeat bg-cover relative shadow-2xl rounded-2xl flex items-center justify-center"
              style={{ backgroundImage: "url('price-bg.webp')" }}
            >
              <div >
                <h1 className="text-white text-3xl font-extrabold absolute top-16 md:top-8 left-[40%] md:left-[38%]">
                  {plan.heading}
                </h1>
                <p className="bg-[#A896FF] md:left-[38%] left-[38%] flex justify-center items-center text-gray-200 absolute top-28 md:top-20 text-6xl h-[90px] w-[90px] rounded-full ">
                  {plan.icon}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center absolute w-full top-[40%] md:top-[42%] text-[16px]">
                {plan.features.map((feature, i) => (
                  <h1 key={i} className="my-2">
                    {feature}
                  </h1>
                ))}
                <p className="my-3 flex items-center gap-2 text-gray-500 text-sm">
                  <span className="text-accent text-3xl font-extrabold">
                    {plan.price}
                  </span>{" "}
                  / Month
                </p>
                <Button name="Choose Plan" px="px-7" py="py-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
