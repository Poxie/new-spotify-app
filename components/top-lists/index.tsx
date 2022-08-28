import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/store"
import { selectTopList, selectTopLists } from "../../redux/top-lists/hooks"
import { TopListHeader } from "./TopListHeader";

export const TopLists = () => {
    const { country='global' } = useRouter().query as { country?: string };

    return(
        <main>
            <TopListHeader 
                country={country}
            />
        </main>
    )
}