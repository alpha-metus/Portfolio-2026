import { AppContext } from "next/app";
import { createContext, useContext, useEffect, useState } from "react";

const getUserAgent = (context: AppContext): string => {
  if (context.ctx.req?.headers["user-agent"]) {
    return context.ctx.req.headers["user-agent"];
  }

  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return navigator.userAgent;
  }

  return "";
};

const isMobileDevice = (userAgent: string): boolean => {
  return /iPhone|Android|BlackBerry|Opera Mini|IEMobile|Mobile/i.test(
    userAgent
  );
};

const isTabletDevice = (userAgent: string): boolean => {
  return /iPad|Tablet|Nexus 7|Nexus 10|Kindle/i.test(userAgent);
};

export const getSSRDeviceType = (context: AppContext) => {
  const userAgent = getUserAgent(context);

  return {
    isSsrMobile: isMobileDevice(userAgent) && !isTabletDevice(userAgent),
    isSsrTablet: isTabletDevice(userAgent),
  };
};

type SSRDevice = {
  isSsrMobile: boolean;
  isSsrTablet: boolean;
};

export const SSRDeviceContext = createContext<SSRDevice>({
  isSsrMobile: false,
  isSsrTablet: false,
});

const useSSRDevice = () => {
  const device = useContext(SSRDeviceContext);
  return device;
};

export const useIsMobile = () => {
  const { isSsrMobile } = useSSRDevice();
  const [isWindowMobile, setIsWindowMobile] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);

    const handleResize = () => {
      setIsWindowMobile(
        window.matchMedia("only screen and (max-width: 1050px)").matches
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!hydrated) {
    return isSsrMobile;
  }

  return isWindowMobile;
};

export const useIsDesktop = () => {
  const { isSsrTablet } = useSSRDevice();
  const [isWindowTablet, setIsWindowTablet] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);

    const handleResize = () => {
      setIsWindowTablet(
        window.matchMedia("only screen and (min-width: 1051px)").matches
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!hydrated) {
    return isSsrTablet;
  }

  return isWindowTablet;
};
