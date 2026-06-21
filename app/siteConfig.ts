// Central config — all personalisation lives here.
// Every value is driven by a NEXT_PUBLIC_ env var so it works in "use client"
// components. Change the values in .env.local (never commit real names there).

export const RECIPIENT_NAME: string =
  process.env.NEXT_PUBLIC_RECIPIENT_NAME ?? "Mehwish";

export const BIRTHDAY_DATE: string =
  process.env.NEXT_PUBLIC_BIRTHDAY_DATE ?? "27 May";

export const LANDING_LETTER_MESSAGE: string =
  process.env.NEXT_PUBLIC_LANDING_LETTER_MESSAGE ??
  "My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you. 💕";

export const BIRTHDAY_MESSAGE: string =
  process.env.NEXT_PUBLIC_BIRTHDAY_MESSAGE ??
  "Happy Birthday, {name}. Today the whole universe pauses just for you — the warmest, most radiant soul I know. May this year hold everything your heart quietly hopes for. You are loved beyond all words. Always. 💕";
