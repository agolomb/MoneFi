ALTER PROCEDURE [dbo].[Users_SelectAllV2]
AS

/*
	EXECUTE [dbo].[Users_SelectAllV2]
	select*from dbo.users
*/

BEGIN

	SELECT	
		[Id]
		,[FirstName]		
		,[LastName]
		,[Mi]
		,[AvatarUrl]
		
	FROM [dbo].Users
END
