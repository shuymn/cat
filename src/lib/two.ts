export const isValidUrl = (url: string): boolean =>
  /^https:\/\/twitter\.com\/\w+(\/(likes|media|moments|with_replies|lists(\/\d+)?|(status|events)\/\d+))?/.test(
    url
  );

export const convert = (url: string): string =>
  url.replace(/^https:\/\/twitter\.com/, "https://two.shuymn.me");
