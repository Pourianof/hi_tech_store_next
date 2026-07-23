import Notifier, { ListenCallback } from "@pourianof/notifier";

let currentToken = "";
const notifier = new Notifier<{
  newtoken: string;
}>();

export const authStore = {
  onToken(callback: ListenCallback<"newtoken", string>) {
    return notifier.addListener("newtoken", callback);
  },
  setToken(token: string) {
    currentToken = token;
    notifier.trigger("newtoken", token);
  },
  getToken() {
    return currentToken;
  },
};
