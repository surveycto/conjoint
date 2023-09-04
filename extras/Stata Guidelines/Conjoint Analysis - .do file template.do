/*NOTE
This .do file sample is part of the Conjoint Analysis field plug-in created by and for SurveyCTO. Take a look at the following resources for more information:

Field plug-in repo - https://github.com/surveycto/conjoint
Supporting article - https://support.surveycto.com/hc/en-us/articles/19564034894867
*/

/*OVERVIEW

If you are a Stata or R user, you might need to slightly reshape your data to be able to use the conjoint (Stata) or cjoint (R) commands.

In this .do file, you can find the guidelines to use your conjoint analysis data in Stata.
*/

/*GUIDELINES*/

*1. Export your data in LONG format (using teh Export tab or SurveyCTO Desktop)

*2. Import your repeat group data (“Form Title-repeat group.csv”) into Stata. [Note: Replace "filepathname.csv" by your dataset directory]
import delimited using "/Users/martacosta/Documents/Exports/Sample - Conjoint Analysis-sandwich_group-conjoint_repeat.csv"

*3. Drop unecessary variables (optional)
drop conjoint_response parent_key setofconjoint_repeat

*4. Reshape from wide to long so that each row represents a profile
reshape long bread protein veggie selected, i(unique_id) j(profile)

/*If you would like to include more details related to the respondent in your dataset, you will need to merge data from the main dataset (“Form Title.csv”) with the repeat group dataset (“Form Title-repeat group.csv”) based on the ID variable “resp_id”.*/
