export interface Param {
    name: string;
    value: string | number | boolean;
  }
  
  export class CosmoDB {
    constructor(config, containerId: string) {}
    public async get(query: string, params: Array<Param>) {
        console.log('in mock');
        return [{}];
    }
  }
  