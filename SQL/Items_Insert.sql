ALTER PROC [dbo].[Items_Insert]
@Title NVARCHAR(50)
,@Subject NVARCHAR(50)
,@Description NVARCHAR(200)
,@InstructorId INT
,@Duration NVARCHAR(50)
,@LectureTypeId INT
,@CoverImageUrl NVARCHAR(255)
,@CreatedBy INT

,@Id INT OUTPUT

AS

/*
	DECLARE
		@Id INT = 0
		
	DECLARE
		@Title nvarchar(50) = 'Test Title'
		,@Subject nvarchar(50) = 'Test Subject'
		,@Description nvarchar(200) = 'Test Description'
		,@InstructorId INT = 2
		,@Duration nvarchar(50) = 'Test Duration'
		,@LectureTypeId INT = 1
		,@CoverImageUrl nvarchar(50) = 'Test CoverImageUrl'
		,@CreatedBy INT = 2
			
	EXECUTE [dbo].[Items_Insert]
		@Title
		,@Subject 
		,@Description
		,@InstructorId
		,@Duration
		,@LectureTypeId
		,@CoverImageUrl
		,@CreatedBy

		,@Id OUTPUT

SELECT * FROM dbo.Items

*/

BEGIN

	INSERT INTO dbo.Items
				([Title]
				,[Subject]
				,[Description]
				,[InstructorId]
				,[Duration]
				,[LectureTypeId]
				,[CoverImageUrl]
				,[CreatedBy]
				,[ModifiedBy])
			VALUES
				(@Title
				,@Subject
				,@Description
				,@InstructorId
				,@Duration
				,@LectureTypeId
				,@CoverImageUrl
				,@CreatedBy
				,@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

END
