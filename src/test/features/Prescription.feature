Feature: Gayathri_21JUL2025_Doctor add Prescription for the Feature in Smart Hospital
Background:
	Given Doctor is logged in to the Smart Hospital system
	When the Doctor Navigates to the OPD section
  @Negative_Prescription_Validation
	Scenario Outline: Doctor tries to submit prescription with missing fields
	  And Clicks the Add Prescription
	  When the doctor fills the prescription form with:
	    |Medicine Category| Medicine  | Dose      | Dose Interval    | Dose Duration |
	    |<Category>       | <Medicine>| <Dose>    | <Interval>       | <Duration>    |
	  And Clicks Save button
	  Then the system should show an error "<ErrorMessage>"

Examples:
  | Category| Medicine | Dose     | Interval        | Duration | ErrorMessage                                                   |
  | Select  | Select   | Select   |  Select         | Select   | Please select any one pathology, radiology or medicine details |
  | Syrup   | Select   | Select   |  Only one a day | Morning  | Medicine field is required                                     |
  | Syrup   | Select   | 1 (CT)   | Only one a day  | Morning  | Medicine field is required                                     |

  @Positive_Prescription_Validation
  Scenario: verify the prescription feature by providing valid informations
  		And Clicks the Add Prescription
  		Then the doctor should navigate to the Prescription Page
    	When the doctor Fill the valid Details:
    	|Finding Category| Medicine Category|Medicine|Dose Interval |Dose Duration|
    	|Syrup			 | Alprovit         |1  (CT) |Only one a day|Morning      |
    	And Clicks Save button
    	Then the Prescription should be added in OPD Section
  