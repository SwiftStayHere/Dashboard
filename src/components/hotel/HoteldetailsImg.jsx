import { useState } from "react";
import { GrClose } from "react-icons/gr";

export default function HotelDetailsImg({ imgs }) {
  // const [imgs, setImgs] = useState([
  //   {
  //     src: "https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256_640.jpg",
  //   },
  //   {
  //     src: "https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_640.jpg",
  //   },
  //   {
  //     src: "https://cdn.pixabay.com/photo/2016/04/15/11/48/hotel-1330850_640.jpg",
  //   },
  // ]);
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="images">
      <div className="primary">
        {imgs && imgs[0] && <img className="" src={imgs[0].src} alt="" />}
      </div>
      <div className="secondary">
        {imgs && imgs[1] && <img src={imgs[1].src} alt="" />}
        {imgs && imgs[2] && <img src={imgs[2].src} alt="" />}
        {imgs.length > 3 && (
          <button onClick={() => setIsShow(true)}>
            {(imgs.length > 4 && (
              <span>Altre {imgs && imgs.length - 3} foto</span>
            )) || <span>1 altra foto</span>}
          </button>
        )}
      </div>
      <div className={`images-full ${(isShow && "show") || ""}`}>
        <div className="images-full-inner">
          {imgs && imgs.map((d, i) => <img src={d.src} key={i} alt="" />)}
        </div>
        <button onClick={() => setIsShow(false)}>
          <GrClose />
        </button>
      </div>
    </div>
  );
}
