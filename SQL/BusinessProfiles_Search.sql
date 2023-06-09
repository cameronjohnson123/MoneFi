USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Search]    Script Date: 6/3/2023 6:50:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/06/2023
-- Description: Search (paginated) for BusinessProfiles
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/09/2023
-- Code Reviewer:
-- Note: Revised columns to return all values from lookup tables.
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/30/2023
-- Code Reviewer:
-- Note: Added '= NULL' to the @Query parameter and WHERE clause to allow all records to be returned on an empty query.
--				Added query condition for bs.[Name]. Modified l.Zip to return l.City instead.
--				Added additional query parameter for @BusinessTypeIdQuery and set to '=NULL' to allow for dropdown filter query.
--				Added WHERE clause for @BusinessTypeIdQuery with adjoining AND clause.
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 06/01/2023
-- Code Reviewer: Vincent Miller
-- Note: Added l.Id for location Id to be returned for the Update. Temporary fix until have LocationMapper.
-- =============================================
ALTER proc [dbo].[BusinessProfiles_Search] @PageIndex int 
                                            ,@PageSize int
											,@Query nvarchar(100) = NULL
											,@BusinessTypeIdQuery int = NULL

AS

/*
DECLARE @PageIndex int = 0
		,@PageSize int = 10
		,@Query nvarchar(100) = null


exec [dbo].[BusinessProfiles_Search] @PageIndex
									  ,@PageSize
									  ,@Query
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
	  ,l.Id LocationId
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

	WHERE (@BusinessTypeIdQuery IS NULL OR bp.BusinessTypeId = @BusinessTypeIdQuery)
	AND
	(@Query IS NULL OR bp.[Name] LIKE '%' + @Query + '%'
	OR u.FirstName LIKE '%' + @Query + '%'
	OR u.LastName LIKE '%' + @Query + '%'
	OR bt.[Name] LIKE '%' + @Query + '%'
	OR bs.[Name] LIKE '%' + @Query + '%')

	ORDER BY bp.Id
	OFFSET @OffSet Rows
	Fetch Next @PageSize Rows ONLY

END

