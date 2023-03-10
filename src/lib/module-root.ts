import path from 'path';

const LibRoot = path.resolve(__dirname, '../../');

export default function getModuleRoot(): string {
  return LibRoot;
}
