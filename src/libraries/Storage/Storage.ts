type StorageOptions = {
  strategy: 'indexdb' | 'cloud';
  options?: {
    cloud?: {
      endpoint: string;
    };
  };
};

export class Storage {
  private _strategy: StorageOptions['strategy'];
  private _storage: { [key: string]: any };
  constructor(options: StorageOptions) {
    this._storage = {};
    this._strategy = options.strategy;
  }
  get(key: string) {
    return this._storage[key];
  }
  set(key: string, value: any) {
    this._storage[key] = value;
  }

  save() {
    console.log(`Saving to ${this._strategy}...`);
  }
}
