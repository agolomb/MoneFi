ALTER PROC [dbo].[Items_Delete]
@Id INT
,@ModifiedBy INT
AS

/*
	DECLARE
		@Id INT = 15;
	
	DECLARE
		@ModifiedBy INT = 1;

	EXECUTE [dbo].[Items_Delete]
		@Id = @Id
		,@ModifiedBy = 1

	SELECT * FROM dbo.Items

*/

BEGIN

	UPDATE [dbo].[Items]
	   SET [StatusId] = 5,
	       [ModifiedBy] = @ModifiedBy,
	       [DateModified] = GETUTCDATE()
	WHERE  [Id] = @Id;
	

END
