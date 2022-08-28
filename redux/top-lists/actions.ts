export const setTopList = (listName: string, tracks: any[]) => ({
    type: 'SET_TOP_LIST',
    payload: { listName, tracks }
})