export interface CardId {
  number: number;
  set: string;
}

export interface Translations<T> {
  pl: T;
  en: T;
}

export interface Card {
  id: CardId;
  word: Translations<string>;
  phonetic: { en: string };
  category: string;
  sentence: Translations<string>;

  synonyms: Partial<Translations<Array<string>>>;
  antonyms: Partial<Translations<Array<string>>>;
  alternatives: Partial<Translations<Array<string>>>;
}

export type CardDefinition = Partial<Card> & { id: CardId };
