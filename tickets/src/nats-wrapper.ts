import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {

    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }
        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise((resolve, reject) => {
            this._client!.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });
            this._client!.on('error', (err) => {
                reject(err);
            })
        })
    }
}

export const natsWrapper = new NatsWrapper();
// Note the above line is exporting an instance of the class defined in this file not the class itself. This is how you secure a Singleton