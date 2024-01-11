import Cookies from "js-cookie";
import { FileUploader } from "react-drag-drop-files";
import { AiFillDelete } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function DrapDropBody({ urlSet, url }) {
  const token = Cookies.get("login") && JSON.parse(Cookies.get("login")).token;
  const fileTypes = ["JPG", "PNG", "GIF"];
  // const [url, setUrl] = useState("");
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    if (file && token) {
      formData.append("image", file);
      console.log(file, typeof file);
      const hotelImageRef = ref(storage, `hotel-images/${uuidv4()}`);
      // const snapshot = await uploadBytes(hotelImageRef, file)
      // console.log(snapshot.metadata)
      const uploadTask = uploadBytesResumable(hotelImageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe the upload progress if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Download Url: ", downloadURL);
            urlSet(downloadURL);
          });
        }
      );
      // uploadBytes(hotelImageRef, file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
      // axios
      //   .post(`${values.url}/image`, formData, {
      //     headers: {
      //       token,
      //     },
      //   })
      //   .then((d) => {
      //     urlSet(d.data.url);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    } else {
      urlSet(null);
    }
  };

  return (
    <div className="drag-drop-body">
      {url && (
        <button onClick={() => urlSet("")} className="close">
          <AiFillDelete />
        </button>
      )}
      {(url && <img src={url} alt="" />) || (
        <>
          <div className="icon">
            <BsUpload />
          </div>
          <span>
            Drag or <label htmlFor="img">Click to import the file</label>
          </span>

          <p>
          Make sure you don't upload too heavy images, recommended in
            WebP
          </p>
        </>
      )}
      <FileUploader
        handleChange={fileHandler}
        name="file"
        className="upload"
        types={fileTypes}
      />
      <input
        onChange={(e) => fileHandler(e)}
        type="file"
        accept="image/*"
        id="img"
      />
    </div>
  );
}
