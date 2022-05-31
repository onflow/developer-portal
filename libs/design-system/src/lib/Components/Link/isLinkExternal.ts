export const isLinkExternal = (href?: string) => !!href?.match(/^(www|http)/i);
