import { defineStore } from "pinia";
import { login } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    code: 0,
    info: {},
  }),

  getters: {
    getUserCode: (state) => {
      return state.code || 0;
    },

    getUserInfo: (state) => {
      return state.info || {};
    },
  },

  actions: {
    setCode(state) {
      this.code = state;
    },

    setInfo(state) {
      this.info = state.body.info;
      this.setCode(state.code);
    },

    async setlogin() {
      try {
        const res = await login();
        this.setInfo(res);
        return res;
      } catch (err) {
        throw err;
      };
    },
  },
});
