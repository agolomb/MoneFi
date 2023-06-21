USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAllV2]    Script Date: 6/5/2023 1:03:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/27/2023
-- Description: Select All Users Not Paginated
-- Code Reviewer: 

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
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