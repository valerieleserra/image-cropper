import React, {useState, useCallback} from 'react'
import Cropper from 'react-easy-crop'
import { readFile, saveCroppedImage } from '../../utilities/images'

function Photos(){
    const [imageSrc, setImageSrc] = useState(null); //state variable called image src. empty bucket
    const [crop, setCrop] = useState({ x: 0, y:0 }); 
    const [zoom, setZoom] = useState(1);
    const [fileName, setFileName] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
        setCroppedAreaPixels(_croppedAreaPixels)
    }, [])

    const handleFileChange = async (e) => {
        if(e.target.files && e.target.files.length > 0 ) { //at least 1 file. if there is more than 1 grab first file index 0 and call it file
            const file = e.target.files[0]
            setFileName(file.path)
            const imageDataUrl = await readFile(file)
            //dont go on to line 14 until 13 is done/we have an image//async. stop here. set the data to URL and dont go on until we have an image
            setImageSrc(imageDataUrl)
        }
    }

const handleSave = ( ) => {
    //first - want to save the cropped image
    // second - we can reset our imageSrc to null // so we can open another image
    // new function that takes croppedAreaPixels fileName and imageSrc and return saving the file
    saveCroppedImage(fileName, imageSrc, croppedAreaPixels)
    setImageSrc(null)
    setZoom(1)
    setCrop({ x: 0, y: 0})
}


    if(!imageSrc) { //if a user has not imported an image
        return (
            <>
            <h1>Please choose a photo to crop</h1>
             <input type ='file' accept='image/*' onChange={handleFileChange} />
             </>
        )
    }
    return (
        <div className='crop-area'>
        <Cropper //need to create state variables that have a crp x and y
        crop={crop}
        zoom={zoom}
        aspect = {1 / 1} //change size of cropping
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete} //constantly updating cropped area
        image={imageSrc} //When we click button it runs above
        /> 
        <button className='save-btn' onClick={handleSave}>Save</button> 
        </div>
    );
};



export default Photos