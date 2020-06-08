export interface TextElement {
  name: string;
  attributes: {
    start: string;
    dur: string;
  };
  children: [];
  content: string;
}
