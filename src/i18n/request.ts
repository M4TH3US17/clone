import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import { defineRouting } from 'next-intl/routing';
import { routing } from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {

  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../languages/${locale}.json`)).default
  };
});

export type Locale = (typeof routing.locales)[number];