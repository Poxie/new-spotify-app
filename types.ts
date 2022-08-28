export type Track = {
    name: string;
    preview_url: string;
    href: string;
    id: string;
    explicit: boolean;
    artists: Artist[];
    album: Album;
    uri: string;
}
export type Album = {
    artists: Artist[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    uri: string;
}
export type Artist = {
    name: string;
    id: string;
    uri: string;
}
export type Image = {
    height: number;
    url: string;
    width: number;
}