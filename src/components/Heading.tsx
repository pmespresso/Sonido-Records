import { Stack, Typography } from "@mui/joy";

export function Heading() {
  return (
    <Stack spacing={2} marginBottom="20px" paddingBottom={"20px"}>
      <Typography textColor="neutral.500" fontSize="lg" fontWeight="lg">
        Sonido Propose
      </Typography>
      <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
        Upload your song and propose it to the Sonido DAO to have it minted as
        an NFT.
      </Typography>
    </Stack>
  );
}
