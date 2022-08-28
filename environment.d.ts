declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_WEBSITE_NAME: string;
            MAIL_HOST: string;
            MAIL_ADDRESS: string;
            MAIL_PASSWORD: string;
            MAIL_TO_ADDRESS: string;
            MAIL_SUBJECT: string;
        }
    }
}

export {};