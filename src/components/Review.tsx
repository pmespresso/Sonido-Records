import { Done } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/joy";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import { MinterType } from "../types";
import { SubHeading } from "./SubHeading";

export function Review() {
  const { state, dispatch } = useContext(AppContext);
  const [didCopy, setDidCopy] = useState(false);
  const submitProposal = async () => {};

  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(state.proposalBytecode);

      setDidCopy(true);

      setTimeout(() => {
        setDidCopy(false);
      }, 2000);
    }
  }

  return (
    <Stack>
      <SubHeading text="Step 4. Review" />

      {state.generatingProposalBytecode ? (
        <CircularProgress variant="solid" thickness={2} />
      ) : state.proposalBytecode ? (
        <Card
          className="hover:shadow-lg transition-shadow duration-300 ease-in-out hover:cursor-pointer w-full"
          variant="outlined"
          sx={{ width: "100%", bgcolor: "background.body", paddingY: 6 }}
          onClick={copyTextToClipboard}
        >
          <CardContent sx={{ px: 2 }} className="justify-center max-w-full">
            <Typography mx="auto" pb={2} fontStyle={"bold"}>
              Proposal Bytecode
            </Typography>
          </CardContent>
          <CardContent sx={{ px: 2 }} className="justify-center max-w-full">
            <Typography
              mx={"auto"}
              maxWidth={"100%"}
              flex={"1 1 auto"}
              flexWrap={"wrap"}
              fontWeight="sm"
              fontSize={"lg"}
              textColor="info"
              mb={2}
            >
              {state.proposalBytecode
                .slice(0, 20)
                .concat(".......")
                .concat(
                  state.proposalBytecode.slice(
                    state.proposalBytecode.length - 20
                  )
                )}
            </Typography>
            <Typography
              fontSize={"xs"}
              alignContent="end"
              justifyContent="end"
              mx={"auto"}
            >
              {didCopy ? "Copied to Clipboard!" : "Click to Copy 📋"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack direction="column" spacing={2}>
          <Typography level="body2">Song Name: {state.songName}</Typography>
          <Typography level="body2">Song Symbol: {state.songSymbol}</Typography>
          <Typography level="body2">
            Metadata Module: {state.metadataModule}
          </Typography>
          <Typography level="body2">Base URI: {state.baseUri}</Typography>
          <Typography level="body2">
            Contract URI: {state.contractUri}
          </Typography>
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
      )}
    </Stack>
  );
}
