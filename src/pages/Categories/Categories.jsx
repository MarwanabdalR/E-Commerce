import { useProduct } from "../../func/context/ProductContext";
export default function Categories() {
  const { Catgory } = useProduct();

  return (
    <div className="bg-gradient-to-br from-red-900 to-slate-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-screen-2xl mx-auto">
      {Catgory.map((category) => (
        <div
          key={category._id}
          className="mx-12 my-10 transform duration-1000 overflow-hidden rounded-lg shadow-sm transition hover:shadow-rose-500 hover:bg-slate-600 hover:scale-105"
        >
          <img
            src={category.image}
            alt={category.name}
            className="h-56 object-cover w-full sm:h-64 md:h-80 lg:h-96 " 
          />
          <div className="bg-white p-4 text-center sm:text-lg md:text-3xl lg:text-4xl">
              <h3 className=" text-gray-900 font-bold">{category.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}