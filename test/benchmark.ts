import benchmark from 'benchmark';
import rgbHex from 'rgb-hex';

import { rgbToHex } from '../src';

const suite = new benchmark.Suite();

suite
  .add('colors', () => {
    rgbToHex('rgb(255,255,255)');
  })
  .add('rgb-hex', () => {
    rgbHex(255, 255, 255);
  })
  .on('cycle', function (event: benchmark.Event) {
    console.log(String(event.target));
  })
  .on('complete', function (this: benchmark.Suite) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
