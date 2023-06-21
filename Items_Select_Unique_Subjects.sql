ALTER PROC [dbo].[Items_Select_Unique_Subjects]

AS
/*
	EXECUTE [dbo].[Items_Select_Unique_Subjects]
*/

BEGIN

	SELECT DISTINCT 
		[Subject]
	FROM dbo.Items

END
