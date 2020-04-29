const initialData = {
  networkTimings: {
    css: [],
    font: [],
    img: [],
    script: [],
  },
};

class Storage {
  data = { ...initialData };

  get = () => this.data;

  set = data => {
    this.data = {
      ...this.data,
      ...data,
    };
  };
}

export const storage = new Storage();
