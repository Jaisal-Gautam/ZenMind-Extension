import { useDispatch } from "react-redux";
import { useCallback } from "react";

import useDayChange from "@/hooks/useDayChange";

import { loadDashboard } from "@/api/dashboard.api";
import { loadFocusHistory } from "@/app/slices/focus/focusThunk";

function DayChangeListener() {
  const dispatch = useDispatch();

  const refreshAnalytics = useCallback(() => {
    dispatch(loadDashboard());

    dispatch(loadFocusHistory());
  }, [dispatch]);

  useDayChange(refreshAnalytics);

  return null;
}

export default DayChangeListener;
