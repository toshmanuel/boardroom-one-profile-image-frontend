import React, { useEffect, useState } from "react";
import { Layout, Container, BoxUpload, ImagePreview } from "./style";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";

function App() {
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

  

  const imageHandler = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    let response  = await fetch(`https://boardroom-one-image.herokuapp.com/profile-photo/add-image`,
    {
      method: "POST",
      body: formData,
      // headers:{
      //   "Accept": "multipart/form-data",
      // }
    })

    if (response.ok){
      await response.json()
      .then(result => {
        console.log(result)
        setImageUrl(result.secure_url)
      })
      .then(()=> setIsUploaded(true))
    }
  }
  

  return (
    <Layout>
      <Container>
        <h2>Upload your image</h2>
        <p>Upload with preview 😁</p>

        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png"
                  onChange={imageHandler}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImageUrl(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={imageUrl}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={imageUrl}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>

      </Container>
    </Layout>
  );

}
export default App;