import type UAParser from "ua-parser-js";

export interface UserAgent {
  raw?: string;
  browser?: Omit<UAParser.IBrowser, "major">;
  engine?: UAParser.IEngine;
  os?: UAParser.IOS;
  device?: UAParser.IDevice;
}

export const OS = {
  any: -1,
  none: 0,
  undefined: 0x1,
  Android: 0x2,
  iOS: 0x4,
} as const;

export const Platforms = {
  any: -1,
  none: 0,
  undefined: 0x1,
  Web: 0x2,
  App: 0x4,
} as const;
