import React, { ReactElement } from 'react';
import { CSSProperties } from "react";

export const TrackPlayerButton: React.FC<{
    icon: ReactElement;
    onClick?: () => void;
    ariaLabel?: string;
    ariaHidden?: boolean;
    style?: CSSProperties;
}> = React.memo(({ icon, onClick, style, ariaLabel, ariaHidden=false }) => {
    if(style && ariaHidden) return <div style={style}>{icon}</div>
    if(ariaHidden) return icon;

    return(
        <button 
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            onClick={onClick}
        >
            {icon}
        </button>
    )
});