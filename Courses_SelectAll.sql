USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SelectAll]    Script Date: 6/5/2023 1:00:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/06/2023
-- Description: SelectAll(Paginated) procedure for Courses
-- Code Reviewer: Jesus Elenes

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Courses_SelectAll]
@PageIndex INT
,@PageSize INT
AS
/*
	DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 5

	EXECUTE [dbo].[Courses_SelectAll]
    @PageIndex
	,@PageSize
*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT c.Id
		  ,c.Title
		  ,c.[Subject]
		  ,c.[Description]
		  ,u.FirstName AS InstructorFirstName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.LastName AS InstructorLastName
		  ,c.Duration
		  ,LectureType = (
				SELECT DISTINCT l.Id AS Id, l.[Name]
				FROM [dbo].[LectureTypes] AS l join [dbo].[Courses] as co
				ON l.Id = co.LectureTypeId
				WHERE l.Id = lt.Id
				FOR JSON AUTO)
		  ,c.CoverImageUrl
		  ,s.[Name] AS StatusName
		  ,c.DateCreated
		  ,c.DateModified
		  ,u.FirstName AS CreatedByFirstName
	      ,u.Mi AS CreatedByMiddleInitial
	      ,u.LastName AS CreatedByLastName
	      ,u.FirstName AS ModifiedByFirstName
	      ,u.Mi AS ModifiedByMiddleInitial
	      ,u.LastName AS ModifiedByLastName,
  
	TotalCount = COUNT(1) OVER()
  
  
	  FROM [dbo].[Courses] AS c join [dbo].[Users] AS u ON c.InstructorId = u.Id
			join [dbo].[LectureTypes] AS lt ON c.LectureTypeId = lt.Id
			join [dbo].[StatusTypes] AS s ON c.StatusId = s.Id  

	  ORDER BY c.Id

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY


END