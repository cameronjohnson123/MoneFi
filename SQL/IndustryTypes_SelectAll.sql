USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[IndustryTypes_SelectAll]    Script Date: 6/3/2023 6:52:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: SelectAll procedure for IndustryTypes
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Vincent Miller
-- Note:
-- =============================================

ALTER proc [dbo].[IndustryTypes_SelectAll]


/*

		EXECUTE [dbo].[IndustryTypes_SelectAll]

*/
as

BEGIN

	SELECT 
		Id
		,Name

	FROM dbo.IndustryTypes

END

