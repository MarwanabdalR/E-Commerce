import { useBrands } from "../../func/context/BrandsContext";

export default function Brands() {
  const { brands } = useBrands();
  
  return (
    <div className="bg-gradient-to-br from-red-900 to-slate-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-2xl mx-auto">
      {brands.map((brands) => (
        <div
          key={brands._id}
          className="mx-12 my-10 transform duration-1000 overflow-hidden rounded-lg shadow-sm transition hover:shadow-rose-500 hover:bg-slate-600 hover:scale-105"
        >
          <img
            src={brands.image}
            alt={brands.name}
            className="object-cover w-full" 
          />
          <div className="bg-white p-4 text-center sm:text-sm md:text-2xl lg:text-3xl">
              <h3 className=" text-gray-900 font-bold">{brands.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}