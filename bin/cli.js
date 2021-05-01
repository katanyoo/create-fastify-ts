#! /usr/bin/env node
const inquirer = require('inquirer');
var handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')
const execa = require('execa');
const Listr = require('listr');

// const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
  .then(async answers => {
    const projectName = answers['project-name']
    const templatePath = `${__dirname}/../templates/fastify-app`
    let dir = `${CURR_DIR}/${projectName}`

    const tasks = new Listr([
      {
        title: '🔍 Copying project',
        task: async () => {
          fs.mkdirSync(dir)
          await createDirectoryContents(templatePath, projectName, answers)
        }
      },
      {
        title: '📦 Install npm dependencies',
        task: async () => {
          const options = { cwd: dir };
          await execa('npm', ['install'], options);
        }
      },
      {
        title: '🔥 Git intialize',
        task: async () => {
          const options = { cwd: dir };
          await execa('git', ['init'], options);
          await execa('husky', ['install'], options);
        }
      }
    ]);

    tasks.run().catch(err => {
      console.error(err);
    });
    // const dir_tree = tree(dir, {});
    // console.log(dir_tree)

    // spinner.start();

    // const dependencies = await getDependencies();
    // console.log(dependencies)
    // await installDependencies(projectName, dependencies, spinner);

    // spinner.succeed(chalk`{green Complete setup project}`)
  });

function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

// async function getDependencies() {
//   return npm;
// }


async function createDirectoryContents(templatePath, newProjectPath, answers) {
  const filesToCreate = fs.readdirSync(templatePath);

  await Promise.all(filesToCreate.map(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {

      const contents = fs.readFileSync(origFilePath, 'utf8');
      let out = contents
      let filename = file

      if (path.extname(file) === '.hbs') {
        out = renderToString(contents, answers)
        filename = file.split('.').slice(0, -1).join('.')
      }

      const writePath = `${CURR_DIR}/${newProjectPath}/${filename}`;
      fs.writeFileSync(writePath, out, 'utf8');


    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  }))
}

async function installDependencies(destination, { save, dev }, spinner) {
  const options = { cwd: destination };

  spinner.text = 'Install dependencies...';
  await asyncExec('npm i -s ' + save, options);

  spinner.text = 'Install devDependencies...';
  await asyncExec('npm i -D ' + dev, options);
}
