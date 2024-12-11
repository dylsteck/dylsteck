"use client";

import sdk, { FrameNotificationDetails } from "@farcaster/frame-sdk";
import React from "react";

export default function FrameProvider({ children }: { children: React.ReactNode }){
    const [addFrameResult, setAddFrameResult] = React.useState<string>("");
    const [isSDKLoaded, setIsSDKLoaded] = React.useState<boolean>(false);
    const [notificationDetails, setNotificationDetails] = React.useState<FrameNotificationDetails | null>(null);

    React.useEffect(() => {
        const load = async () => {
        sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
        setIsSDKLoaded(true);
        load();
        }
    }, [isSDKLoaded]);

    const addFrame = React.useCallback(async () => {
        try {
          setNotificationDetails(null);
          const result = await sdk.actions.addFrame();
          if (result.added) {
            if (result.notificationDetails) {
              setNotificationDetails(result.notificationDetails);
            }
            setAddFrameResult(
              result.notificationDetails
                ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
                : "Added, got no notification details"
            );
          } else {
            setAddFrameResult(`Not added: ${result.reason}`);
          }
        } catch (error) {
          setAddFrameResult(`Error: ${error}`);
        }
      }, []);

    return(
        <>
            {children}
        </>
    )
}