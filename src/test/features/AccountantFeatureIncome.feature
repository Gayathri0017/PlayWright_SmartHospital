Feature: Gowri_19JULY2025_Accountant_Income_Functionalities 
Background:
    Given User launches Smart Hospital website
    When the user selects "Accountant" role
    And the user clicks the Sign In
    Then the user navigates to the finance section and clicks on income
    And the user clicks on Add Income
    
  @ValidInput
  Scenario: Add New Income and Verify
    When the user enters the following income details:
    |header					  |name               |amount |
    |Hospital charges	|Dr.S.Harikumar			|1500.00 |
    And the user clicks the save button
    Then the user verifies that the new income is added to the table
    |amount|
    |1500.00|
    
@InvalidInput
Scenario: Add New Income with Invalid Data
    When the user enters the following income details:
    |header             |name |amount|
    |Hospital charges   |hi   |-52   |
    And the user clicks the save button
    Then the user verifies that the invalid income is not added to the table
    |amount|
    |-52|

