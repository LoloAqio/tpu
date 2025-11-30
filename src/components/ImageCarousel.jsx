import React, { useState } from "react";

const ImageCarousel = ({ images, className = "", aspectRatio = "aspect-[4/5]" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imagesArray = Array.isArray(images) ? images : (images ? [images] : []);

  if (imagesArray.length === 0) {
    return (
      <div className={`${aspectRatio} bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 dark:text-gray-500">Нет изображения</span>
      </div>
    );
  }

  const hasMultipleImages = imagesArray.length > 1;

  const nextImage = (e) => {
    e?.stopPropagation();
    if (isAnimating || !hasMultipleImages) return;
    
    setIsAnimating(true);
    setCurrentImageIndex((next) => 
      next === imagesArray.length - 1 ? 0 : next + 1
    );
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (isAnimating || !hasMultipleImages) return;
    
    setIsAnimating(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? imagesArray.length - 1 : prev - 1
    );
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToImage = (index, e) => {
    e?.stopPropagation();
    if (isAnimating || index === currentImageIndex) return;
    
    setIsAnimating(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`${aspectRatio} relative`}>
        <div className="absolute inset-0 overflow-hidden">
          {imagesArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Изображение ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 ${
                index === currentImageIndex
                  ? 'opacity-100 translate-x-0' //текущая видимая картинка
                  : index < currentImageIndex
                  ? 'opacity-0 -translate-x-full' //картника скрыта, свдинута влево на 100%
                  : 'opacity-0 translate-x-full' //картника скрыта, свдинута вправо на 100%
              }`}
            />
          ))}
        </div>

        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {imagesArray.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white dark:bg-gray-300 shadow-md scale-125' 
                    : 'bg-white/60 dark:bg-gray-300/60 hover:bg-white/80 dark:hover:bg-gray-300/80'
                }`}
                aria-label={`Показать изображение ${index + 1}`}
              />
            ))}
          </div>
        )}

        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              disabled={isAnimating}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 z-10 text-gray-800 dark:text-gray-200"
              aria-label="Предыдущее изображение"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              disabled={isAnimating}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 z-10 text-gray-800 dark:text-gray-200"
              aria-label="Следующее изображение"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;