ALTER PROC [dbo].[Items_SelectAll]
@PageIndex INT
,@PageSize INT
AS
/*
	DECLARE 
	@PageIndex INT = 0
	,@PageSize INT = 5

	EXECUTE [dbo].[Items_SelectAll]
    @PageIndex
	,@PageSize
*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT    c.Id
		  ,c.Title
		  ,c.[Subject]
		  ,c.[Description]
		  ,u.FirstName AS InstructorFirstName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.LastName AS InstructorLastName
		  ,c.Duration
		  ,LookUpType = (
				SELECT DISTINCT l.Id AS Id, l.[Name]
				FROM [dbo].[LookUpTypesOne] AS l join [dbo].[Courses] as co
				ON l.Id = co.LookUpTypesOneId
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
  
  
	  FROM [dbo].[Items] AS c join [dbo].[Users] AS u ON c.InstructorId = u.Id
			join [dbo].[LookUpTypesOne] AS lt ON c.LookUpTypesOneId = lt.Id
			join [dbo].[LookUpTypesTwo] AS s ON c.LookUpTypesTwoId = s.Id  

	  ORDER BY c.Id

	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY


END
