type StorageOptions = {
  strategy: 'localstorage' | 'indexdb' | 'cloud';
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
    switch (this._strategy) {
      case 'localstorage':
        this._openLocalStorage();
        break;
      case 'indexdb':
        break;
      case 'cloud':
        break;
    }
  }
  get(key: string) {
    return this._storage.get(key);
  }
  set(key: string, value: any, { save }: { save?: boolean }) {
    this._storage.set(key, value);
    if (save) this.commit();
  }

  async commit() {
    console.log(`Not Implemented: Saving to ${this._strategy}...`);
  }

  async _openLocalStorage() {
    const entries = JSON.parse(localStorage.getItem('storage') || '{}');
    this._storage = new Map(Object.entries(entries));
  }
  async _commitLocalStorage() {
    console.log(`Saving to localstorage...`);
    const entries = Object.fromEntries(this._storage.entries());
    localStorage.setItem('storage', JSON.stringify(entries));
  }
}
