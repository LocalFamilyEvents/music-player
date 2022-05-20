import { Box, Text, Flex } from "@chakra-ui/layout";

import GradiantLayout from "../components/gradiantLayout";
import prisma from "../lib/prisma";
import { Image } from "@chakra-ui/react";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradiantLayout
      color="purple"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistCount} public playlists`}
      roundImage
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text>only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="20px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/408/287"
                  borderRadius="100%"
                />
                <Box margin="20px">
                  <Text fontSize="x-large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradiantLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
