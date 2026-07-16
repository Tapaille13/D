const { createBridgeServer } = require('./server');
import type { BridgeOptions } from './types';

function createBridgeRuntime(options: BridgeOptions = {}) {
    return createBridgeServer(options);
}

function ensureBridge(options: BridgeOptions = {}) {
    if (!globalThis.__dorbluxRemoteBridgeRuntime) {
        globalThis.__dorbluxRemoteBridgeRuntime = createBridgeRuntime(options);
    }

    return globalThis.__dorbluxRemoteBridgeRuntime;
}

module.exports = {
    createBridgeRuntime,
    ensureBridge,
};
