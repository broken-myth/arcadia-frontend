/* eslint-disable no-unused-vars */

enum Queries {
	getLootboxesGET = "GETLOOTBOXES_GET",
	getProfileGET = "GETPROFILE_GET",
	getCharactersGET = "GETCHARACTERS_GET",
	getMatchHistoryGET = "GETHISTORY_GET",
	getMatchDetailsGET = "GETDETAILS_GET",
	getLeaderBoardGET = "GETLEADERBOARD_GET",
	getAllMiniconsGET = "GETALLMINICONS_GET",
	getMiniconGET = "GETMINICON_GET",
	getConstantsGET = "GETCONSTANTS_GET",
	getAdminLeaderboardGET = "GETADMINLEADERBOARD_GET",
	verifyAdminGET = "VERIFYADMIN_GET",
	startMatchGET = "STARTMATCH_GET",
	getLandingLeaderboardGET = "GETLANDINGLEADERBOARD_GET",
}

enum Mutations {
	signupPOST = "SIGNUP_POST",
	updateCharacterPATCH = "UPDATECHARACTER_PATCH",
	updateProfilePATCH = "UPDATEPROFILE_PATCH",
	lootboxOpenPOST = "LOOTBOXOPEN_POST",
	updateLineupPATCH = "UPDATELINEUP_PATCH",
	updateConstantsPATCH = "UPDATECONSTANTS_PATCH",
	adminLoginPOST = "ADMINLOGIN_POST",
	updateRedisPATCH = "UPDATEREDIS_PATCH",
}

export { Mutations, Queries };
