USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessTypes_SelectAll]    Script Date: 6/3/2023 6:52:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: SelectAll procedure for BusinessTypes
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[BusinessTypes_SelectAll]


/*
EXECUTE [dbo].[BusinessTypes_SelectAll]
*/
as

BEGIN

	SELECT 
		Id
		,Name

	FROM dbo.BusinessTypes

END

