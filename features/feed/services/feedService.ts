import { FeedItemType } from "../types";

export const fetchFeed = async (page: number): Promise<FeedItemType[]> => {

    // simulate API
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

    return Array.from({ length: 200 }, (_, index) => ({
        id: `${page}-${index}`,
        title: `POst ${page}-${index}`,
        image: `https://picsum.photos/200?random=${page}-${index}`,
    }));
}