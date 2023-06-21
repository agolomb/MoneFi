USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Select_Unique_Subjects]    Script Date: 6/5/2023 1:00:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Alex Golomb
-- Create date: 05/31/2023
-- Description: Select all distinct subjects from dbo.Courses
-- Code Reviewer: Alejandro Saavedra

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================
ALTER PROC [dbo].[Courses_Select_Unique_Subjects]

AS
/*
	EXECUTE [dbo].[Courses_Select_Unique_Subjects]
*/

BEGIN

	SELECT DISTINCT 
		[Subject]
	FROM dbo.Courses

END