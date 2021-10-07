import { Registry } from '../src';

const Foo = () => {};
const Bar = (x: string) => x;

/* eslint-disable @typescript-eslint/no-unused-vars */
describe('Registry', () => {
  describe('basic usage', () => {
    it('create without initial value', () => {
      const r = new Registry();
    });

    it('create with initial value', () => {
      const r = new Registry({ Foo });
    });

    it('get saved instance', () => {
      const r = new Registry({ Foo });
      expect(r.get('Foo')).toBe(Foo);
    });

    it('save instance type', () => {
      const r = new Registry({ Foo, Bar });
      const x: typeof Foo = r.get('Foo');
    });
  });

  describe('extend registry', () => {
    it('can extend registry', () => {
      const r = new Registry({ Foo });
      r.extend({ Bar });
    });

    it('extend then get instance', () => {
      const r = new Registry({ Foo });

      const y = r.extend({ Bar }).get('Bar');
      expect(y).toBe(Bar);
    });

    it('save type when extends', () => {
      let r1 = new Registry({ Foo }).extend({ Bar });

      const y: typeof Bar = r1.get('Bar');
    });
  });
});
