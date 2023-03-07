/**
 * Prints a message to the console.
 * Use this to print messages to the console instead of console.log directly.
 * So we can distinguish the intentional prints from temporary debugging prints.
 * @param args - The message to print.
 */
export function print(...args: unknown[]): void {
  console.log(...args);
}

export function clearLastLineAndPrint(text: string): void {
  process.stdout.write('\x1B[1A\x1B[2K');
  print(text);
}
