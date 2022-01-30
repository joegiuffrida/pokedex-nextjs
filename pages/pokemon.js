import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Pokemon = ({ poke }) => {
  return (
    <Wrapper>
      <Head>
        <title>{poke.name}</title>
      </Head>
      <PageTitle>{poke.name}</PageTitle>
      <PokeImage src={poke.image} alt={poke.name} />
      <p>
        <Attributes>
          Weight: <span>{poke.weight}</span>
        </Attributes>
      </p>
      <p>
        <Attributes>
          Height: <span>{poke.height}</span>
        </Attributes>
      </p>
      <Types>Types</Types>
      {poke.types.map((type, index) => {
        return <p key={index}>{type.type.name}</p>;
      })}
      <HomeLinkWrapper>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
      </HomeLinkWrapper>
    </Wrapper>
  );
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

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
  margin: 15px 0;
  text-align: center;
`;

const PokeImage = styled.img`
  width: 40%;
  margin: 0 auto;
`;

const Attributes = styled.span`
  font-weight: bold;

  > span {
    font-weight: normal;
  }
`;

const Types = styled.h2`
  font-size: 1.25rem;
  margin: 10px 0;
`;

const HomeLinkWrapper = styled.p`
  margin: 15px;
  text-align: center;
  font-size: 1.25rem;
`;

export default Pokemon;
