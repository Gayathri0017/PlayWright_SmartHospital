Feature: Gowri_21JULY2025_Accountant_Dashboard_Functionalities
Background: 
    Given User launches the Smart Hospital application
    When the user selects role "Accountant"
    And the user clicks the Sign In buttons
    Then User should see the dashboard summary table
    

@ValidInput
Scenario: Add New Expense and Verify
And User should capture and print the data from dashboard table section this should be stored in the excel for reference
    And then need enter to the Expenses
    Then need click Add Expenses
    Then need to give the Header as "Telephone Bill", name "Office Telephone Charges" and amount "100.00"
    And the user click the save
    Then User should see the dashboard summary table
    And User should capture and print the data from dashboard table section this should be stored in the excel for reference

@InvalidInput
Scenario Outline: Add New Expense with Invalid Data
    And then need enter to the Expenses
    Then need click Add Expenses
    Then need to give the Header as "<header>", name "<name>" and amount "<amount>"
    And the user click the save

    Examples:
      |header          |name                     |amount       |
      |Telephone Bill  |Office Telephone Charges |-100.00      |
      |Telephone Bill  |hi                       |-52|