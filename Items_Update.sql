ALTER PROC [dbo].[Items_Update]
@Title NVARCHAR(50)
,@Subject NVARCHAR(50)
,@Description NVARCHAR(200)
,@InstructorId INT
,@Duration NVARCHAR(50)
,@LookUpTypeId INT
,@CoverImageUrl NVARCHAR(50)
,@StatusId INT
,@ModifiedBy INT

,@Id INT
AS

/*
	DECLARE 
		@Id INT = 8;
	
	DECLARE
		@Title nvarchar(50) = 'Falafel'
		,@Subject nvarchar(50) = 'Mediterranean food'
		,@Description nvarchar(200) = 'How to make falafel'
		,@InstructorId INT = 108
		,@Duration nvarchar(50) = '2h 45m'
		,@LookUpTypeId INT = 2
		,@CoverImageUrl nvarchar(50) = 'https://bit.ly/3MnUvtj'
		,@ModifiedBy INT = 106
		,@StatusId INT = 1

		SELECT * FROM dbo.Items Where Id = @Id

	EXECUTE [dbo].[Items_Update]
		@Title
		,@Subject
		,@Description
		,@InstructorId
		,@Duration
		,@LookUpTypeId
		,@CoverImageUrl
		,@StatusId
		,@ModifiedBy

		,@Id

SELECT * FROM dbo.Items Where Id = @Id
*/

BEGIN

	UPDATE [dbo].[Items]
	  SET  
			[Title] = @Title
			,[Subject] = @Subject
			,[Description] = @Description
			,[InstructorId] =@InstructorId
			,[Duration] = @Duration
			,[LookUpTypeId] = @LookUpTypeId
			,[CoverImageUrl] = @CoverImageUrl
			,[StatusId] = @StatusId
			,[ModifiedBy] = @ModifiedBy
			,[DateModified] = GETUTCDATE()
	  WHERE Id = @Id

END
