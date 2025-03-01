import { useState } from "react";

const App = () => {
  const [multipleImages, setMultipleImages] = useState([]);
  const [dogImage, setDogImage] = useState(null);
  const [dogFile, setDogFile] = useState(null);
  const [message, setMessage] = useState("");

  const fetchMultipleImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const imageUrls = await response.json();
      setMultipleImages(imageUrls);
    } catch (error) {
      console.error("Error fetching multiple images:", error);
    }
  };


  const fetchDogImage = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/dog");
      const data = await response.json();
      setDogImage(data.imageUrl);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  const handleDogFileChange = (e) => {
    if (e.target.files.length > 0) {
      setDogFile(e.target.files[0]);
    }
  };


  const uploadDogImage = async () => {
    if (!dogFile) {
      setMessage("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", dogFile);

    try {
      const response = await fetch("http://localhost:8000/save/dog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("Dog image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading dog image:", error);
    }
  };

  return (
    <div>
      <p>{message}</p>

      <h2>Fetch Multiple Random Images</h2>
      <button onClick={fetchMultipleImages}>Fetch Images</button>
      <div>
        {multipleImages.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:8000${image}`}
            alt={`Random ${index}`}
            style={{ width: "150px", margin: "5px" }}
          />
        ))}
      </div>

      <h2>Fetch Random Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {dogImage && <img src={dogImage} alt="Dog" style={{ width: "200px" }} />}

      <h2>Upload Dog Image</h2>
      <input type="file" onChange={handleDogFileChange} />
      <button onClick={uploadDogImage}>Upload Dog Image</button>
    </div>
  );
};

export default App;
