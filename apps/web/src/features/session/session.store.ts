import { create } from "zustand/react";
import { SessionEntity } from "@/entities/session";

export type SessionStore = {
    session: SessionEntity | null;
    setSession: (session: SessionEntity | null) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
}));