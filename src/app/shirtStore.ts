import { create } from 'zustand';

type State = {
  intro: boolean;
  color: string;
  decal: string;
  colors: string[];
  decals: string[];
  setIntro: (intro: boolean) => void;
  setColor: (color: string) => void;
  setDecal: (decal: string) => void;
};

export const useStore = create<State>((set) => ({
  intro: true,
  color: '#dd5c18',
  decal: 'react',
  colors: ['#dd5c18', '#2563eb', '#999999', '#000000', '#ffffff'],
  decals: ['react', 'three2', 'pmndrs'],
  setIntro: (intro) => set({ intro }),
  setColor: (color) => set({ color }),
  setDecal: (decal) => set({ decal }),
}));
