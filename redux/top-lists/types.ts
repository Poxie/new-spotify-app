import { Track } from "../../types"

export type TopListsState = {
    lists: {[key: string]: Track[]}
}