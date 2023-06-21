USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Select_ByCreatedBy]    Script Date: 6/5/2023 12:59:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: SelectByCreatedBy(Paginated) procedure for Courses
-- Code Reviewer: Jesus Elenes

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Courses_Select_ByCreatedBy]
@Id INT
,@PageIndex INT
,@PageSize INT
AS
/*
DECLARE 
	@Id INT = 2
DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 3

	EXECUTE [dbo].[Courses_Select_ByCreatedBy]
	@Id
    ,@PageIndex
	,@PageSize
	
	select * from dbo.Courses
*/

BEGIN

	DECLARE @Offset INT = @PageIndex * @PageSize

	SELECT c.Id
		  ,c.Title
		  ,c.[Subject]
		  ,c.[Description]
		  ,u.FirstName AS InstructorFirstName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.LastName AS InstructorLastName
		  ,c.Duration
		  ,LectureType = (
				SELECT DISTINCT l.Id, l.[Name]
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
	  WHERE u.Id = @Id

	  ORDER BY c.Id ASC

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END