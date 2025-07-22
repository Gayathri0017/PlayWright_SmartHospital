
Feature: Gayathri_10JUL2025_Search Patient by Name In Smart Hospital
Background:
  Given Doctor is logged in to the Smart Hospital system
  @Verify_Search
  Scenario Outline: Verify the Search of patient
    When the Doctor enters "<patientName>" in the search bar
    And clicks the search button
    Then the system should Show the "<expectedResult>"
    
    Examples:
      | patientName | expectedResult            |
      | Ellie Groves| Ellie Groves              |
      | TestXYZ123  | No data available in table|