import { useDispatch } from "react-redux";
import { useCallback } from "react";

import useDayChange from "@/hooks/useDayChange";
import { loadOverview,
  loadFocusAnalytics,
  loadWebsiteAnalytics,
  loadHistoryAnalytics, } from "@/app/slices/analytic/analyticThunk";
import { loadFocusHistory } from "@/app/slices/focus/focusThunk";

function DayChangeListener() {
  const dispatch = useDispatch();

  const refreshAnalytics = useCallback(() => {
    dispatch(loadOverview());
    dispatch(loadFocusAnalytics());
    dispatch(loadWebsiteAnalytics());
    dispatch(loadHistoryAnalytics());
    dispatch(loadFocusHistory());
  }, [dispatch]);

  useDayChange(refreshAnalytics);

  return null;
}

export default DayChangeListener;