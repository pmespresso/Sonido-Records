import React, { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EditionConfig, MintConfig, SoundClient } from "@soundxyz/sdk";
import { contractAddresses } from "@soundxyz/sound-protocol";
import { AppContext } from "../contexts/AppContext";
import { MinterType } from "../types";

export const useSound = () => {
  const { connector } = useAccount();
  const { state } = useContext(AppContext);
  const [client, setClient] = useState<SoundClient>();

  useEffect(() => {
    async function initSigner() {
      const signer = await connector?.getSigner();
      const _client = SoundClient({
        signer,
        soundCreatorAddress: contractAddresses.mainnet.soundCreatorV1,
      });
      setClient(_client);
    }
    initSigner();
  }, [connector]);

  const generateProposalPayload = async () => {
    if (!client) return;

    const salt = "0x" + Math.random().toString(16).slice(2);

    const editionConfig: EditionConfig = {
      name: state.songName,
      symbol: state.songSymbol,
      metadataModule: state.metadataModule,
      contractURI: state.contractUri,
      baseURI: state.baseUri,
      fundingRecipient: state.fundingRecipient,
      royaltyBPS: state.royaltyBps,
      editionMaxMintableUpper: state.editionMaxMintable,
      editionMaxMintableLower: 0,
      editionCutoffTime: state.editionCutoffTime,
      shouldFreezeMetadata: false,
      shouldEnableMintRandomness: true,
      enableOperatorFiltering: true,
    };

    const mintConfigs: MintConfig[] = [];

    switch (MinterType[state.minter]) {
      case "RANGE_MINTER":
        mintConfigs.push({
          mintType: "RangeEdition",
          cutoffTime: state.editionCutoffTime,
          minterAddress: contractAddresses.mainnet.rangeEditionMinter,
          price: 0,
          startTime: 0,
          endTime: 0,
          affiliateFeeBPS: 0,
          maxMintableUpper: state.editionMaxMintable,
          maxMintableLower: 0,
          maxMintablePerAccount: 1,
        });
        break;
      default:
        break;
    }
    // Transaction
    const transaction = await client.createEdition({
      editionConfig,
      mintConfigs,
      salt,
    });

    return transaction.raw;
  };

  return { client, generateProposalPayload };
};
