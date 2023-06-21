ALTER PROC [dbo].[Items_SearchV2]
@PageIndex INT
,@PageSize INT
,@Query NVARCHAR(50) = null
,@LookUpTypeId INT = null
AS

/*
DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 6
	,@Query nvarchar(50) = 'soft'
	,@LookUpTypeId INT = null
	
	EXECUTE [dbo].[Items_SearchV2]
		@PageIndex 
		,@PageSize 
		,@Query
		,@LookUpTypeId

select * from dbo.items
SELECT * FROM dbo.Users
*/

BEGIN

	SELECT    c.Id
		  ,c.Title
		  ,c.Subject
		  ,c.Description
		 
		  ,u.Id as IntructorId
		  ,u.FirstName AS InstructorFirstName 
		  ,u.LastName AS InstructorLastName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.AvatarUrl AS InstructorImage 

		  ,c.Duration

		
		  ,lt.Id AS LookUpTypeId
		  ,lt.Name as LookUpTypeName

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
  
  
	  FROM [dbo].[Items] AS c join [dbo].[Users] AS u ON c.InstructorId = u.Id
			join [dbo].[LookUpTypesOne] AS lt ON c.LookUpTypesOneId = lt.Id
			join [dbo].[LookUpTypesTwo] AS s ON c.LookUpTypesTwoId = s.Id

	  WHERE ((@Query IS NULL OR [Title] LIKE '%' + @Query + '%' OR [Subject] LIKE '%' + @Query + '%') AND (@LookUpTypesOneId IS NULL OR lt.Id = @LookUpTypesOneId))
	  
	  ORDER BY c.Id ASC
	  OFFSET (@PageIndex) * @PageSize ROWS
	  FETCH NEXT @PageSize ROWS ONLY
END
