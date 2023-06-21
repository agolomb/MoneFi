USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SearchV2]    Script Date: 6/5/2023 12:59:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/20/2023
-- Description: Search(Paginated) procedure for Courses with lecture type or a search bar query for title and subject
-- Code Reviewer: Alejandro Saavedra

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================
ALTER PROC [dbo].[Courses_SearchV2]
@PageIndex INT
,@PageSize INT
,@Query NVARCHAR(50) = null
,@LectureTypeId INT = null
AS

/*
DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 6
	,@Query nvarchar(50) = 'soft'
	,@LectureTypeId INT = null
	
	EXECUTE [dbo].[Courses_SearchV2]
		@PageIndex 
		,@PageSize 
		,@Query
		,@LectureTypeId

select * from dbo.courses
SELECT * FROM dbo.Users
*/

BEGIN

	SELECT c.Id
		  ,c.Title
		  ,c.Subject
		  ,c.Description
		 
		  ,u.Id as IntructorId
		  ,u.FirstName AS InstructorFirstName 
		  ,u.LastName AS InstructorLastName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.AvatarUrl AS InstructorImage 

		  ,c.Duration

		
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
	      ,TotalCount = COUNT(1) OVER()
  
  
	  FROM [dbo].[Courses] AS c join [dbo].[Users] AS u ON c.InstructorId = u.Id
			join [dbo].[LectureTypes] AS lt ON c.LectureTypeId = lt.Id
			join [dbo].[StatusTypes] AS s ON c.StatusId = s.Id

	  WHERE ((@Query IS NULL OR [Title] LIKE '%' + @Query + '%' OR [Subject] LIKE '%' + @Query + '%') AND (@LectureTypeId IS NULL OR lt.Id = @LectureTypeId))
	  
	  ORDER BY c.Id ASC
	  OFFSET (@PageIndex) * @PageSize ROWS
	  FETCH NEXT @PageSize ROWS ONLY
END