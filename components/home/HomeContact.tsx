import React, { useState } from "react";
import Image from "next/image"
import styles from '../../styles/Home.module.scss';
import Button from "../button";
import { Input } from "../input";

export const HomeContact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [statusCode, setStatusCode] = useState(200);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Making sure inputs arent empty
        if(!message || !email) return;

        // Resetting mail inputs
        setMessage('');
        setEmail('');

        // Sending mail 
        fetch(`/api/message`, {
            method: 'POST',
            body: JSON.stringify({
                message,
                email
            })
        })
        .then(res => res.json())
        .then(({ message, status }) => {
            // Updating mail status
            setStatusMessage(message);
            setStatusCode(status);
        })
    }

    const statusClassName = [
        styles['contact-status'],
        statusCode === 200 ? styles['success'] : styles['error']
    ].join(' ');
    return(
        <section className={styles.contact}>
            <div 
                style={{ bottom: 'unset', top: -50 }}
                className={styles.separator} 
                aria-hidden="true"
            >
                <Image 
                    src={'/imgs/separator.png'}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>

            <div className={styles['contact-content']}>
                <h2>
                    Feel like something's missing?
                </h2>
                <form onSubmit={submit}>
                    <Input 
                        label={'Email'}
                        type={'email'}
                        onChange={setEmail}
                        value={email}
                        name="email"
                    />
                    <Input 
                        label={'Message'}
                        textArea={true}
                        onChange={setMessage}
                        value={message}
                        name="message"
                    />
                    <Button 
                        type={'secondary'}
                        className={styles['contact-button']}
                    >
                        Send Message
                    </Button>
                </form>
                {statusMessage && (
                    <span className={statusClassName}>
                        {statusMessage}
                    </span>
                )}
            </div>
        </section>
    )
}