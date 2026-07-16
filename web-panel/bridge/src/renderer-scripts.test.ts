import { describe, expect, it } from 'vitest';

import {
  findSteamAppId,
  getSteamClientIconUrl,
  normalizeImageUrl,
} from '../scripts/default/installed-apps-sync/artwork.js';

describe('installed-apps renderer script models', () => {
  it('normalizes captured artwork shapes without a Dorblux runtime', () => {
    expect(normalizeImageUrl({ cover: { imageUrl: '//cdn.example/game.webp' } }))
      .toBe('https://cdn.example/game.webp');
    expect(normalizeImageUrl('file:///local/image.png')).toBeNull();
  });

  it('finds nested Steam metadata, but no longer builds an external Dorblux CDN icon URL (local-only hardening)', () => {
    const fixture = {
      game: {
        metadata: {
          steam: {
            appId: 1245620,
          },
        },
      },
    };

    expect(findSteamAppId(fixture)).toBe('1245620');
    // getSteamClientIconUrl is intentionally disabled: it used to build a URL pointing
    // at an external Dorblux CDN, which the renderer would then load, leaking your IP.
    expect(getSteamClientIconUrl(findSteamAppId(fixture))).toBeNull();
  });
});
