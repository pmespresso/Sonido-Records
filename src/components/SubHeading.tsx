import { Typography } from "@mui/joy";

export function SubHeading({ text }: { text: string }) {
  return (
    <Typography
      textColor="neutral.500"
      fontSize="md"
      fontWeight="sm"
      paddingY={"20px"}
    >
      {text}
    </Typography>
  );
}
