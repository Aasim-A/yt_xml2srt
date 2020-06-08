import parseXml from '../util/parseXml.ts';
import decodeHTML from '../util/decodeHTML.ts';
import formatTime from '../util/formatTime.ts';
import { TextElement } from './types.ts';

const toSrt = (res: ReturnType<typeof parseXml>): string => {
  if (!res.root) throw new Error('Error while parsing xml');
  const newRes = res.root.children.map((textElement: TextElement) => ({
    text: decodeHTML(textElement.content),
    attr: {
      start: parseFloat(textElement.attributes.start),
      end:
        parseFloat(textElement.attributes.start) +
        parseFloat(textElement.attributes.dur),
    },
  }));

  let srtText: string = '';

  newRes.forEach((item, index) => {
    const currEnd = item.attr.end;
    const nextStart =
      index + 1 === newRes.length ? 0 : newRes[index + 1].attr.start;
    srtText += `${index + 1}\n`;
    const end = currEnd > nextStart ? nextStart : currEnd;
    srtText += `${formatTime(item.attr.start)} --> ${formatTime(
      nextStart === 0 ? item.attr.end : end
    )}\n`;
    srtText += `${item.text}`;
    if (newRes.length !== index + 1) srtText += '\n\n';
  });

  return srtText;
};

/**
 * Converts YouTube caption format from XML to SRT Asynchronously
 *
 * @param {string} xmlString The XML string to convert to SRT.
 * @returns {Promise<string>} The result of the conversion in SRT format.
 */
export const parse = (xmlString: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const res = parseXml(xmlString);
      const srtText = toSrt(res);

      resolve(srtText);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Converts YouTube caption format from XML to SRT Synchronously
 *
 * @param {string} xmlString The XML string to convert to SRT.
 * @returns {string} The result of the conversion in SRT format.
 */
export const parseSync = (xmlString: string): string => {
  const res = parseXml(xmlString);
  return toSrt(res);
};
