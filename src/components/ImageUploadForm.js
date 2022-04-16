import React from "react";
import { useState, useRef } from "react";

const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
const loadImage = (files, inputFile, setImage) => {
  const file = files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    setImage(event.target.result);
  }
  reader.readAsDataURL(file);
};

export default function ImageUploadForm({imageSrc, alt, register}) {

  const [image, setImage] = useState(imageSrc);
  const inputFile = useRef(null);
  const {ref, onChange, ...aRegister} = register;

  return (
    <div style={{background:"red"}}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        if (acceptImageFiles.includes(event.dataTransfer.files[0].type)) {
          inputFile.current.files = event.dataTransfer.files;
          inputFile.current.dispatchEvent(new Event("change", { bubbles: true }));
        }
        event.preventDefault();
      }}
      onDragLeave={() => console.log("ドラッグリーブ")}
      onClick={(event) => {
        inputFile.current.click();
        event.stopPropagation();
      }}
    >
      <img src={image} />
      <input
        type="file"
        accept={acceptImageFiles}
        onChange={(event) => {
          if (event.target.files.length > 0) {
            onChange(event);
            loadImage(event.target.files, inputFile, setImage)
          }
        }}
        ref={(element) => {
          ref(element);
          inputFile.current = element;
        }}
        {...aRegister}
      />
    </div>
  );
}