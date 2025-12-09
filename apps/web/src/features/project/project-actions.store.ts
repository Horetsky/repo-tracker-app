import { create } from "zustand";

type ProjectActionsStore = {
    refreshingIds: string[];
    actions: {
        markRefreshing: (id: string) => void;
        unmarkRefreshing: (id: string) => void;
        reset: () => void;
    };
};

export const useProjectActionsStore = create<ProjectActionsStore>((set) => ({
    refreshingIds: [],
    actions: {
        markRefreshing: (id) =>
            set((state) => ({ refreshingIds: [...state.refreshingIds, id] })),

        unmarkRefreshing: (id) =>
            set((state) => ({
                refreshingIds: state.refreshingIds.filter((item) => item !== id),
            })),

        reset: () => set({ refreshingIds: [] }),
    },
}));