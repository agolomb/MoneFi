ALTER PROC [dbo].[Items_SelectById]
@Id INT
AS

/*
DECLARE @Id int = 6

	EXECUTE [dbo].[Items_SelectById]
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
  
  FROM [dbo].[Items] AS c JOIN [dbo].[Users] AS u ON c.InstructorId = u.Id
		JOIN [dbo].[LookUpTypesOne] AS lt ON c.LookUpTypesOneId = lt.Id
		JOIN [dbo].[LookUpTypesTwo] AS s ON c.LookUpTypesTwoId = s.Id
  WHERE c.Id = @Id

END


