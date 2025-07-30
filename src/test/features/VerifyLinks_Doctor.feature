Feature: Gayathri_10MAY2025_Manage Appointments in Smart Hospital
  Background:
    Given Doctor is logged in to the Smart Hospital system
  @validate_links
  Scenario: Check for broken and valid links on the page
    When the user checks all the links on the page
    Then the user should see which links are broken and which are valid
