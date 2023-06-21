ALTER PROC [dbo].[Items_SelectByLookUpTypeOne]
@PageIndex INT
,@PageSize INT
,@Query NVARCHAR(50) = null

AS

/*
DECLARE 
	@PageIndex INT = 1
	,@PageSize INT = 3
	,@Query nvarchar(50) = 'virt'
	
	EXECUTE [dbo].[Items_SelectByLookUpTypeOne]
		@PageIndex 
		,@PageSize 
		,@Query

select * from dbo.Items
*/

BEGIN

	SELECT    c.Id
		  ,c.Title
		  ,c.Subject
		  ,c.Description
		  ,u.FirstName AS InstructorFirstName
		  ,u.Mi AS InstructorMiddleInitial
		  ,u.LastName AS InstructorLastName
		  ,c.Duration
		  ,LookUpTypeOne = (
				SELECT DISTINCT l.Id, l.Name
				FROM [dbo].[LookUpTypeOne] AS l join [dbo].[Items] AS co
				ON l.Id = co.LookUpTypeOneId
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

	  WHERE (@Query IS NULL OR lt.[Name] LIKE '%' + @Query + '%')

	  ORDER BY c.Id ASC
	  OFFSET (@PageIndex - 1) * @PageSize ROWS
	  FETCH NEXT @PageSize ROWS ONLY

END
