/*NOTE
This .do file sample is part of the Conjoint Analysis field plug-in created by and for SurveyCTO. Take a look at the following resources for more information:

Field plug-in repo - https://github.com/surveycto/conjoint
Supporting article - https://support.surveycto.com/hc/en-us/articles/19564034894867
*/

/*OVERVIEW

If you are a Stata user, you might need to reshape your data to be able to use the conjoint (Stata) commands.

In this .do file, you can find the guidelines to use your conjoint analysis data in Stata.
*/

/*GUIDELINES*/

*1. Export your data in LONG format (using the Export tab or SurveyCTO Desktop)

*2. Import your repeat group data (“Form Title-repeat group.csv”) into Stata. [Note: Adjust file pathname with your directory]
import delimited using "/Sample - Conjoint Analysis-sandwich_group-conjoint_repeat.csv"

*3. Drop unecessary variables (optional)
drop conjoint_response key setofconjoint_repeat

*4. Reshape from wide to long so that each row represents a profile
reshape long bread protein veggie selected, i(unique_id) j(profile)

*5. Ensure that attributes are numeric
destring bread, replace
destring protein, replace
destring veggie, replace

*6. Use the conjoint command (it should be installed from within Stata by typing "ssc install conjoint"). Below is an example to estimate AMCEs using all attributes in the Conjoint Analysis sample form:
conjoint selected bread protein veggie, est(amce)

/*If you would like to include more details related to the respondent in your dataset, you will need to merge data from the main dataset (“Form Title.csv”) with the repeat group dataset (“Form Title-repeat group.csv”) based on the ID variable “resp_id”.*/
