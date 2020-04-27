class Storage {
  data = {};

  get = () => this.data;

  set = data => {
    this.data = {
      ...this.data,
      ...data,
    };
  };
}

export const storage = new Storage();
