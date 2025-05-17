import React from "react";
import "animate.css";
const cards = [
  { id: 1, image: "s-icon1.png", title: "Yoga" },
  { id: 2, image: "s-icon2.png", title: "Dance" },
  { id: 3, image: "s-icon3.png", title: "Fitness" },
  { id: 4, image: "s-icon4.png", title: "Health" },
  // { id: 5, image: "s-icon5.png", title: "Lifestyle" },
  // { id: 6, image: "s-icon6.png", title: "Health" },
];

const Build = () => {
  return (
    <div className="mt-14 w-[90%] md:w-[80%] mx-auto flex md:flex-row flex-col items-center gap-5">
      <div className="md:w-[50%]">
        <h1 className="text-4xl font-extrabold leading-tight mb-3">
          Build Your Body Transform
          <br className="hidden lg:block" />
          Your Life
        </h1>
        <img src="circle-line.png" alt="" className="mb-6 md:mb-12" />
        <p className="text-[14px] text-slate-500 text-pretty leading-[27px]">
          Integer auctor est nec semper hendrerit. Etiam sollicitudin enim in
          urna commodo, in dapibus velit elementum. Ut congue nisl sapien, vel
          ultricies nulla tincidunt vitae. Maecenas non ligula quis massa
          consequat commodo eleifend ut velit.
        </p>
        <p className="my-4 text-[14px] text-slate-500 text-pretty leading-[27px]">
          Aenean eleifend est eget eros molestie pretium. Curabitur varius velit
          in est elementum consectetur. Mauris in risus bibendum, laoreet ex at,
          lobortis risus. Nullam id massa eget ante finibus iaculis. Duis eget
          nisl ipsum. Vivamus ipsum urna, tristique vel arcu nec, elementum
          congue est. Nullam vitae aliquet turpis.
        </p>
      </div>
      <div className="md:w-[50%] grid md:grid-cols-2 gap-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`bg-white h-72 shadow-xl px-6 rounded-2xl flex  items-center flex-col  ${
              card.id === 2 ? "mt-8" : ""
            } ${card.id === 3 ? "relative -top-7" : ""}`}
          >
            <div
              className={`group h-24 w-20 bg-accent rounded-b-full flex justify-center items-center ${
                card.id === card.id ? "hover:bg-secondary" : "bg-accent"
              }`}
            >
              <img
                src={card.image}
                alt=""
                className={`transition-all ${
                  card.id === card.id ? "group-hover:animate-bounce" : ""
                }`}
              />
            </div>

            <h1 className="font-bold text-2xl mt-7 mb-2">{card.title}</h1>
            <p className="text-center text-[14px] md:text-[13px] leading-[26px] text-slate-500 text-pretty">
              Nam pellentesque, velit at sodales elementum, neque metus
              ultricies justo, eget varius diam justo ac ante.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Build;
