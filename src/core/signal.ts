export class Signal<T extends Array<any>> {
  private listeners: ((...args: T) => any)[] = [];

  public add(receiver: (...args: T) => any) {
    this.listeners.push(receiver);
  }

  public remove(receiver: (...args: T) => any) {
    for (let i = 0; i < this.listeners.length; ++i) {
      if (this.listeners[i] === receiver) {
        this.listeners.splice(i, 1);
        return;
      }
    }
  }

  public dispatch(...args: T) {
    for (let i = 0; i < this.listeners.length; ++i) {
      this.listeners[i](...args);
    }
  }

  public clear() {
    this.listeners = [];
  }
}