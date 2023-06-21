USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SelectByLectureType]    Script Date: 6/5/2023 1:01:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/17/2023
-- Description: SelectByLectureType procedure for Courses
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Courses_SelectByLectureType]
@PageIndex INT
,@PageSize INT
,@Query NVARCHAR(50) = null

AS

/*
DECLARE 
	@PageIndex INT = 1
	,@PageSize INT = 3
	,@Query nvarchar(50) = 'virt'
	
	EXECUTE [dbo].[Courses_SelectByLectureType]
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
		  --,lt.[Name]
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

	  WHERE (@Query IS NULL OR lt.[Name] LIKE '%' + @Query + '%')

	  ORDER BY c.Id ASC
	  OFFSET (@PageIndex - 1) * @PageSize ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END