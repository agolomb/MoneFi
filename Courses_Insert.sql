USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Insert]    Script Date: 6/5/2023 12:58:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: Insert procedure for Courses
-- Code Reviewer: Deminicus McKinnon

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Courses_Insert]
@Title NVARCHAR(50)
,@Subject NVARCHAR(50)
,@Description NVARCHAR(200)
,@InstructorId INT
,@Duration NVARCHAR(50)
,@LectureTypeId INT
,@CoverImageUrl NVARCHAR(50)
,@CreatedBy INT

,@Id INT OUTPUT

AS

/*
	DECLARE
		@Id INT = 0
		
	DECLARE
		@Title nvarchar(50) = 'Test Title for peer review 3'
		,@Subject nvarchar(50) = 'Test Subject for peer review 3'
		,@Description nvarchar(200) = 'Test Description for peer review 3'
		,@InstructorId INT = 2
		,@Duration nvarchar(50) = 'Test Duration for peer review 3'
		,@LectureTypeId INT = 1
		,@CoverImageUrl nvarchar(50) = 'Test CoverImageUrl for peer review 3'
		,@CreatedBy INT = 2
			
	EXECUTE [dbo].[Courses_Insert]
		@Title
		,@Subject 
		,@Description
		,@InstructorId
		,@Duration
		,@LectureTypeId
		,@CoverImageUrl
		,@CreatedBy

		,@Id OUTPUT

SELECT * FROM dbo.Courses

*/

BEGIN

	INSERT INTO dbo.Courses
				([Title]
				,[Subject]
				,[Description]
				,[InstructorId]
				,[Duration]
				,[LectureTypeId]
				,[CoverImageUrl]
				,[CreatedBy]
				,[ModifiedBy])
			VALUES
				(@Title
				,@Subject
				,@Description
				,@InstructorId
				,@Duration
				,@LectureTypeId
				,@CoverImageUrl
				,@CreatedBy
				,@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

END