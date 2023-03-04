export default function clearLastLineAndPrint(text: string): void {
  process.stdout.write('\x1B[1A\x1B[2K');
  console.log(text);
}
