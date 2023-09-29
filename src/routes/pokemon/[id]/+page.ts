export function load({ data }) {
  return {
    ...data,
    pageMeta: { pageTitle: data.pokemon.name.toUpperCase() }
  };
}
