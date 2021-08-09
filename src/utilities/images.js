const fs = require('fs') //fs stands for file system. in node we can access users file system

export function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load',() => resolve(reader.result), false) //before reading the file. once loading resolve promise
        reader.readAsDataURL(file) //reading the file. read in a file and and pass as a url. First of many utilities 
    })
}

//no need to export default in helper/utility files

const createImage = url => {
   return new Promise((resolve, reject) => {
        const image = new Image() //creates new image 
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', () => reject(error))
        image.setAttribute('crossOrigin','anonymous')
        image.src = url
   })
}

//sends back image element
export async function saveCroppedImage(fileName, imageSrc, croppedAreaPixels) { //this function is going to use another function
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') //graphic related. canvas lets you draw, manipulate, rotate 
  const maxSize = Math.max(image.width, image.height)
  canvas.width = maxSize
  canvas.height = maxSize
  ctx.drawImage(image, maxSize /2 - image.width /2, maxSize /2 - image.height /2)
  const data = ctx.getImageData(0, 0, maxSize, maxSize)
  //set canvas to the desired size
  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height
  //drop our image data in with the correct offsets for x and y to crop
  ctx.putImageData(data, 
    Math.round(0 - maxSize /2 + image.width /2 - croppedAreaPixels.x),
    Math.round(0 - maxSize /2 + image.width /2 - croppedAreaPixels.y))
    );
   const url = canvas.toDataURL('image/jpg', 0.8);
   const base64data = url.replace(/^data:image\/png;base64,/,'');  //converts to base64 image with new information about image in string
   const newFileName = fileName + '-cropped.png'
   fs.writeFile(newFileName, base64data, 'base64', err => {
       if(err) {
           console.error(err)
       }
   })
}

