declare global {
  interface Window {
    YaAuthSuggest: {
      init: void;
    };
  }
}

declare module '*.svg?url' {
  const content: {
    src: string;
  };
  export default content;
}
