import { PackageJSON } from './read-user-package-json';

export type SpecialConvert = (script: string) => string;

export interface ExtractForUserScriptsOptions {
  excludes?: Set<string>;
  specials?: Record<string, SpecialConvert>;
}

export default function extractForUserScripts(
  rawPackageJSON: PackageJSON,
  { excludes, specials }: ExtractForUserScriptsOptions
): Record<string, string> {
  const packageJSON = rawPackageJSON as { scripts: Record<string, string> };

  return Object.entries(packageJSON.scripts).reduce((nextScripts, [key, value]) => {
    if (excludes?.has(key)) {
      return nextScripts;
    }

    const specialConvert = specials && key in specials ? specials[key] : undefined;
    const nextVal = specialConvert ? specialConvert(value) : value;
    return {
      ...nextScripts,
      [key]: nextVal,
    };
  }, {});
}
