import React from 'react';
import Image from "next/image";
import { CSSProperties } from "react";

const IMAGE_SIZE = 20;
export const TrackPlayerButton: React.FC<{
    icon: string;
    onClick?: () => void;
    ariaLabel?: string;
    ariaHidden?: boolean;
    style?: CSSProperties;
}> = React.memo(({ icon, onClick, style, ariaLabel, ariaHidden=false }) => {
    const image = (
        <Image 
            src={`/icons/${icon}.svg`}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            alt={ariaLabel || ''}
            aria-hidden={ariaHidden}
            style={style}
        />
    )
    if(ariaHidden) return image;

    return(
        <button 
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            onClick={onClick}
        >
            {image}
        </button>
    )
});