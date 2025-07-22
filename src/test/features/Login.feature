Feature: GOWRI_17JUL2025_LOGIN_FEATURE_In Smart Hospital

  @validInput
  Scenario Outline: Verify login for different roles
    Given the user is on the login page
    When the user selects the role "<role>"
    And the user clicks the Sign In button
    Then the user should see the dashboard page

    Examples:
      | role         |
      | Super Admin  |
      | Admin        |
      | Doctor       |

  @InvalidUserName
  Scenario Outline: Attempt to login with missing username
    Given the user is on the login page
    When the user selects the role "<role>"
    And User leaves the "username" field empty
    And the user clicks the Sign In button
    Then User should see an error message

    Examples:
      | role         |
      | Admin        |
      | Receptionist |
      | Nurse        |

  @InvalidPassword
  Scenario Outline: Attempt to login with missing password
    Given the user is on the login page
    When the user selects the role "<role>"
    And User leaves the "password" field empty
    And the user clicks the Sign In button
    Then User should see an error message

    Examples:
      | role        |
      | Super Admin |
      | Doctor      |
      | Pharmacist  |


  @InvalidUsername_And_Password
  Scenario Outline: Attempt to login with missing username and password
    Given the user is on the login page
    When the user selects the role "<role>"
    And User leaves the "both" field empty
    And the user clicks the Sign In button
    Then User should see an error message

    Examples:
      | role        |
      | Pathologist |
      | Radiologist |
      | Accountant  |
