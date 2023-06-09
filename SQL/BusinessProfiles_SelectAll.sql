USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_SelectAll]    Script Date: 6/3/2023 6:51:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/06/2023
-- Description: SelectAll (paginated) for BusinessProfiles
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/09/2023
-- Code Reviewer: Alex Golomb
-- Note: Revised columns to return all values from lookup tables.
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/15/2023
-- Code Reviewer: Manuel Fuentes
-- Note: Revised @Offset to int = @PageSize * @PageIndex (removed -1 from @PageIndex)
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/26/2023
-- Code Reviewer: Manuel Perez
-- Note: Revised select location to retrieve 'City' instead of 'Zip'.
-- =============================================

ALTER proc [dbo].[BusinessProfiles_SelectAll] @PageIndex int 
                                               ,@PageSize int
AS

/*
DECLARE @PageIndex int = 0
DECLARE @PageSize int = 4
exec [dbo].BusinessProfiles_SelectAll @PageIndex
									  ,@PageSize


SELECT * FROM dbo.BusinessProfiles
SELECT * FROM dbo.Users
*/

BEGIN

Declare @OffSet int = @PageSize * @PageIndex

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
      ,l.City
      ,bp.DateCreated
      ,bp.DateModified
	  , TotalCount = COUNT(1) OVER()
	  
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
	ORDER BY bp.Id
    OFFSET @Offset ROWS

	Fetch Next @PageSize Rows ONLY

END