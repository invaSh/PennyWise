import React from 'react';

function Card({ title, value, icon }) {
  return (
    <div className="w-80 rounded bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6 shadow-xl transform transition-all duration-300 hover:scale-105">
      <div className="flex justify-center items-center bg-black rounded-full w-16 h-16 mx-auto mb-4 shadow-md text-yellow-300">
        {icon}
      </div>
      <div className="text-center">
        <h4 className="text-3xl font-semibold text-black mb-2">{value}</h4>
        <span className="text-sm font-medium text-black">{title}</span>
      </div>
    </div>
  );
}

export default Card;


// import React from 'react';

// function Card({ title, value, icon }) {
//   return (
//     <div className="w-80 rounded bg-black p-6 shadow-xl transform transition-all duration-300 hover:scale-105">
//       <div className="flex justify-center items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full w-16 h-16 mx-auto mb-4 shadow-md text-black">
//         {icon}
//       </div>
//       <div className="text-center">
//         <h4 className="text-3xl font-semibold text-yellow-300 mb-2">{value}</h4>
//         <span className="text-sm font-medium text-yellow-300">{title}</span>
//       </div>
//     </div>
//   );
// }

// export default Card;
