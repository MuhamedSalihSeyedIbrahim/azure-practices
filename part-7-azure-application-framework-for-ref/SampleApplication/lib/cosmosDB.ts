import * as Cosmos from '@azure/cosmos';

export interface Param {
    name: string;
    value: string | number | boolean;
}

export class CosmosDB {
    private _dbClient;
    private _database;
    private _container;
    constructor(config, containerId: string) {
        //If connecting to the Cosmos DB Emulator, disable TLS verification for your node process:
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const endpoint = config.endpoint;
        const key = config.key;
        this._dbClient = new Cosmos.CosmosClient({ endpoint, key });

        this._database = this._dbClient.database(config.databaseId);
        this._container = this._database.container(containerId);
    }
    public async get(query: string, params: Array<Param>): Promise<unknown> {
        const querySpec = {
            query: query,
            parameters: params,
        };
        const { resources: items } = await this._container.items.query(querySpec).fetchAll();
        return items;
    }

    
  public async insertAll(data: Array<unknown>)
  {
    await Promise.all(data.map((row: any) => this._container.items.create(row)));
  }

  public async insert(data: unknown)
  {
    await this._container.items.create(data);
  }
}
