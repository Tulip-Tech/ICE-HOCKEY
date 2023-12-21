import { execSync } from 'child_process';
import { rmSync, unlinkSync } from 'fs';

import { compress } from 'targz';

const startMs = performance.now();
const getFinalMs = () => `${ performance.now() - startMs }ms`;

const BUILD_DIR = 'build/public';
const OUTPUT_FILE_PATH = 'build.tar.gz';

const start = async () => {
  console.log(`
-------------------------------------------------------------------
--- INFO!! This script will build a tar file of the final build ---
-------------------------------------------------------------------
`);

  console.log(`---------- Cleaning directory ----------`);
  try {
	rmSync(BUILD_DIR, { recursive: true, force: true });
	unlinkSync(OUTPUT_FILE_PATH, { recursive: true, force: true });
  } catch (_) {
  }

  console.log(`--------- Running build script ---------`);
  execSync('yarn build', { stdio: 'inherit' });
  const buildMs = getFinalMs();

  console.log(`----------- Creating tar file -----------`);
  const result = await new Promise(resolve => {
	compress({
	  src: BUILD_DIR,
	  dest: OUTPUT_FILE_PATH,
	}, (err) => {
	  if (err) {
		resolve(`Error creating tarball: ${ err }`);
	  } else {
		resolve('Success');
	  }
	});
  });
  console.table({
	Status: result,
	'Build time': buildMs,
	'Total time': getFinalMs(),
  });
};

const cleanup = (error) => {
  console.log('--------------- Cleanup ----------------');
	if (error) console.log(error);
	process.exit(1);
};

start().then(cleanup).catch(cleanup);

process.on('SIGINT', cleanup);
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2', cleanup);
process.on('uncaughtException', cleanup);
