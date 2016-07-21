
const madeIn = require('made-in');

madeIn('Taiwan', {
language: 'Java',
token : ''
}, (err, data) => {
console.log(err || data.map(c =>
  c.stargazers_count + '|'
  + '[@' + c.owner.login + ']'
  + '(' + c.owner.html_url + ')/'
  + '[**' + c.name + '**]'
  + '(' + c.html_url + ') |'
  + c.description + '|'
  + (c.homepage ? '[:arrow_upper_right:](' + c.homepage+ ')' : '') ).join("\n"));
});

// example
// 4449 | [@sergeche](https://github.com/sergeche)/[**emmet-sublime**](https://github.com/sergeche/emmet-sublime)
// | Emmet for Sublime Text | [:arrow_upper_right:](http://emmet.io)
