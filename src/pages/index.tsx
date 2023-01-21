import { ConnectButton } from "@rainbow-me/rainbowkit";
import Stack from "@mui/joy/Stack";
import { Button, Grid, Sheet, Typography } from "@mui/joy";
import Image from "mui-image";
import { useAccount } from "wagmi";

import bg1 from "../images/bg_1.png";
import { Account } from "../components";
import { useSound } from "../hooks/useSound";
import { Reducer, useReducer } from "react";
import { UploadMusicInputGroup } from "../components/UploadMusic";
import { SongEditionInput } from "../components/SongEditionInput";
import { SelectMinter } from "../components/SelectMinter";

export type State = {
  songName: string;
  songSymbol: string;
  metadataModule: string;
  baseUri: string;
  contractUri: string;
  fundingRecipient: string;
  royaltyBps: number;
  editionMaxMintable: number;
  editionCutoffTime: number;
  flags: number;
};

export type Action =
  | { type: "SET_SONG_NAME"; payload: string }
  | { type: "SET_SONG_SYMBOL"; payload: string }
  | { type: "SET_METADATA_MODULE"; payload: string }
  | { type: "SET_BASE_URI"; payload: string }
  | { type: "SET_CONTRACT_URI"; payload: string }
  | { type: "SET_FUNDING_RECIPIENT"; payload: string }
  | { type: "SET_ROYALTY_BPS"; payload: number }
  | { type: "SET_EDITION_MAX_MINTABLE"; payload: number }
  | { type: "SET_EDITION_CUTOFF_TIME"; payload: number }
  | { type: "SET_FLAGS"; payload: number };

function Page() {
  const { isConnected } = useAccount();
  const client = useSound();

  const initialState = {
    songName: "",
    songSymbol: "",
    metadataModule: "",
    baseUri: "",
    contractUri: "",
    fundingRecipient: "",
    royaltyBps: 0,
    editionMaxMintable: 0,
    editionCutoffTime: 0,
    flags: 0,
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "SET_SONG_NAME":
        return { ...state, songName: action.payload };
      case "SET_SONG_SYMBOL":
        return { ...state, songSymbol: action.payload };
      case "SET_METADATA_MODULE":
        return { ...state, metadataModule: action.payload };
      case "SET_BASE_URI":
        return { ...state, baseUri: action.payload };
      case "SET_CONTRACT_URI":
        return { ...state, contractUri: action.payload };
      case "SET_FUNDING_RECIPIENT":
        return { ...state, fundingRecipient: action.payload };
      case "SET_ROYALTY_BPS":
        return { ...state, royaltyBps: action.payload };
      case "SET_EDITION_MAX_MINTABLE":
        return { ...state, editionMaxMintable: action.payload };
      case "SET_EDITION_CUTOFF_TIME":
        return { ...state, editionCutoffTime: action.payload };
      case "SET_FLAGS":
        return { ...state, flags: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  return (
    <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
      <Grid lg={4}>
        <Sheet>
          <Stack>
            <ConnectButton />
            {isConnected && <Account />}
          </Stack>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography textColor="neutral.500" fontSize="lg" fontWeight="lg">
                Sonido Propose
              </Typography>
              <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
                Upload your song and propose it to the Sonido DAO to have it
                minted as an NFT.
              </Typography>
            </Stack>
            <UploadMusicInputGroup state={state} dispatch={dispatch} />
            <SongEditionInput state={state} dispatch={dispatch} />
            <SelectMinter state={state} dispatch={dispatch} />
            <Stack>
              <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
                Step 4. Review
              </Typography>
            </Stack>
            <Stack>
              <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
                Step 5. Submit Proposal
              </Typography>
              <Button
                color="info"
                variant="outlined"
                endDecorator={<span>🔥</span>}
                fullWidth={false}
                size={"md"}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Sheet>
      </Grid>
      <Grid lg={8}>
        <Image
          src={bg1.src}
          alt="bg_1.png"
          height="100%"
          width="100%"
          fit="cover"
          duration={1000}
          bgColor="inherit"
        />
      </Grid>
    </Grid>
  );
}

export default Page;
