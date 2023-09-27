export function load({ data }) {
  return {
    ...data,
    pageMeta: { pageTitle: null }
  };
}
