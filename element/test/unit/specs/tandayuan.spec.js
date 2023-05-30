import { createTest, destroyVM } from '../util';
import Tandayuan from 'packages/tandayuan';

describe('Tandayuan', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Tandayuan, true);
    expect(vm.$el).to.exist;
  });
});

