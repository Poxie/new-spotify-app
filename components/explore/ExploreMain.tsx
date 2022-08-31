import { useRouter } from "next/router"
import { ExploreArtists } from "./ExploreArtists";
import { ExploreSongs } from "./ExploreSongs";

export const ExploreMain = () => {
    const { tab } = useRouter().query as { tab: string };

    switch(tab) {
        case 'songs':
            return <ExploreSongs />;
        case 'artists':
            return <ExploreArtists />;
        default:
            return <ExploreSongs />;
    }
}