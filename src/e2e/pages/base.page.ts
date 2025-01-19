import { Page, Locator } from '@playwright/test';
import { SHORT_TIMEOUT } from '../../utils';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
      this.page = page;
    }

    async highlightElement(locator: Locator): Promise<void> {
      try {
        await locator.evaluate((el: HTMLElement) => {
          el.style.border = '5px solid #DBFF33';
          setTimeout(() => {
            el.style.border = '';
          }, 1000)
        });
      } catch (error) {
        console.error('The element could not be highlighted', error);
      }
    }

    async probeCondition(
      condition: () => boolean, 
      action: () => void, 
      timeout: number
    ): Promise<void> {
      return new Promise((resolve, reject) => {
          const intervalTime = 500;
          const intervalId = setInterval(() => {
              action();     
              if (condition()) {
                  clearInterval(intervalId);
                  resolve();
              }
          }, intervalTime);
          setTimeout(() => {
              clearInterval(intervalId);
              reject(new Error(`Timed out after probing condition for ${timeout}ms.`));
          }, timeout);
      });
    }

    async waitForElementVisible(locator: Locator, timeout: number = SHORT_TIMEOUT): Promise<void> {
      await locator.waitFor({ state: 'visible', timeout });
    }

    async clickElement(locator: Locator): Promise<void> {
      await this.waitForElementVisible(locator);
      await this.highlightElement(locator);
      await locator.click();
    }

    async fillInput(locator: Locator, text: string): Promise<void> {
      await this.waitForElementVisible(locator);
      await this.highlightElement(locator);
      await locator.fill(text);
    }

    async getText(locator: Locator): Promise<string> {
      await this.waitForElementVisible(locator);
      await this.highlightElement(locator);
      return await locator.innerText();
    }

    async selectFirstOptionFromDropdown(dropdownPanel: Locator): Promise<void> {
      await this.waitForElementVisible(dropdownPanel);
      const firstOption = dropdownPanel.locator('div[role="option"]').first();
      await this.clickElement(firstOption);
    }

    async navigateToLastPageOfTable() {
      const lastPageItem = this.page.locator('.pagination .page-item:not(.disabled):nth-last-child(2) .page-link');
      const pageNumber = await lastPageItem.textContent();
      let activatePageItem;
      await lastPageItem.scrollIntoViewIfNeeded();
      await this.clickElement(lastPageItem);
      // Evaluate that last page item is the active page item
      let isLastPageItemActive = false;
      try {
        await this.probeCondition(
          () => isLastPageItemActive,
          async () => {
            activatePageItem = this.page.locator('.pagination .page-item.active .page-link');
            const activePageNumber = await activatePageItem.textContent();
            isLastPageItemActive = activePageNumber === pageNumber;
          }, 3000);
      } catch(error) {
        if(error instanceof Error) {
          console.error(error.message);
        }
      }
    }
}