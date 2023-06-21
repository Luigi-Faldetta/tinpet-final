import React, { useState } from "react";
import { useDropzone, DropzoneOptions, FileWithPath } from "react-dropzone";

const UploadPic: React.FC = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
    },
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  ));

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <aside>{thumbs}</aside>
    </section>
  );
};

export default UploadPic;
