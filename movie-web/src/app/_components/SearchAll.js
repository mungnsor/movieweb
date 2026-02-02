// "use client";
// export const Search = (props) => {
//   const { name } = props;
//   return (
//     <div className="bg-white w-[577px] h-[15px] p-4">
//       <p className="flex justify-end text-black font-medium text-sm ">
//         See all results for "{name}"
//       </p>
//     </div>
//   );
// };
"use client";

export const Search = (props) => {
  const { name } = props;
  return (
    <div className="bg-white w-[577px] h-[15px] p-4">
      <p className="flex justify-end text-black font-medium text-sm">
        See all results for &quot;{name}&quot;
      </p>
    </div>
  );
};
