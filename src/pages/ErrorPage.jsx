import errorIMG from "../assets/undraw_page-not-found_6wni.svg";
export default function ErrorPage() {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <img
            src={errorIMG}
            className="mx-auto h-56 w-auto text-black sm:h-64"
            alt="error"
          />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
        </div>
      </div>
    </>
  );
}
