import type { CheatSchema, TrainerMetaPayload } from '../../protocol/messages';

// NOTE (local-only hardening): this used to call out to https://api.dorblux.com/...,
// sending the account's Bearer access token to fetch localized cheat strings.
// That is disabled here so the app never makes this outbound request: it now
// always resolves immediately with no strings, so localizeTrainerMeta falls back
// to the payload's original (untranslated) text.
export async function localizeTrainerMeta(payload: TrainerMetaPayload): Promise<TrainerMetaPayload> {
  const strings = await fetchTrainerStrings(payload);
  if (!strings) {
    return payload;
  }

  const cheats = payload.schema.cheats.map((cheat) => localizeCheat(cheat, strings));
  return { ...payload, schema: { ...payload.schema, cheats } };
}

async function fetchTrainerStrings(_payload: TrainerMetaPayload): Promise<Record<string, string> | null> {
  return null;
}

function localizeCheat(cheat: CheatSchema, strings: Record<string, string>): CheatSchema {
  return {
    ...cheat,
    name: strings[cheat.name] ?? cheat.name,
    description: translate(cheat.description, strings),
    instructions: translate(cheat.instructions, strings),
  };
}

function translate(value: string | null | undefined, strings: Record<string, string>): string | null {
  if (!value) {
    return value ?? null;
  }

  return strings[value] ?? value;
}
