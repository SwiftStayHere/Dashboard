import axios from "axios";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import values from "../../../values";
import DrapDrop from "./DragDrop"; // Import the DrapDrop component

const DetailsImgs = ({ data, setData }) => {
  const [imgs, setImgs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        images: imgs,
      };
    });
  }, [imgs]);

  useEffect(() => {
    axios
      .get(`${values.url}/hotel/single/${id}`)
      .then((d) => setImgs(d.data.images))
      .catch((e) => console.log(e));
  }, []);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImgs = [...imgs];
    const [movedImage] = updatedImgs.splice(fromIndex, 1);
    updatedImgs.splice(toIndex, 0, movedImage);
    setImgs(updatedImgs);
  };

  const [isDrag, setIsDrag] = useState(false);

  const handleRemoveItem = (index) => {
    const updatedImgs = imgs.filter((item, idx) => idx !== index);
    setImgs(updatedImgs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="images-wrp">
        {data?.images &&
          data?.images.map((img, index) => (
            <DraggableImage
              key={img.id}
              index={index}
              img={img}
              moveImage={moveImage}
              handleRemoveItem={() => handleRemoveItem(index)}
            />
          ))}

        <button onClick={() => setIsDrag(true)}>
          <AiOutlinePlus />
          Add Image
        </button>

        <DrapDrop handler={setIsDrag} isDrag={isDrag} addHandler={setImgs} />
      </div>
    </DndProvider>
  );
};

const DraggableImage = ({ img, index, moveImage, handleRemoveItem }) => {
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} className="images-item">
      <img src={img.src} alt="" />
      <button onClick={handleRemoveItem}>
        <GrFormClose />
      </button>
    </div>
  );
};

export default DetailsImgs;
