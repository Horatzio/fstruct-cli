import test from 'ava';
import { runCli } from './util';

test('CLI generates folder structure', async (t) => {
  const { stdout, stderr } = await runCli(['--root', 'test-output', '--structure', '{"src": {"index.js": ["console.log(\'Hello, world!\');"]}}']);
  t.is(stderr, '');
  t.is(stdout, '');
  // Add assertions to check that the folder structure was generated correctly
});

test('CLI throws an error if the structure is invalid', async (t) => {
  const { stdout, stderr } = await runCli(['--root', 'test-output', '--structure', '{"src": {"index.js": ["console.log(\'Hello, world!\');"]}}', '--exclude', '*.js']);
  t.is(stdout, '');
  t.true(stderr.includes('Error: Invalid structure'));
});