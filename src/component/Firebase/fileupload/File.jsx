import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { db } from "../../../config/firebase-config";

const FileUpload = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      })
      .catch((error) => {
        console.error('Error uploading file', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
