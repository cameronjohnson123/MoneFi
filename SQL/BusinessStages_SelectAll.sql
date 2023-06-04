USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessStages_SelectAll]    Script Date: 6/3/2023 6:51:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: SelectAll procedure for BusinessStages
-- Code Reviewer: Vincent Miller

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[BusinessStages_SelectAll]


/*
EXECUTE [dbo].[BusinessStages_SelectAll]
*/
as

BEGIN

	SELECT 
		Id
		,Name

	FROM dbo.BusinessStages

END

