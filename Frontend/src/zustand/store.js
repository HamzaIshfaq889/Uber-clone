import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  },
  captain: {
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    status: "",
    vehicle: {
      name: "",
      plateNumber: "",
      capacity: "",
      vehicleType: "",
      model: "",
      images: [],
    },
  },

  setUser: (user) => set({ user }),
  setCaptain: (captain) => set({ captain }),
}));

export default useStore;
