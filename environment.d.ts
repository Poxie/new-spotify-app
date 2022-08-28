declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_WEBSITE_NAME: string;
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_ACCOUNT_ENDPOINT: string;
            NEXT_PUBLIC_TOKEN_ENDPOINT: string;
            NEXT_PUBLIC_REDIRECT_URI: string;
            NEXT_PUBLIC_GLOBAL_PLAYLIST_ID: string;
            CLIENT_ID: string;
            CLIENT_SECRET: string;

            MAIL_HOST: string;
            MAIL_ADDRESS: string;
            MAIL_PASSWORD: string;
            MAIL_TO_ADDRESS: string;
            MAIL_SUBJECT: string;
        }
    }
}

export {};