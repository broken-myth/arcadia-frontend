const mutations = {
	signupPOST: "SIGNUP_POST",
	updateCharacterPOST: "UPDATECHARACTER_POST",
	updateProfilePOST: "UPDATEPROFILE_POST",
	lootboxOpenPOST: "LOOTBOXOPEN_POST",
	updateLineupPOST : "UPDATELINEUP_POST",
	constantsPOST: "CONSTANTS_POST",
	adminPOST: "ADMIN_POST",
	updateConstantsPOST: "UPDATECONSTANTS_POST",
	adminLoginPOST: "ADMINLOGIN_POST",
	updateRedisPOST: "UPDATEREDIS_POST",
};

const queries = {
	getLootboxesGET: "GETLOOTBOXES_GET",
	getProfileGET: "GETPROFILE_GET",
	getCharactersGET: "GETCHARACTERS_GET",
	getMatchHistoryGET: "GETHISTORY_GET",
	getMatchDetailsGET: "GETDETAILS_GET",
	getLeaderBoardGET: "GETLEADERBOARD_GET",
	getAllMiniconsGET: "GETALLMINICONS_GET",
	getMiniconGET: "GETMINICON_GET",
	getConstantsGET: "GETCONSTANTS_GET",
	getAdminLeaderboardGET: "GETADMINLEADERBOARD_GET",
	verifyAdminGET: "VerifyAdminGET",
	startMatchGET:"STARTMATCH_GET"
};

export { mutations, queries };
