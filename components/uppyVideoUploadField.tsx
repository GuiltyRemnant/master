import React, { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useTheme } from "next-themes";
import XHR from '@uppy/xhr-upload';

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

export const UploadField = ({userId}: any) => {

    /* const session = await getServerSession(authOptions);
    const userId = session?.user?.name; */
    const [thumbnailCounter, setThumbnailCounter] = useState(0);
    const [videoDuration, setVideoDuration] = useState('0:00');
    const [thumbnailsVisible, setThumbnailsVisible] = useState(false);
    const [thumbnailImages, setThumbnailImages] = useState<string[]>(new Array(8).fill(''));

const [thumbnail, setThumbnail] = useState();
    const strapiUrl: string | undefined = process.env.STRAPI_URL;
    const path = `${strapiUrl}/uploads/${userId}/`;

    /* let path = "'.JURI::root().'images/videoportal/user/'.$user->id.'/'.$directoryName.'/upload.php"; */

    // Don’t forget to keep the Uppy instance outside of your component.
    const uppy = new Uppy({
        restrictions: {
            maxFileSize: 530000000,
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ["video/mp4"]
        },
        onBeforeFileAdded: (currentFile, files) => {
            const modifiedFile = {
                ...currentFile,
                name: `BoozedBunny_${Date.now}.mp4`
            }
            return modifiedFile
        }
    })
    .use(XHR, { endpoint: path, timeout: 0, formData: true, fieldName: "files[]" })
    .on("file-added", (file: any) => {
        console.log(file);
        const {data, meta} = file;
        const fileURL = URL.createObjectURL(data);
        console.log(fileURL);
        const vid = document.createElement('video');
        console.log(vid);
        vid.src = fileURL;

        vid.ondurationchange = function() {
            var minutes = Math.floor(vid.duration % 60);
            var seconds = Math.floor(vid.duration % 60);
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            setVideoDuration(formattedDuration);

        };

      /*   const fileURL = URL.createObjectURL(file);
                console.log(fileURL);

        const vid = document.createElement('video');
        vid.src = fileURL;


        const minutes = Math.floor(vid.duration / 60);
            const seconds = Math.floor(vid.duration % 60);
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            console.log(formattedDuration);
            setVideoDuration(formattedDuration); */

        // GET DURATION OF THE VIDEO
        /* const vid = document.createElement('video');
        vid.src = fileURL;
    
        vid.onloadedmetadata = () => {
          const minutes = Math.floor(vid.duration / 60);
          const seconds = Math.floor(vid.duration % 60);
          const formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
          setVideoDuration(formattedDuration);
        }; */
        
    // Display Button
    /* setThumbnailImages(new Array(8).fill(''));
    setThumbnailsVisible(true); */

    // GENERATE THUMBNAILS
    /* const thumbnails = new VideoThumbnails({
      count: 8,
      maxWidth: 360,
      maxHeight: 202,
    }); */

    /* thumbnails.on('capture', (image: string) => {
        setThumbnailCounter((prevCounter) => prevCounter + 1);
  
        if (thumbnailCounter === 0) {
          const newThumbnailImages = [...thumbnailImages];
          newThumbnailImages[0] = image;
          setThumbnailImages(newThumbnailImages);
        } else {
          const newThumbnailImages = [...thumbnailImages];
          newThumbnailImages[thumbnailCounter] = image;
          setThumbnailImages(newThumbnailImages);
        }
      });
  
      thumbnails.capture(file); */

    });



    const { theme } = useTheme();

    return <>
    {videoDuration}
        <Dashboard
        className="border-none"
        height={'200px'}
        theme={theme === 'dark' ? 'dark' : 'light'}
        uppy={uppy} />
    </>;
}