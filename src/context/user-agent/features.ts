import UAParser from "ua-parser-js";
import type { UserAgent } from "./types";

export const parseUserAgent = (userAgent: string | undefined): UserAgent => {
  if (!userAgent) {
    return {};
  }

  const ua = new UAParser(userAgent);
  const raw = ua.getUA();
  const browser = ua.getBrowser();
  delete browser.major;
  const engine = ua.getEngine();
  const os = ua.getOS();
  const device = ua.getDevice();

  return {
    raw,
    browser,
    engine,
    os,
    device,
  };
};
