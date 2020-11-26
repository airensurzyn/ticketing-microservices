import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    console.log(url);
    console.log(clusterId);
    console.log(clientId);
    //this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        console.log('Getting an error:');
        console.log(err.stack);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
// Note the above line is exporting an instance of the class defined in this file not the class itself. This is how you secure a Singleton