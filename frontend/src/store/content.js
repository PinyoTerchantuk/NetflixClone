//มีทั้ง tv เเละ movie ใช้คำว่าcontentจะmake senseเเละใช้ได้ทั้งสองเลย

import { create } from "zustand";

export const useContentStore = create((set) => ({
    contentType:"movie",
    setContentType:(type) => set({contentType:type}),

}))