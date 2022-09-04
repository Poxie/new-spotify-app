import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import Button from '../button';
import { NavbarTabs } from './NavbarTabs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/store';
import { selectProfile } from '../../redux/profile/hooks';
import { NavbarLoginButton } from './NavbarLoginButton';
import { NavbarProfile } from './NavbarProfile';
import { HamIcon } from '../../assets/icons/HamIcon';

export const NavbarRight = () => {
    const router = useRouter();
    const profile = useAppSelector(selectProfile);
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

            {!profile ? (
                <NavbarLoginButton />
            ) : (
                <NavbarProfile />
            )}
        </motion.div>

        <button 
            className={styles.ham} 
            onClick={() => setOpen(!open)}
        >
            <HamIcon />
        </button>
        </>
    )
}