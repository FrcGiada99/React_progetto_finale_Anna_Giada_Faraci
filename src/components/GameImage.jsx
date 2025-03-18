/* eslint-disable react/prop-types */
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function GameImage({ image, alt, className, style }) {
    return (
        <LazyLoadImage
            src={image}
            alt={alt}
            className={className}
            style={style}
            effect="blur"
            wrapperProps={{
                style: { transitionDelay: '1s' },
            }}
        />
    );
}
