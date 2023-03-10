export const prefixes = {
  product: (path) => {
    const handledPath = path;
    handledPath.last = handledPath.items[handledPath.items.length - 1];
    handledPath.items.pop();
    return handledPath;
  },
  "product-category": null,
};
