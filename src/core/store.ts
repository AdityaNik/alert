import { IToast, ToastType } from './types';

class Reducer {
  toasts: Array<IToast>;
  subscribers: Array<(toast: IToast) => void>;

  constructor() {
    this.toasts = [];
    this.subscribers = [];
  }

  subscribe(func: (toast: IToast) => void) {
    this.subscribers = [...this.subscribers, func];
    return () => {
      this.subscribers.splice(this.subscribers.indexOf(func), 1);
    };
  }

  publish(toast: IToast) {
    this.subscribers.forEach((func) => func(toast));
  }

  add(message: string, type: ToastType) {
    const toast = {
      id: this.toasts.length,
      state: 'enter',
      type: type,
      title: message,
    } as IToast;

    this.toasts = [...this.toasts, toast];
    this.publish(toast);
  }
}

export const Store = new Reducer();
