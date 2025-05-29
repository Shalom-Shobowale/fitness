import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonyData = [
  {
    img: "testimonial-img.webp",
    name: "Jone Dose",
    title: "CEO & Founder",
    testimony:
      "Integer auctor est nec semper hendrerit. Etiam sollicitudin enim in urna commodo, in dapibus velit elementum.",
  },
  {
    img: "testimonial-img.webp",
    name: "Jane Smith",
    title: "Manager",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
  },
  {
    img: "testimonial-img.webp",
    name: "John Doe",
    title: "Trainer",
    testimony:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    img: "testimonial-img.webp",
    name: "Emily Johnson",
    title: "Member",
    testimony:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
  {
    img: "testimonial-img.webp",
    name: "Michael Brown",
    title: "Member",
    testimony:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
  },
  {
    img: "testimonial-img.webp",
    name: "Sarah Davis",
    title: "Member",
    testimony:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime.",
  },
  {
    img: "testimonial-img.webp",
    name: "David Wilson",
    title: "Member",
    testimony:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    img: "testimonial-img.webp",
    name: "Laura Martinez",
    title: "Member",
    testimony:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    img: "testimonial-img.webp",
    name: "Rachel Adam",
    title: "Member",
    testimony:
      "Integer auctor est nec semper hendrerit. Etiam sollicitudin enim in urna commodo, in dapibus velit elementum.",
  },
];
const Testimony = () => {
  const settings = {
    dots: true,
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-500 opacity-50 hover:opacity-100 mt-5" />
    ),
    appendDots: (dots) => <ul className="flex justify-center">{dots}</ul>,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-[70vh] flex flex-col justify-center items-center bg-[#FBFAFF]">
        <h1 className="text-[2.6em] w-[80%] font-bold text-center">What Our Client Say's</h1>
        <img src="circle-line.webp" alt="" className="mb-14"/>
      <div className="w-[85%] md:w-[80%] mx-auto">
        <Slider {...settings} className="">
          {testimonyData.map((item, index) => (
            <div key={index} className="px-4">
              <div className="flex relative shadow-2xl h-52">
                <div className="w-[20%] bg-secondary rounded-s-xl"></div>
                <img
                  src={item.img}
                  alt={`${item.name}'s avatar`}
                  className="h-[80px] w-[80px] border-white left-8 rounded-full absolute top-16"
                />
                <div className="w-[80%] pl-12 py-8 pr-4 bg-white rounded-e-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[18px] font-bold">{item.name}</h2>
                      <p className="text-xs text-accent mt-1 mb-3">
                        {item.title}
                      </p>
                    </div>
                    <img src="qutation.webp" alt="quote icon" />
                  </div>
                  <p className="text-sm text-gray-600">{item.testimony}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimony;
