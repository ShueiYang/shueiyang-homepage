// function to convert image file into base64String
export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

// function to resized Base64String
export async function resizeImage(
  base64String: string,
  maxWidth = 450,
  maxHeight = 450,
): Promise<string> {
  const resizeBase64 = await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
  return resizeBase64 as string;
}

// Image processing
export async function processImage(
  file: File,
  imgSizeLimit = 350,
): Promise<string> {
  const result = await convertToBase64(file);
  const oldSize = calcImageSize(result);

  if (oldSize > imgSizeLimit) {
    const resized = await resizeImage(result);
    const newSize = calcImageSize(resized);
    console.log("new_size=> ", newSize, "KB");
    console.log("old_size=> ", oldSize, "KB");
    return resized;
  } else {
    return result;
  }
}

// calulating the Image size in KB
function calcImageSize(base64Str: string) {
  let y = 1;
  if (base64Str.endsWith("==")) {
    y = 2;
  }
  const xSize = base64Str.length * (3 / 4) - y;
  return Math.round(xSize / 1024);
}
