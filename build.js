const fs = require('fs');
const madeIn = require('made-in');

const languages = ['JavaScript', 'Java', 'C#', 'CSS', 'HTML', 'C', 'C++', 'Go', 'Objective-C', 'PHP', 'Python', 'Ruby', 'Rust', 'Scala', 'Swift', 'Shell', 'R'];
const MIN_STARS = 100;
const token = process.env.GITHUB_TOKEN || '';

const row = c => c.stargazers_count + ' | '
  + '[@' + c.owner.login + '](' + c.owner.html_url + ')/'
  + '[**' + c.name + '**](' + c.html_url + ') | '
  + (c.description || '') + ' | '
  + (c.homepage ? '[:arrow_upper_right:](' + c.homepage + ')' : '');

const fetch = language => new Promise((resolve, reject) =>
  madeIn('Taiwan', { language, token }, (err, data) => err ? reject(err) : resolve(data)));

const section = (language, repos) => '### ' + language + '\n\n'
  + ':star2: Stargazers | Name | Description | 🌍\n'
  + '--- | --- | --- | ---\n'
  + repos.map(row).join('\n');

(async () => {
  const main = [];
  const rest = [];
  for (const language of languages) {
    const repos = (await fetch(language)).sort((a, b) => b.stargazers_count - a.stargazers_count);
    const top = repos.filter(c => c.stargazers_count >= MIN_STARS);
    const others = repos.filter(c => c.stargazers_count < MIN_STARS);
    if (top.length) main.push(section(language, top));
    if (others.length) rest.push(section(language, others));
  }
  fs.writeFileSync('README.md', '# Made in Taiwan\n\n> A list of neat projects made in Taiwan\n\n> 🇹🇼 台灣加油！\n\n' + main.join('\n\n') + '\n');
  fs.writeFileSync('OTHERS.md', '# Made in Taiwan (others)\n\n' + rest.join('\n\n') + '\n');
  console.log('done');
})();