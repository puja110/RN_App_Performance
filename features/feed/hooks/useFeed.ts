import { useState, useCallback, useEffect } from "react";
import { FeedItemType } from "../types";
import { fetchFeed } from "../services/feedService";

export const useFeed = () => {
  const [data, setData] = useState<FeedItemType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const firstPage = await fetchFeed(1);
        setData(firstPage);
        setPage(2);
      } catch (error) {
        console.error("Initial load error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetchFeed(page);

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  const refresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      const firstPage = await fetchFeed(1);
      setData(firstPage);
      setPage(2);
      setHasMore(true);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return { data, loadMore, refresh, loading, refreshing };
};