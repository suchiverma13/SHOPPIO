// // CategoryFilter.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { label: "Topwear", icon: "/icons/topwear.png", path: "/category/topwear" },
//   { label: "Bottomwear", icon: "/icons/bottomwear.png", path: "/category/bottomwear" },
//   { label: "Footwear", icon: "/icons/footwear.png", path: "/category/footwear" },
//   { label: "Accessories", icon: "/icons/accessories.png", path: "/category/accessories" },
//   // add more categories as needed
// ];

// const CategoryFilter = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="category-bar">
//       {categories.map((cat, i) => (
//         <div
//           key={i}
//           className="category-item"
//           onClick={() => navigate(cat.path)}
//         >
//           <img src={cat.icon} alt={cat.label} />
//           <p>{cat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryFilter;
