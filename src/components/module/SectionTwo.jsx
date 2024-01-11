import { useState } from "react";
import Input from "../hotel-edit/Input";
import TextArea from "../hotel-edit/TextArea";

export default function SectionTwo({ data, setData }) {
  const [videoLink, setVideoLink] = useState("");
  const [videoLink1, setVideoLink1] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="module-edit-basic">
      <h4>Sezione Centrale</h4>
      <p>
        Questa è la sezione centrale, cioè la sezione dopo quella del video.
      </p>

      <div className="module-edit-basic-wrp">
        <div className="module-edit-basic-item">
          <label htmlFor="vidwoLink"> Link 1° Foto </label>
          <Input
            d={{ value: data?.section2Video1 || "", label: "Inserisci URL" }}
            i="vidwoLink"
            handler={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  section2Video1: e,
                };
              });
            }}
          />
        </div>
        <div className="module-edit-basic-item">
          <label htmlFor="vidwoLink1">Link 2° Foto</label>
          <Input
            d={{ value: data?.section2Video2 || "", label: "Inserisci URL" }}
            i="vidwoLink1"
            handler={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  section2Video2: e,
                };
              });
            }}
          />
        </div>
      </div>

      <div className="module-edit-basic-item">
        <label htmlFor="title1">Titolo della Sezione Centrale</label>
        <Input
          d={{ value: data?.section2Title || "", label: "Inserisci Titolo" }}
          i="title1"
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section2Title: e,
              };
            });
          }}
        />
      </div>
      <div className="module-edit-basic-item">
        <label htmlFor="">Testo della Sezione</label>
        <TextArea
          value={data?.section2Desctiption || ""}
          pls="Inserici il testo qui..."
          handler={(e) => {
            setData((prev) => {
              return {
                ...prev,
                section2Desctiption: e,
              };
            });
          }}
        />
      </div>
    </div>
  );
}
