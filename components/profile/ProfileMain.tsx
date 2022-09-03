import { useRouter } from "next/router";
import { ProfileRecommendations } from "./ProfileRecommendations";
import { ProfileTops } from "./ProfileTops";

export const ProfileMain = () => {
    const { tab } = useRouter().query as { tab: string };

    switch(tab) {
        case 'most played':
            return <ProfileTops />;
        case 'recommendations':
            return <ProfileRecommendations />
        default:
            return <ProfileTops />;
    }
}