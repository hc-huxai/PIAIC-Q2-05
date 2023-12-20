import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ContactData } from "@/types/contactData";
import { v4 as generateUUID } from "uuid";

interface FormStore {
  items: ContactData[];
  addItem: (data: ContactData) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  getItem: (id: string) => ContactData;
  modifyItem: (id: string, data: ContactData) => void;
}

const useContactForm = create(
  persist<FormStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ContactData) => {
        const currentItems = get().items;
        // const existingItem = currentItems.find((item) => item.id === data.id);

        // if (existingItem) {
        //   return alert("Item already in cart");
        // }


        const uuid = generateUUID();
        set({ items: [...get().items, {...data, id: uuid }] });
        alert("Form Submitted");
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        alert("Form Deleted.");
      },

      removeAll: () => {
        set({ items: [] });
      },

      getItem: (id: string) => {
        const currentItems = get().items;
        const requestedItem = currentItems.find((item) => item.id === id);
        return requestedItem!;
      },

      modifyItem: (id: string, data: ContactData) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, ...data } : item
          )
        })
      },
    }),
    {
      name: "form-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useContactForm;
