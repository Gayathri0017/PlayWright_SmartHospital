@SocialMedia
Feature: Gowri_29APR2025_Verifying_Social_Media_Links

  Background:
    Given the user is on the application homepage

  @allsocialmediacount
  Scenario: Verifying the total count of social media links
    When the user checks all social media icons in the header
    Then the user should see 7 social media links available

  @facebook
  Scenario: Verify Facebook Link
    When the user clicks on the "Facebook" link
    Then the user should be navigated to the correct "https://www.facebook.com/login" URL

  @twitter
  Scenario: Verify Twitter Link
    When the user clicks on the "Twitter" link
    Then the user should be navigated to the correct "https://x.com" URL

  @youtube
  Scenario: Verify YouTube Link
    When the user clicks on the "YouTube" link
    Then the user should be navigated to the correct "https://accounts.google.com/" URL

  @gmail
  Scenario: Verify Gmail Link
    When the user clicks on the "Gmail" link
    Then the user should be navigated to the correct "https://workspaceupdates.googleblog.com/2023/04/new-community-features-for-google-chat-and-an-update-currents%20.html" URL

  @linkedin
  Scenario: Verify LinkedIn Link
    When the user clicks on the "LinkedIn" link
    Then the user should be navigated to the correct "https://www.linkedin.com/uas/login?_l=en" URL

  @instagram
  Scenario: Verify Instagram Link
    When the user clicks on the "Instagram" link
    Then the user should be navigated to the correct "https://www.instagram.com/accounts/login/" URL

  @pinterest
  Scenario: Verify Pinterest Link
    When the user clicks on the "Pinterest" link
    Then the user should be navigated to the correct "https://in.pinterest.com/" URL
