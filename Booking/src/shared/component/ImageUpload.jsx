import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageUpload({ getAllFiles }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleOnChange(e) {
    const files = Array.from(e.target.files);
    const previewUrl = files.map((files) => URL.createObjectURL(files));
    setPreviewUrl(previewUrl);
    getAllFiles(files);
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <label htmlFor="images" className="mb-4">
        Pick Images
      </label>
      <input
        type="file"
        id="images"
        name="images"
        multiple
        accept=".jpg, .png, .jpeg, .JPG, .avif, .jfif"
        onChange={handleOnChange}
        className="mb-4" // Add margin bottom to the input
      />

      <div className="md:max-w-80 md:max-h-80">
        {previewUrl && previewUrl.length > 1 && previewUrl.length > 0 && (
          <Carousel
            showThumbs={false}
            showArrows={true}
            autoPlay={false}
            infiniteLoop={true}
            width="100%"
          >
            {previewUrl &&
              previewUrl.length > 1 &&
              previewUrl.map((url, index) => (
                <div
                  key={index}
                  className="carousel-item rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full  object-cover"
                  />
                </div>
              ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
