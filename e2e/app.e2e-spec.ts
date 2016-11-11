import { D3Angular2AppPage } from './app.po';

describe('d3-angular2-app App', function() {
  let page: D3Angular2AppPage;

  beforeEach(() => {
    page = new D3Angular2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
