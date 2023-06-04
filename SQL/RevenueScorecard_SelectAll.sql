USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[RevenueScorecard_SelectAll]    Script Date: 6/3/2023 6:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: SelectAll procedure for RevenueScorecard
-- Code Reviewer: Vincent Miller

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[RevenueScorecard_SelectAll]


/*
EXECUTE [dbo].[RevenueScorecard_SelectAll]
*/
as

BEGIN

	SELECT 
		Id
		,Score
		,Value

	FROM dbo.RevenueScorecard

END

