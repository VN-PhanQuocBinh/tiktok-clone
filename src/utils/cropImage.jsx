function cropImage({ imgSrc, crop, mimeType = "image/png" }) {
   return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgSrc;

      img.onerror = reject;
      img.onload = () => {
         const {
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            destinationWidth,
            destinationHeight,
         } = crop;

         const canvas = document.createElement("canvas");
         canvas.width = destinationWidth;
         canvas.height = destinationHeight;
         const ctx = canvas.getContext("2d");

         ctx.drawImage(
            img,
            cropX, cropY,
            cropWidth, cropHeight,
            0,0,
            destinationWidth,destinationWidth
         );

         canvas.toBlob((blob) => {
            if (blob) {
               resolve(blob);
            } else {
               reject(blob);
            }
         }, mimeType);
      };
   });
}

export { cropImage };
