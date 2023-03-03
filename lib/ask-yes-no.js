import readline from 'readline';
import chalk from 'chalk';

export default function askYesNo(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(chalk.blue.bold(`${question} (Y/n)`), (answer) => {
      const ans = (answer || '').toLowerCase();
      const actualAns = ans ? ans : 'y';
      if (['y', 'n'].indexOf(actualAns) === -1) {
        rl.close();
        rejects('Invalid answer');
        return;
      }
      rl.close();
      resolve(actualAns === 'y');
    });
  });
}
