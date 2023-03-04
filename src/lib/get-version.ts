import packageJSON from '../../package.json';

export default function getVersion(): string {
  return packageJSON.version;
}
