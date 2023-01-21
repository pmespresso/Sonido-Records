import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { SoundClient } from "@soundxyz/sdk";

export const useSound = () => {
  const { connector } = useAccount();
  const [client, setClient] = useState<SoundClient>();

  useEffect(() => {
    async function initSigner() {
      const signer = await connector?.getSigner();
      const _client = SoundClient({
        signer,
      });
      setClient(_client);
    }
    initSigner();
  }, [connector]);

  return client;
};
