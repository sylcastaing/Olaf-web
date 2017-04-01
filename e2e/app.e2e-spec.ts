import { OlafPage } from './app.po';

describe('olaf App', () => {
  let page: OlafPage;

  beforeEach(() => {
    page = new OlafPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
