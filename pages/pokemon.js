const Pokemon = ({ poke }) => {
  console.log(poke);
  return <div></div>;
};

export const getServerSideProps = async ({ query }) => {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const poke = await res.json();
    const paddedIndex = ('00' + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    poke.image = image;

    return {
      props: {
        poke,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Pokemon;
