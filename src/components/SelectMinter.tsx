import React, { useContext } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/joy";
import DoneIcon from "@mui/icons-material/Done";

import { SubHeading } from "./SubHeading";
import { MinterType } from "../types";
import { AppContext } from "../contexts/AppContext";

function MinterOption({
  title,
  description,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  isSelected: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300 ease-in-out hover:cursor-pointer"
      row
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.body" }}
      onClick={onClick}
    >
      <CardContent sx={{ px: 2 }}>
        <Stack direction="row">
          <Typography fontWeight="md" fontSize={"lg"} textColor="info" mb={0.5}>
            {title}
          </Typography>
          {isSelected && (
            <DoneIcon color="primary" className="ml-12 h-20 w-20" />
          )}
        </Stack>
        <Typography level="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

export function SelectMinter() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <Stack>
      <SubHeading text={"3. Configure Minter"} />
      <Stack spacing={4}>
        <MinterOption
          title="Edition Max Minter"
          description="A minimalist fixed-price public minting module. Can implement
            single-schedule range mints."
          isSelected={state.minter == MinterType.EDITION_MAX_MINTER}
          onClick={() => {
            dispatch({
              type: "SELECT_MINTER",
              payload: MinterType.EDITION_MAX_MINTER,
            });
          }}
        />

        <MinterOption
          title="Range Minter"
          description="A minter that enables multiple schedules of fixed-price mints with amaximum mintable supply that drops from a upper bound to a lower
            bound after a defined cutoff time."
          isSelected={state.minter == MinterType.RANGE_MINTER}
          onClick={() => {
            dispatch({
              type: "SELECT_MINTER",
              payload: MinterType.RANGE_MINTER,
            });
          }}
        />

        <MinterOption
          title="Fixed Price Signature Minter"
          description="A minter that enables permissioned mints via ECDSA signatures."
          isSelected={state.minter == MinterType.FIXED_PRICE_SIGNATURE_MINTER}
          onClick={() => {
            dispatch({
              type: "SELECT_MINTER",
              payload: MinterType.FIXED_PRICE_SIGNATURE_MINTER,
            });
          }}
        />

        <MinterOption
          title="Merkle Drop Minter"
          description="A minter that enables permissioned mints via Merkle proofs."
          isSelected={state.minter == MinterType.MERKLE_DROP_MINTER}
          onClick={() => {
            dispatch({
              type: "SELECT_MINTER",
              payload: MinterType.MERKLE_DROP_MINTER,
            });
          }}
        />
      </Stack>
    </Stack>
  );
}
