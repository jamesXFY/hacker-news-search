import { AppPage } from './app.po';
import { browser, by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    page.navigateTo();
    await browser.waitForAngularEnabled(false)
  });

  it('should have search element', () => {
    var firstNumber = element(by.className('search-area'));
    expect(firstNumber).toBeTruthy()
  });
});
