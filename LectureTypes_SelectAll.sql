USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[LectureTypes_SelectAll]    Script Date: 6/5/2023 1:02:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Alex Golomb
-- Create date: 05/05/2023
-- Description: SelectAll procedure for Courses
-- Code Reviewer: Tyler Klein

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[LectureTypes_SelectAll]

AS

/*
	Execute [dbo].[LectureTypes_SelectAll]
*/

BEGIN

SELECT 
	Id
	,Name

FROM dbo.LectureTypes

END