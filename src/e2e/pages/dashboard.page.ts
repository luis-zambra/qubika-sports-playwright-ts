import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
    private sidebar: Locator;
    private categoriesLink: Locator;
  
    constructor(page: Page) {
        super(page);
        this.sidebar = this.page.locator('#sidenav-collapse-main');
        this.categoriesLink = this.page.locator('a[href="#/category-type"]');
    }

    async goto() {
        await this.page.goto('/#/dashboard');
    }
    
    async validateDashboardLoaded(): Promise<boolean> {
        try {
            await Promise.all([
              await this.waitForElementVisible(this.sidebar),
            ]);
            return true;
          } catch (error) {
            return false;
        }
    }

    async navigateToCategories() {
        await this.clickElement(this.categoriesLink);
    }
  }