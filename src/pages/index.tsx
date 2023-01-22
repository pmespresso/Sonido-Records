import { ConnectButton } from "@rainbow-me/rainbowkit";
import Stack from "@mui/joy/Stack";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Sheet } from "@mui/joy";
import Image from "mui-image";
import { useAccount } from "wagmi";

import bg1 from "../images/bg_1.png";
import bg2 from "../images/bg_2.png";
import bg3 from "../images/bg_3.png";
import bg4 from "../images/bg_4.png";
import { useSound } from "../hooks/useSound";
import { Reducer, useReducer } from "react";
import { UploadMusicInputGroup } from "../components/UploadMusic";
import { SongEditionInput } from "../components/SongEditionInput";
import { SelectMinter } from "../components/SelectMinter";
import { Action, initialState, reducer, State } from "../state";
import { Heading } from "../components/Heading";
import { Review } from "../components/Review";

// @ts-ignore
const useStyles = makeStyles({
  activityArea: {
    padding: "20px 20px",
    height: "100vh",
  },
  actions: {
    position: `absolute !important` as any,
    bottom: "20px",
    width: "100%",
    padding: "0 30px 0 0",
  },
});

function Page() {
  const { isConnected } = useAccount();
  const classes = useStyles();
  const client = useSound();

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const handleBack = () => {
    if (state.step > 0) {
      dispatch({ type: "STEP_BACKWARD" });
    }
  };

  const handleNext = () => {
    if (state.step < 3) {
      dispatch({ type: "STEP_FORWARD" });
    }
  };

  return (
    <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
      <Grid lg={4}>
        <Sheet className={classes.activityArea}>
          <Stack spacing={4}>
            <Stack>
              <ConnectButton />
            </Stack>
            <Sheet>
              <Heading />
              {state.step === 0 ? (
                <UploadMusicInputGroup state={state} dispatch={dispatch} />
              ) : state.step == 1 ? (
                <SongEditionInput state={state} dispatch={dispatch} />
              ) : state.step == 2 ? (
                <SelectMinter state={state} dispatch={dispatch} />
              ) : state.step == 3 ? (
                <Review />
              ) : null}
            </Sheet>
          </Stack>

          <Stack
            direction="row"
            justifyContent={"space-between"}
            className={classes.actions}
          >
            {state.step != 0 ? (
              <Button
                color="neutral"
                variant="outlined"
                fullWidth={false}
                size={"md"}
                onClick={handleBack}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              color="info"
              variant="outlined"
              fullWidth={false}
              size={"md"}
              endDecorator={state.step == 3 ? "🔥" : null}
              onClick={handleNext}
            >
              {state.step == 3 ? "Submit" : "Next"}
            </Button>
          </Stack>
        </Sheet>
      </Grid>
      <Grid lg={8}>
        <Image
          src={
            state.step == 0
              ? bg1.src
              : state.step == 1
              ? bg2.src
              : state.step == 2
              ? bg3.src
              : state.step == 3
              ? bg4.src
              : ""
          }
          alt="bg_1.png"
          height="100vh"
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
