USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Select_ByCreatedBy]    Script Date: 6/3/2023 6:51:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/06/2023
-- Description: Select_ByCreatedBy BusinessProfiles
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/09/2023
-- Code Reviewer: Alex Golomb
-- Note: Revised columns to return all values from lookup tables.
-- =============================================
ALTER proc [dbo].[BusinessProfiles_Select_ByCreatedBy]
					@CreatedBy int
AS

/*
Declare @CreatedBy int = 10;
Execute [dbo].[BusinessProfiles_Select_ByCreatedBy] @CreatedBy
*/

BEGIN

SELECT bp.Id
      ,u.Id UserId
      ,bp.[Name]
      ,bp.EIN
	  ,st.Id StatusId
	  ,st.[Name] [Status]
      ,bt.Id BusinessTypeId
      ,bt.[Name] BusinessType
      ,it.Id IndustryTypeId
      ,it.[Name] IndustryType
      ,ProjectedAnnualBusinessIncome
      ,AnnualBusinessIncome
      ,bs.Id BusinessStageId
	  ,bs.[Name] BusinessStage
	  ,bs.[Value] BusinessStageValue
      ,Logo
      ,l.Zip
      ,bp.DateCreated
      ,bp.DateModified
	  
	FROM dbo.BusinessProfiles bp 
	INNER JOIN dbo.Users u 
	ON bp.UserId = u.Id
	INNER JOIN dbo.StatusTypes st
	ON bp.StatusId = st.Id
	INNER JOIN dbo.BusinessTypes bt
	ON bp.BusinessTypeId = bt.Id
	INNER JOIN dbo.IndustryTypes it
	ON bp.IndustryTypeId = it.Id
	INNER JOIN dbo.BusinessStages bs
	ON bp.BusinessStageId = bs.Id
	INNER JOIN dbo.Locations l
	ON bp.LocationId = l.Id
	WHERE bp.UserId = @CreatedBy

END

