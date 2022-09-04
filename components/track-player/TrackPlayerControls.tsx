import styles from './TrackPlayer.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from "next/image"
import { TrackPlayerButton } from './TrackPlayerButton';
import { useToast } from '../../contexts/toast/ToastProvider';
import { ShuffleIcon } from '../../assets/icons/ShuffleIcon';
import { ReverseIcon } from '../../assets/icons/ReverseIcon';
import { PauseIcon } from '../../assets/icons/PauseIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { RepeatIcon } from '../../assets/icons/RepeatIcon';

const DURATION = 30 * 1000;
export const TrackPlayerControls: React.FC<{
    previewURL: string;
}> = ({ previewURL }) => {
    const { setToast } = useToast();
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [errored, setErrored] = useState(false);
    const audio = useRef<HTMLAudioElement | null>(null);
    const container = useRef<HTMLDivElement>(null);
    const mouseDown = useRef(false);

    const play = useCallback(() => {
        if(!audio.current) {
            audio.current = new Audio(previewURL);
        }

        if(!playing) {
            audio.current.play()
                .then(() => {
                    setPlaying(true);
                })
                .catch(error => {
                    setToast({
                        content: 'Unable to play song preview.',
                        type: 'error'
                    })
                    setErrored(true);
                })
        } else {
            audio.current.pause();
            setPlaying(false);
        }
    }, [audio.current, playing]);

    useEffect(() => {
        if(!audio.current) return;

        const onEnd = () => {
            setPlaying(false);
            setCurrent(0);
        }

        audio.current.addEventListener('ended', onEnd);
        return () => {
            if(!audio.current) return;
            audio.current.removeEventListener('ended', onEnd);
            audio.current.pause();
        }
    }, [audio.current]);

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if(playing) {
            interval = setInterval(() => {
                setCurrent(current => current + 1000);
            }, 1000);
        } else {
            if(!interval) return;
            clearInterval(interval);
            interval = null;
        }

        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    }, [playing]);

    const changeCurrentTime = useMemo(() => (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!container.current) return;
        const { left: elementLeft, width } = container.current.getBoundingClientRect();
        const left = e.pageX - elementLeft;
        let percentage = left / width;
        if(percentage > 1) percentage = 1;
        if(percentage < 0) percentage = 0;
        const currentTime = Math.floor(percentage * DURATION);
        setCurrent(currentTime);

        if(!audio.current) return;
        audio.current.currentTime = currentTime / 1000;
    }, []);
    const handleMouseMove = useMemo(() => (e: MouseEvent) => {
        changeCurrentTime(e);
    }, [setCurrent, audio]);
    const handleMouseUp = useMemo(() => () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, []);
    const handleMouseDown = useMemo(() => () => {
        mouseDown.current = true;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const currentSeconds = Math.floor(current / 1000);
    const currentTime = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    const percentage = (current / DURATION) * 100;
    return(
        <>
            <div className={styles['progress']}>
                <div 
                    className={styles['progress-bar']}
                    onMouseDown={handleMouseDown}
                    onClick={changeCurrentTime}
                    ref={container}
                >
                    <div className={styles['bar']} />
                    <div 
                        className={styles['bar'] + ' ' + styles['filled']}
                        style={{width: `${percentage}%`}}
                    />
                    <div 
                        style={{left: `${percentage - 2}%`}}
                        className={styles['dot']}
                    />
                </div>
                <div className={styles['progress-time']}>
                    <span>
                        0:{currentTime}
                    </span>
                    <span>
                        0:{Math.floor(DURATION / 1000)}
                    </span>
                </div>
            </div>
            <div className={styles['control-buttons']}>
                <TrackPlayerButton 
                    icon={<ShuffleIcon />}
                    ariaHidden={true}
                />
                <TrackPlayerButton 
                    icon={<ReverseIcon />}
                    ariaHidden={true}
                />
                <TrackPlayerButton 
                    icon={playing ? <PauseIcon /> : <PlayIcon />}
                    ariaLabel={playing ? 'Pause preview' : 'Play preview'}
                    onClick={play}
                    style={{ pointerEvents: errored ? 'none' : 'all' }}
                />
                <TrackPlayerButton 
                    icon={<ReverseIcon />}
                    ariaHidden={true}
                    style={{ transform: 'rotate(180deg)' }}
                />
                <TrackPlayerButton 
                    icon={<RepeatIcon />}
                    ariaHidden={true}
                />
            </div>
        </>
    )
}