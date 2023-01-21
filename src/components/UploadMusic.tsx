// react component that lets user upload music files to IPFS

import { Button, Input, Stack, Typography } from "@mui/joy";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import pinataSDK from "@pinata/sdk";
import * as dotenv from "dotenv";
import { createReadStream } from "fs";

import { Action, State } from "../pages";

dotenv.config();

const pinata = new pinataSDK({
  pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY,
  pinataSecretApiKey: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
});

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

export function UploadMusicInputGroup({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) {
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLoadFile = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    if (!files || !files[0]) {
      setIsError(true);
      setIsUploading(false);
      return;
    } else {
      console.log(files[0].name);
      setFile(files[0]);
      setIsUploading(false);
    }
  };

  // take the file from the input and upload it to IPFS
  const handleUploadFile = async () => {
    console.log("handleUploadFile : ", file?.name, file?.size);
    if (!file) {
      setIsError(true);
      return;
    }
    try {
      setIsError(false);
      setIsUploading(true);

      const response = await pinata.pinFileToIPFS(file.stream(), {
        pinataMetadata: {
          name: file.name,
        },
        pinataOptions: {
          cidVersion: 0,
        },
      });

      console.log(response);

      if (response.IpfsHash) {
        setIsSuccess(true);
        setIsUploading(false);
      }
    } catch (e) {
      console.log(e);
      setIsSuccess(false);
      setIsError(true);
      setIsUploading(false);
    }
  };
  return (
    <Stack>
      <Typography textColor="neutral.500" fontSize="md" fontWeight="sm">
        Step 1. Upload
      </Typography>
      <Stack direction={"row"} spacing={12} alignItems="flex-end">
        <Input
          type="file"
          size="lg"
          variant="solid"
          onChange={handleLoadFile}
          endDecorator={
            <Button
              loading={isUploading}
              color="info"
              size="lg"
              variant="outlined"
              onClick={handleUploadFile}
              disabled={!file}
              style={{
                height: 50,
              }}
            >
              {isSuccess ? <DoneIcon /> : "Upload"}
            </Button>
          }
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Stack>
      {isError && <Typography color="danger">Something went wrong</Typography>}
    </Stack>
  );
}
