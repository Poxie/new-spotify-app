export type Profile = {
    display_name: string;
    followers: { count: number };
    images: Image[];
    uri: string;
}
export type Track = {
    name: string;
    preview_url: string;
    href: string;
    id: string;
    explicit: boolean;
    artists: Artist[];
    album: Album;
    uri: string;
    popularity: number;
    type: string;
}
export type Album = {
    artists: Artist[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    uri: string;
    type: string;
}
export type Artist = {
    name: string;
    id: string;
    uri: string;
    followers: { total: number }
    genres: string[]
    images: Image[];
    type: string
}
export type Image = {
    height: number;
    url: string;
    width: number;
}