USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SelectById]    Script Date: 6/5/2023 1:01:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: SelectById procedure for Courses
-- Code Reviewer: Tyler Klein

-- MODIFIED BY: Alex Golomb
-- MODIFIED DATE: 6/2/2023
-- Code Reviewer: Jaki Alequin
-- Note: Updated columns selected to function properly with updated middle tier from previous merged PRs
-- =============================================
ALTER PROC [dbo].[Courses_SelectById]
@Id INT
AS

/*
DECLARE @Id int = 6

	EXECUTE [dbo].[Courses_SelectById]
	@Id

*/

BEGIN

SELECT c.Id
      ,c.Title
      ,c.[Subject]
      ,c.[Description]

	  ,u.Id as InstructorId
      ,u.FirstName AS InstructorFirstName
	  ,u.LastName AS InstructorLastName
	  ,u.Mi AS InstructorMiddleInitial
	  ,u.AvatarUrl AS InstructorImage

      ,c.Duration AS CourseDuration
	  
	  ,lt.Id AS LectureTypeId
	  ,lt.Name as LectureTypeName
	  
	  ,c.CoverImageUrl
	  ,s.Id AS StatusId
	  ,s.[Name] AS StatusName
      
	  ,c.DateCreated
      ,c.DateModified
      
	  ,u.Id as CreatedById
	  ,u.FirstName AS CreatedByFirstName
	  ,u.LastName AS CreatedByLastName
	  ,u.Mi AS CreatedByMiddleInitial
	  ,u.AvatarUrl as CreatedByAvatarUrl

	  ,c.ModifiedBy
  
  FROM [dbo].[Courses] AS c JOIN [dbo].[Users] AS u ON c.InstructorId = u.Id
		JOIN [dbo].[LectureTypes] AS lt ON c.LectureTypeId = lt.Id
		JOIN [dbo].[StatusTypes] AS s ON c.StatusId = s.Id
  WHERE c.Id = @Id

END


