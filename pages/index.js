import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Wrapper>
      <Head>
        <title>Pokedex</title>
      </Head>
      <PageTitle>NextJS Pokedex</PageTitle>
      <PokemonContainer>
        {pokemon.map((poke, index) => {
          return (
            <List key={index}>
              <Link href={`/pokemon?id=${index + 1}`} passHref>
                <PokemonLink>
                  <span>
                    {index + 1}. {poke.name}
                  </span>
                  <PokemonImage src={poke.image} alt={poke.name} />
                </PokemonLink>
              </Link>
            </List>
          );
        })}
      </PokemonContainer>
    </Wrapper>
  );
}

export const getStaticProps = async (context) => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin: 15px 0;
`;

const PokemonContainer = styled.ul`
  /* display: flex;
  flex-direction: column; */
`;

const List = styled.li`
  /* display: flex;
  flex-direction: column; */
`;

const PokemonLink = styled.a`
  display: flex;
  flex-direction: column;
  background-color: #ededfc;
  padding: 10px;
  margin: 10px 0;
  text-transform: capitalize;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  transition: box-shadow 0.25s, transform 0.25s;

  &:hover {
    box-shadow: 0 0.5em 0.5em -0.4em #9090fc;
    transform: translateY(-0.25em);
  }
`;

const PokemonImage = styled.img`
  height: 60%;
  width: 60%;
  margin: 0 auto;
`;
