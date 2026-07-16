import { WEB_CONTRACT } from '../../protocol/contract';

export const WS_QUERY_PARAM = 'ws';
export const PAIRING_QUERY_PARAM = 'pairing';

const DEV_SERVER_PORTS = new Set(['4173', '5173']);

function protocolForWebSocket(): 'ws' | 'wss' {
  return window.location.protocol === 'https:' ? 'wss' : 'ws';
}

function isServedByRemoteBridge(): boolean {
  return window.location.pathname.startsWith(WEB_CONTRACT.basePath) && !DEV_SERVER_PORTS.has(window.location.port);
}

export function readInitialWebSocketUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const explicitUrl = params.get(WS_QUERY_PARAM)?.trim();
  if (explicitUrl) {
    return explicitUrl;
  }

  if (isServedByRemoteBridge()) {
    return `${protocolForWebSocket()}://${window.location.host}${WEB_CONTRACT.webSocketPath}`;
  }

  return `ws://127.0.0.1:${WEB_CONTRACT.defaultRemotePort}${WEB_CONTRACT.webSocketPath}`;
}

// The bridge embeds ?pairing=<token> in every URL it advertises (and therefore in the
// QR code / link shown in the Dorblux app), so a client that was actually shown that QR
// code can read it straight back out of its own page URL.
export function readInitialPairingToken(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  return params.get(PAIRING_QUERY_PARAM)?.trim() || undefined;
}
