@Patient
Feature: Dhanush_21JULY2025_Booking appointment using patient Login

Background:
	Given the User is on the Login Page
  When the User clicks the Sign In button
  Then the User is able to click the my appointment button
  And the User is able to see the add appointment option 

@BookingAppointment  
Scenario: Appointment booking for patient
	And the User can fill the appointment form 
  And the User should save the form for appointment
  And the User is able see the success message "Record Saved Successfully"
  
@BookingWithDateEmptyField
Scenario Outline: Patient booking with date as empty field
	And the User can fill the appointment 
	|Date				|Specialist				|Doctor							|Shift				|Timing								|AvailableTiming		|Message																																								|
	|<Date>				|<Specialist>			|<Doctor>						|<Shift>			|<Timing>							|<AvailableTiming>	    |<Message>																																							|
	And the User should save the form for appointment					
	And the User can able to see the error msg "Date field is required"
	Examples:
	|Date					|Specialist			|Doctor				|Shift				|Timing								|AvailableTiming		|Message																																								|
	| 						|Cardiologists		|Sansa Gomez (9008)	|Evening			|04:00 PM - 07:00 PM	|04:00 PM						|I would like to schedule a routine heart check-up to monitor my cardiovascular health.	|	
	| 						|Dermatologists		|Reyan Jain (9011)	|Evening			|04:00 PM - 07:00 PM	|04:00 PM						|I would like to schedule a routine dermatological check-up to monitor my skin health		|	
	
@BookingWithMessageEmptyField
Scenario: Patient booking with message as empty field
	And the User can fill the appointment 
	|Date			|Specialist			|Doctor				|Shift				|Timing					|AvailableTiming		|Message		|
	|08/18/2025		|Cardiologists		|Sansa Gomez (9008)	|Evening			|04:00 PM - 07:00 PM	|04:00 PM				|				|
	And the User should save the form for appointment	
	And the User can able to see the error msg "Message field is required"
