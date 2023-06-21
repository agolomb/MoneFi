USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Search]    Script Date: 6/5/2023 12:58:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/06/2023
-- Description: SelectAll(Paginated) procedure for Courses
-- Code Reviewer: Jaki Alequin

-- MODIFIED BY: Alex Golomb
-- MODIFIED DATE: 5/18/2023
-- Code Reviewer: Cameron Johnson
-- Note: added null ability, removed "- 1" from OFFSET (@PageIndex - 1)
-- =============================================
ALTER PROC [dbo].[Courses_Search]
@PageIndex INT
,@PageSize INT
,@Query NVARCHAR(50) = null

AS

/*
DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 6
	,@Query nvarchar(50) = '6'
	
	EXECUTE [dbo].[Courses_Search]
		@PageIndex 
		,@PageSize 
		,@Query

select * from dbo.courses
*/

BEGIN

	SELECT c.Id
		  ,c.Title
		  ,c.Subject
		  ,c.Description
		  ,u.FirstName AS InstructorFirstName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.LastName AS InstructorLastName
		  ,c.Duration
		  ,LectureType = (
				SELECT DISTINCT l.Id, l.Name
				FROM [dbo].[LectureTypes] AS l join [dbo].[Courses] AS co
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

	  WHERE (@Query IS NULL OR [Title] LIKE '%' + @Query + '%' OR lt.[Name] LIKE '%' + @Query + '%')

	  ORDER BY c.Id ASC
	  OFFSET (@PageIndex) * @PageSize ROWS
	  FETCH NEXT @PageSize ROWS ONLY
END