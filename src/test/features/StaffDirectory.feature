Feature: Dhanush_21JULY2025_Display the Staff Details

Background:
  Given Doctor is logged in to the Smart Hospital system
@StaffDetails
Scenario: Displaying the Staff details
	And the Doctor clicks the human resource button
	When the Doctor clicks the list view
	Then the Doctor can able to visible the staff available
	