#
Feature: Gayathri_20JUL2025_Manage Appointments in Smart Hospital
Background:
    Given Doctor is logged in to the Smart Hospital system
    Given the User navigate to the appointment section
    When Doctor clicks the Add Appointment button
    And Doctor clicks on New Patient button
    
  @ValidTest
  Scenario: Doctor creates a new appointment for a new patient
    And Doctor fills in patient details
    And Doctor clicks the save button
    Then Patient should be added successfully
    When Doctor fills in appointment details
    And Doctor clicks on save button
    Then Appointment should be created successfully

  @InvalidTest
Scenario Outline: Doctor tries to add a new patient with missing <field>
  When Doctor leaves the "<field>" field empty
  And Doctor clicks the save button
  Then "<errorMessage>" message should be displayed

Examples:
  | field | errorMessage                  |
  | Name  | Name field is required        |
  | Year  | Year field is required        |
  | Month | Month field is required       |
  | Day   | Day field is required         |