import { useAppDispatch, useAppSelector } from "@/store";
import { useCallback, useEffect, useMemo } from "react";
import uniqid from "uniqid";
import { createSwitchGroupSelector, toggleSwitch } from "./slice";
import type { SwitchOptions } from "./types";

export const useToggle = (options?: Partial<SwitchOptions>) => {
  const defaultItemId = useMemo(() => uniqid(), []);

  const {
    active: activeOnInit,
    itemId = defaultItemId,
    groupId,
  } = {
    ...options,
  };
  const dispatch = useAppDispatch();

  const selectSwitchGroup = createSwitchGroupSelector(groupId ?? itemId);
  const activeItemId = useAppSelector(selectSwitchGroup);

  const active = activeItemId === itemId;
  const nextOptions: SwitchOptions = {
    groupId,
    itemId,
    active: !active,
  };

  const toggle = useCallback(
    () => dispatch(toggleSwitch(nextOptions)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(nextOptions),
  );

  useEffect(() => {
    if (activeOnInit) {
      dispatch(toggleSwitch({
        ...nextOptions,
        active: activeOnInit,
      }));
    }

    return () => {
      dispatch(toggleSwitch({
        ...nextOptions,
        active: false,
      }));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    active,
    toggle,
  };
};
