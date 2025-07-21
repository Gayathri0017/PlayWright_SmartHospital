Feature:Gayathri_14_JUL2025_Verify To Do List Functionality in Doctor Login
  Background:
    Given Doctor is logged in to the Smart Hospital system
  Scenario Outline: Add a single task to the To Do List
    When the doctor clicks the calendar
    And clicks the plus icon to add a task
    And fills in the task "<task>" with date "<date>"
    Then the "<expectedResult>" should be visible in the To Do List

    Examples:
      | task                       | date        |expectedResult           |
      | Have to Complete meeting   | 11/08/2025  | Have to Complete meeting|
      # |                            | 25/08/2025  | Title field is required |
