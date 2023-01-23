import { Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import { MinterType } from "../types";
import { SubHeading } from "./SubHeading";

export function Review() {
  const { state, dispatch } = useContext(AppContext);
  const submitProposal = async () => {};

  return (
    <Stack>
      <SubHeading text="Step 4. Review" />

      {/* use a Card component that lists all the attributes listed in state with regard to the song edition */}
      <Stack direction="column" spacing={2}>
        <Typography level="body2">Song Name: {state.songName}</Typography>
        <Typography level="body2">Song Symbol: {state.songSymbol}</Typography>
        <Typography level="body2">
          Metadata Module: {state.metadataModule}
        </Typography>
        <Typography level="body2">Base URI: {state.baseUri}</Typography>
        <Typography level="body2">Contract URI: {state.contractUri}</Typography>
        <Typography level="body2">
          Minter Type: {MinterType[state.minter]}
        </Typography>
        <Typography level="body2">
          Funding Recipient: {state.fundingRecipient}
        </Typography>
        <Typography level="body2">Royalty BPS: {state.royaltyBps}</Typography>
        <Typography level="body2">
          Edition Max Mintable: {state.editionMaxMintable}
        </Typography>
        <Typography level="body2">
          Edition Cutoff Time: {state.editionCutoffTime}
        </Typography>
      </Stack>
    </Stack>
  );
}
