Feature: Login with the Patient Login Credentials
  
  Background: 
  Given the User is on the Login Page
 	# When the User clicks the User Login 
 		
 		
  @LoginIntoPatient
  Scenario: To check Login as patient 
  And the User clicks the Sign In button
  Then the User is directed to the patient dashboard

  @LoginWithInvalidUsername
  Scenario: To check with Invalid username for patient
  
  When the User Provides invalid Username
  And the User clicks the Sign In button
  Then the User able to see the errorMessage as "<errormsg>"
  |errormsg						|
  |Username field is required	|
  
  @LoginWithInvalidPassword
  Scenario: To check with Invalid password for patient
  
  When the User Provides invalid Password
  And the User clicks the Sign In button
  Then the User able to see the errorMessage as "<errormsg>"
  |errormsg						|
  |Password field is required	|