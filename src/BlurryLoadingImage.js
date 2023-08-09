import React, {useEffect, useState} from 'react';

const BlurryLoadingImage = ({preview, image, className}) => {
    const [currentImage, setCurrentImage] = useState(preview);
    const [loading, setLoading] = useState(true);

    const fetchImage = (src) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {
            setCurrentImage(loadingImage.src);
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchImage(image);
    }, [image]);

    return (
        <img
            style={{
                filter: `${loading ? 'blur(20px)' : ''}`,
                transition: '1s filter linear',
            }}
            src={currentImage.toString()}
            alt=""
            className={className}
        />
    );
};

export default BlurryLoadingImage;
