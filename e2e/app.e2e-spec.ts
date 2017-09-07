import { AnnePage } from './app.po';

describe('anne App', () => {
  let page: AnnePage;

  beforeEach(() => {
    page = new AnnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
