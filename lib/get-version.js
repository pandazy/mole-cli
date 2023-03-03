import packageJSON from '../package.json' assert { type: 'json' };

export default function getVersion() {
  return packageJSON.version;
}
