export enum MinterType {
  EDITION_MAX_MINTER,
  RANGE_MINTER,
  MERKLE_DROP_MINTER,
  FIXED_PRICE_SIGNATURE_MINTER,
  NULL,
}

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
  step: number;
  minter: MinterType;
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
  | { type: "SET_FLAGS"; payload: number }
  | { type: "STEP_FORWARD" }
  | { type: "STEP_BACKWARD" }
  | { type: "SELECT_MINTER"; payload: MinterType };

export const initialState = {
  step: 2,
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
  minter: MinterType.NULL,
};

export const reducer = (state: State, action: Action) => {
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
    case "STEP_FORWARD":
      return { ...state, step: state.step + 1 };
    case "STEP_BACKWARD":
      return { ...state, step: state.step - 1 };
    case "SELECT_MINTER":
      return { ...state, minter: action.payload };
    default:
      return state;
  }
};
