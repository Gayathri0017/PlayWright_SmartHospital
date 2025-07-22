@Patient
Feature: Dhanush_20JULY2025_Patient_Charge_Details
  
  Background: 
    Given the User is on the Login Page
  	And the User clicks the Sign In button
  	When the User is directed to the patient dashboard
  	Then the User clicks Ipd button 
  	
  @ChargeDetails
  Scenario: To view the chareg details of the patient
  	And the User Clicks the charge btn
  	And the User is able to see the charge details of the patient
  	And verify the amount for total charges