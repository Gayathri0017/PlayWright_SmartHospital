Feature: Gowri_19JULY2025_Verifying_Social_Media_Links

  Background:
    Given the user is on the application homepage

  @allsocialmediacount
  Scenario: Verifying the total count of social media links
    When the user checks all social media icons in the header
    Then the user should see 7 social media links available

  @facebook
  Scenario: Verify Facebook Link
    When the user click on the "Facebook" link
    Then the user should see the correct Facebook page title

  @twitter
  Scenario: Verify Twitter Link
    When the user click on the "Twitter" link
    Then the user should see the correct Twitter page title

  @youtube
  Scenario: Verify YouTube Link
    When the user click on the "YouTube" link
    Then the user should see the correct YouTube page title

  @gmail
  Scenario: Verify Gmail Link
    When the user click on the "Gmail" link
    Then the user should see the correct Gmail page title

  @linkedin
  Scenario: Verify LinkedIn Link
    When the user click on the "LinkedIn" link
    Then the user should see the correct LinkedIn page title

  @instagram
  Scenario: Verify Instagram Link
    When the user click on the "Instagram" link
    Then the user should see the correct Instagram page title

  @pinterest
  Scenario: Verify Pinterest Link
    When the user click on the "Pinterest" link
    Then the user should see the correct Pinterest page title