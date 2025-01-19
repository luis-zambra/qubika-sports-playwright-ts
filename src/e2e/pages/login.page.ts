import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    private pageTitle: Locator;
    private pageSubtitle: Locator;
    private rememberMeLabel: Locator;
    private rememberMeCheckbox: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
  
    constructor(page: Page) {
        super(page);
        this.pageTitle = this.page.locator('h3');
        this.pageSubtitle = this.page.locator('small');
        this.rememberMeLabel = this.page.locator('label.custom-control-label');
        this.rememberMeCheckbox = this.page.locator('.custom-control-input');
        this.emailInput = this.page.locator('input[formcontrolname="email"]');
        this.passwordInput = this.page.locator('input[formcontrolname="password"]');
        this.submitButton = this.page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/#/auth/login');
    }
    
    async validateLoginPageLoaded(): Promise<boolean> {
        try {
            await Promise.all([
                await this.waitForElementVisible(this.pageTitle),
                await this.waitForElementVisible(this.pageSubtitle),
                await this.waitForElementVisible(this.rememberMeLabel),
                await this.waitForElementVisible(this.rememberMeCheckbox),
                await this.waitForElementVisible(this.emailInput),
                await this.waitForElementVisible(this.passwordInput),
                await this.waitForElementVisible(this.submitButton)
            ]);
            return true;
          } catch (error) {
            return false;
        }
    }

    async login(email: string, password: string) {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.submitButton);
    }
  }