import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import Button from '../button';
import { NavbarTabs } from './NavbarTabs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const NavbarRight = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // Closing navigation on route change
    useEffect(() => {
        setOpen(false);
    }, [router.asPath]);

    const className = [
        styles['right'],
        open ? styles['open'] : ''
    ].join(' ');
    return(
        <>
        <motion.div 
            className={className}
            animate={{ left: open ? '0' : '100%' }}
            initial={{ left: '100%' }}
            transition={{ bounce: false }}
        >
            <NavbarTabs />
            <Button className={styles.button}>
                Login with Spotify
            </Button>
        </motion.div>

        <button 
            className={styles.ham} 
            onClick={() => setOpen(!open)}
        >
            <Image 
                src={'/icons/ham.svg'}
                width={32}
                height={32}
            />
        </button>
        </>
    )
}