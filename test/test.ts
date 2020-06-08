import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { parse, parseSync } from '../mod.ts';
import { xmlData, expectedResult } from './testData.ts';

Deno.test('parse()', async () => {
  const parseXmlPromise = await parse(xmlData);
  assertEquals(parseXmlPromise, expectedResult);
});

Deno.test('parseSync()', () => {
  const parseXmlSync = parseSync(xmlData);
  assertEquals(parseXmlSync, expectedResult);
});
