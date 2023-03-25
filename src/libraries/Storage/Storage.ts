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
  private _storage: Map<string, string>;
  constructor(options: StorageOptions) {
    this._storage = new Map();
    this._strategy = options.strategy;
  }
  get(key: string) {
    return this._storage.get(key);
  }
  set(key: string, value: any, save?: boolean) {
    this._storage.set(key, value);
    if (save) this.save();
  }

  async save() {
    console.log(`Not Implemented: Saving to ${this._strategy}...`);
  }
}
