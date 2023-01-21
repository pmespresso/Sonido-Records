import React, { useState } from "react";
import { Grid, Sheet, Stack, Typography } from "@mui/joy";

import { Action, State } from "../pages";

function MinterOption({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Grid lg={3}>
      <Sheet>
        <Typography textColor="neutral.500" fontSize="lg" fontWeight="lg">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Sheet>
    </Grid>
  );
}

export function SelectMinter({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <Stack>
      <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
        3. Configure Minter
      </Typography>
      <Grid container spacing={4} direction="row">
        <MinterOption
          title="Edition Max Minter"
          description="A minimalist fixed-price public minting module. Can implement
            single-schedule range mints."
        />

        <MinterOption
          title="Range Minter"
          description="A minter that enables multiple schedules of fixed-price mints with amaximum mintable supply that drops from a upper bound to a lower
            bound after a defined cutoff time."
        />

        <MinterOption
          title="Fixed Price Signature Minter"
          description="A minter that enables permissioned mints via ECDSA signatures."
        />

        <MinterOption
          title="Merkle Drop Minter"
          description="A minter that enables permissioned mints via Merkle proofs."
        />
      </Grid>
    </Stack>
  );
}
