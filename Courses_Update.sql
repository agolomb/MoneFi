USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Update]    Script Date: 6/5/2023 1:01:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: Update procedure for Courses
-- Code Reviewer: Deminicus McKinnon

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Courses_Update]
@Title NVARCHAR(50)
,@Subject NVARCHAR(50)
,@Description NVARCHAR(200)
,@InstructorId INT
,@Duration NVARCHAR(50)
,@LectureTypeId INT
,@CoverImageUrl NVARCHAR(50)
,@StatusId INT
,@ModifiedBy INT

,@Id INT
AS

/*
	DECLARE 
		@Id INT = 8;
	
	DECLARE
		@Title nvarchar(50) = 'Falafel'
		,@Subject nvarchar(50) = 'Mediterranean food'
		,@Description nvarchar(200) = 'How to make falafel'
		,@InstructorId INT = 108
		,@Duration nvarchar(50) = '2h 45m'
		,@LectureTypeId INT = 2
		,@CoverImageUrl nvarchar(50) = 'https://bit.ly/3MnUvtj'
		,@ModifiedBy INT = 106
		,@StatusId INT = 1

		SELECT * FROM dbo.Courses Where Id = @Id

	EXECUTE [dbo].[Courses_Update]
		@Title
		,@Subject
		,@Description
		,@InstructorId
		,@Duration
		,@LectureTypeId
		,@CoverImageUrl
		,@StatusId
		,@ModifiedBy

		,@Id

SELECT * FROM dbo.Courses Where Id = @Id
*/

BEGIN

	UPDATE [dbo].[Courses]
	  SET  
			[Title] = @Title
			,[Subject] = @Subject
			,[Description] = @Description
			,[InstructorId] =@InstructorId
			,[Duration] = @Duration
			,[LectureTypeId] = @LectureTypeId
			,[CoverImageUrl] = @CoverImageUrl
			,[StatusId] = @StatusId
			,[ModifiedBy] = @ModifiedBy
			,[DateModified] = GETUTCDATE()
	  WHERE Id = @Id

END