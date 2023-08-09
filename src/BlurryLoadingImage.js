import React, {useEffect, useState} from 'react';

const BlurryLoadingImage = ({preview, image, alt, className, bgColor = 'transparent'}) => {
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
                width: '100%',
                background: bgColor,
            }}
            src={currentImage.toString()}
            alt={alt}
            className={className}
        />
    );
};

export default BlurryLoadingImage;
