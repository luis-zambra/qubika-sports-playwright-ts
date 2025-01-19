import { Locator, Page } from "playwright";
import { BasePage } from "./base.page";

export class CategoriesPage extends BasePage {
    private categoriesTable: Locator;
    private openCategoryFormButton: Locator;
    private addCategoryForm: Locator;
    private categoryNameInput: Locator;
    private subcategoryCheck: Locator;
    private parentCategoryCombobox: Locator;
    private listbox: Locator;
    private submitNewCategoryButton: Locator;
  
    constructor(page: Page) {
        super(page);
        this.categoriesTable = this.page.locator('tbody');
        this.openCategoryFormButton = this.page.locator('button.btn.btn-primary');
        this.addCategoryForm = this.page.locator('mat-dialog-container[role="dialog"]');
        this.categoryNameInput = this.page.locator('#input-username');
        this.subcategoryCheck = this.page.locator('label.custom-control-label');
        this.parentCategoryCombobox = this.page.locator('div[role="combobox"] input');
        this.listbox = this.page.locator('ng-dropdown-panel[role="listbox"]');
        this.submitNewCategoryButton = this.page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/#/category-type');
    }
    
    async validateCategoriesLoaded(): Promise<boolean> {
        try {
            await Promise.all([
              await this.waitForElementVisible(this.categoriesTable),
            ]);
            return true;
          } catch (error) {
            return false;
        }
    }

    async addNewCategory(categoryName: string, parentCategory: string = '') {
        await this.clickElement(this.openCategoryFormButton);
        await this.waitForElementVisible(this.addCategoryForm);
        await this.fillInput(this.categoryNameInput, categoryName);
        if(parentCategory.length > 0) {
            await this.waitForElementVisible(this.subcategoryCheck);
            await this.clickElement(this.subcategoryCheck);
            await this.waitForElementVisible(this.parentCategoryCombobox);
            await this.fillInput(this.parentCategoryCombobox, parentCategory);
            await this.selectFirstOptionFromDropdown(this.listbox);
        }
        await this.clickElement(this.submitNewCategoryButton);
    }

    async getLastEntryOfCategoriesTable(): Promise<String[]> {
        const lastRow = this.categoriesTable?.locator('tr:last-child');
        await this.waitForElementVisible(lastRow);
        const tds = await lastRow.locator('td').allTextContents();
        const tdCategoryName = tds[0]?.trim();
        const tdParentCategory = tds[1]?.trim();
        return [tdCategoryName, tdParentCategory];
    }
  }