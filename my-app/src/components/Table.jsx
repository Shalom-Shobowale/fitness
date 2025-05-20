import React from "react";

const tableData = [
  {
    id: 1,
    img: "cl-icon1.png",
    title: "Cardio",
    name: "Rachel Adam",
    time: "06AM-08AM",
  },
  {
    id: 2,
    img: "cl-icon2.png",
    title: "Weight Loose",
    name: "John Doe",
    time: "08AM-10AM",
  },
  {
    id: 3,
    img: "cl-icon3.png",
    title: "Yoga",
    name: "Jane Smith",
    time: "10AM-12PM",
  },
  {
    id: 4,
    img: "cl-icon4.png",
    title: "Crossfit",
    name: "Emily Johnson",
    time: "12PM-02PM",
  },
  {
    id: 5,
    img: "cl-icon5.png",
    title: "Boxing",
    name: "Michael Brown",
    time: "02PM-04PM",
  },
  {
    id: 6,
    img: "cl-icon6.png",
    title: "Karate",
    name: "Sarah Davis",
    time: "04PM-06PM",
  },
  {
    id: 7,
    img: "cl-icon7.png",
    title: "Boday Building",
    name: "David Wilson",
    time: "06PM-08PM",
  },
  {
    id: 8,
    img: "cl-icon8.png",
    title: "Aerobics & Skipping",
    name: "Laura Martinez",
    time: "08PM-10PM",
  },
];

const Table = () => {
  return (
    <div>
      <table className="table-auto mx-auto mt-10">
        <tbody >
          <tr className="grid md:grid-cols-4">
            {tableData.map((item) => (
              <td key={item.id} className={` md:border-r flex flex-col items-center w-72 py-6 ${item.id == 1 || item.id == 2 || item.id == 3 || item.id == 4 ? 'border-b md:border-b' : 'md:border-b-0 border-b' } ${item.id == 4 || item.id == 8 ? 'border-r-white' : ''} `}>
                <img
                  src={item.img}
                  alt=""
                  className="bg-purple-100 p-3 rounded-md"
                />
                <h3 className="font-bold text-xl text-gray-700 mt-3 ">{item.title}</h3>
                <p className="text-sm my-2">{item.name}</p>
                <div className="mt-1 bg-orange-100 w-24 text-center py-1 text-sm text-accent rounded-md">
                  {item.time}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
