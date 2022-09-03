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
    return(
        <button 
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            onClick={onClick}
            style={{...{
                pointerEvents: ariaHidden ? 'none' : 'all'
            }, ...style}}
        >
            <Image 
                src={`/icons/${icon}.svg`}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                alt={ariaLabel || ''}
            />
        </button>
    )
});