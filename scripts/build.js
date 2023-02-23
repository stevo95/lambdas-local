'use strict';

const fs            = require('fs');
const path          = require('path');
const { promisify } = require('util');
const { exec }      = require('child_process');

const execAsync = promisify(exec);

// Paths
const rootFolder   = process.cwd();

// Initialize Project Dir paths
const tsConfigFile = path.join(rootFolder, 'tsconfig.json');
const lambdasDir   = path.join(rootFolder, 'layers');
const layersDir    = path.join(rootFolder, 'layers');

// Initialize Build Dir paths
const buildDirRoot    = path.join(rootFolder, 'build');
const npmDepsLayer    = path.join(buildDirRoot, 'layers', 'lambdas_example_npm_packages', 'nodejs', 'node_modules');

// Validate path
if (!fs.existsSync(lambdasDir) || !fs.existsSync(layersDir)) {
  throw new Error(
    `Cannot find directory.`
  );
}

// Remove build directory if already exists
if (fs.existsSync(buildDirRoot)) {
  fs.rmdirSync(buildDirRoot, { recursive: true, force: true });
}

// Build app commands
const commands = {
  installProdDeps:   `npx yarn install --production --modules-folder ${npmDepsLayer}`,
  compileTypescript: `npx tsc --project ${tsConfigFile}`,
};

const build = async(cmds) => {
  try {
    const installResult = await execAsync(cmds.installProdDeps);
    console.log(installResult.stdout);
    const compileResult = await execAsync(cmds.compileTypescript);
    console.log(compileResult.stdout);
  } catch (e) {
    console.error(e);
  }
}

build(commands);
