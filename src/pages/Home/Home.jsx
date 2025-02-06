import "../../css/style.css";
import homeIMG from "../../assets/undraw_mello_uiud.svg";
export default function Home() {
  return (
    <>
      <div className="bg-amber-800 py-24">
        <div className="flex items-center justify-center pt-18">
          <img
            className="w-60"
            src={homeIMG}
            alt="avatar"
          />
        </div>
        <h1 className="text-center text-5xl my-5 text-white font-bold">
          start Framework
        </h1>
        <div className="flex items-center justify-center my-2">
          <div className="line"></div>
          <div className="mb-2">
            <i className="fa-solid fa-star fa-xl text-white"></i>{" "}
          </div>
          <div className="line"></div>
        </div>
        <h1 className="text-center text-xl my-5 text-white font-thin">
          FrontEnd Developer - Web Designer - AI Trainer
        </h1>
      </div>
    </>
  );
}
