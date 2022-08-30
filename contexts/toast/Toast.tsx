import { motion } from 'framer-motion';
import styles from './Toast.module.scss';
import { Toast as ToastType } from './types';

const TRANSFORM_TOP = 80;
export const Toast: React.FC<ToastType> = ({ content, type }) => {
    const className = [
        styles['item'],
        styles[type]
    ].join(' ');
    return(
        <motion.div 
            className={className}
            animate={{ translateY: 0, translateX: `-50%` }}
            initial={{ translateY: TRANSFORM_TOP, translateX: `-50%` }}
            exit={{ translateY: TRANSFORM_TOP, translateX: `-50%` }}
        >
            <span>
                {content}
            </span>
        </motion.div>
    )
}