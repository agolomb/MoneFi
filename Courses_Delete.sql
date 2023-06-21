USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Delete]    Script Date: 6/5/2023 12:54:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: Delete procedure for Courses (Update StatusId)
-- Code Reviewer: Tyler Klein

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Courses_Delete]
@Id INT
,@ModifiedBy INT
AS

/*
	DECLARE
		@Id INT = 15;
	
	DECLARE
		@ModifiedBy INT = 1;

	EXECUTE [dbo].[Courses_Delete]
		@Id = @Id
		,@ModifiedBy = 1

SELECT * FROM dbo.Courses

*/

BEGIN

	UPDATE [dbo].[Courses]
	   SET [StatusId] = 5,
		   [ModifiedBy] = @ModifiedBy,
		   [DateModified] = GETUTCDATE()
	WHERE  [Id] = @Id;
	

END