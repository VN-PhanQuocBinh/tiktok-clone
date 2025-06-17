function cropImage({ imgSrc, crop, mimeType = "image/png" }) {
   return new Promise((resolve, reject) => {
      console.log(imgSrc, crop);
      const img = new Image();
      img.src = imgSrc;

      img.onerror = reject
      img.onload = () => {
         console.log(img, crop);
         const canvas = document.createElement("canvas");
         canvas.width = crop.canvasWidth;
         canvas.height = crop.canvasHeight;
         const ctx = canvas.getContext("2d");
         console.log(ctx);

         const { x, y, width, height } = crop;

         ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

         canvas.toBlob(blob => {
            if (blob) {
               resolve(blob)
            } else {
               reject(blob)
            }
         })
      };
   });
}

export { cropImage };
