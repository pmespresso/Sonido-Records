// react component that lets user upload music files to IPFS
import { Input, Stack } from "@mui/joy";
import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";
import { SubHeading } from "./SubHeading";

export function SongEditionInput() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Stack>
      <SubHeading text={"2. Song Edition Details"} />
      <Stack direction={"row"} spacing={4}>
        <Stack direction="column" spacing={2}>
          <Input
            variant="outlined"
            value={state.songName}
            placeholder={"Song Name"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_SONG_NAME", payload: value });
            }}
          />
          <Input
            variant="outlined"
            value={state.songSymbol}
            placeholder={"Song Symbol"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_SONG_SYMBOL", payload: value });
            }}
          />
          <Input
            variant="outlined"
            value={state.metadataModule}
            placeholder={"Metadata Module"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_METADATA_MODULE", payload: value });
            }}
          />

          <Input
            variant="outlined"
            value={state.baseUri}
            placeholder={"Base URI"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_BASE_URI", payload: value });
            }}
          />

          <Input
            variant="outlined"
            value={state.contractUri}
            placeholder={"Contract URI"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_CONTRACT_URI", payload: value });
            }}
          />

          <Input
            variant="outlined"
            value={state.fundingRecipient}
            placeholder={"Funding Recipient"}
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_FUNDING_RECIPIENT", payload: value });
            }}
          />
        </Stack>
        <Stack spacing={2}>
          <Input
            variant="outlined"
            value={state.royaltyBps}
            placeholder={"Royalty BPS"}
            type="number"
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_ROYALTY_BPS", payload: Number(value) });
            }}
          />

          <Input
            variant="outlined"
            value={state.editionMaxMintable}
            title={"Edition Max Mintable"}
            type="number"
            placeholder={"Edition Max Mintable"}
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_EDITION_MAX_MINTABLE",
                payload: Number(value),
              });
            }}
          />

          <Input
            variant="outlined"
            value={state.editionCutoffTime}
            placeholder={"Edition Cutoff Time"}
            type="number"
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_EDITION_CUTOFF_TIME",
                payload: Number(value),
              });
            }}
          />

          <Input
            variant="outlined"
            value={state.flags}
            placeholder={"Flags"}
            type="number"
            onChange={({ target: { value } }) => {
              dispatch({ type: "SET_FLAGS", payload: Number(value) });
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
