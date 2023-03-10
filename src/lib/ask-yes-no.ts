import readline from 'readline';
import chalk from 'chalk';
import { getProcess } from '@pandazy/mole-core/dist/nodejs/globals';

export default function askYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: getProcess().stdin,
    output: getProcess().stdout,
  });
  return new Promise((resolve, rejects) => {
    rl.question(chalk.blue.bold(`${question} (Y/n)`), (answer) => {
      const ans = (answer || '').toLowerCase();
      const actualAns = ans ?? 'y';
      if (['y', 'n'].indexOf(actualAns) === -1) {
        rl.close();
        rejects(new Error('Invalid answer'));
        return;
      }
      rl.close();
      resolve(actualAns === 'y');
    });
  });
}
