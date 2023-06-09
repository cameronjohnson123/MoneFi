USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Insert]    Script Date: 6/3/2023 6:50:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: Insert BusinessProfiles
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/24/2023
-- Code Reviewer: Alex Golomb
-- Note: Added '= NULL' to @BusinessStageId, @ProjectedAnnualBusinessIncome, and @LocationId to allow nulls on insert.
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/25/2023
-- Code Reviewer: Manuel Perez
-- Note: Removed '= NULL' from @BusinessStageId since it is now required. Changed EIN to be of value 'int' and added '= NULL'
-- =============================================

ALTER proc [dbo].[BusinessProfiles_Insert]
				(@UserId int
				,@Name nvarchar(100)
				,@EIN int = NULL
				,@StatusId int
				,@BusinessTypeId int
				,@IndustryTypeId int
				,@ProjectedAnnualBusinessIncome int = NULL
				,@AnnualBusinessIncome int
				,@BusinessStageId int
				,@Logo nvarchar(50)
				,@LocationId int = NULL
				,@Id int OUTPUT)
/*

Declare @Id int

Declare	@UserId int = 1
		,@Name nvarchar(100) = 'TestBusinessProfilesName1'
		,@EIN nvarchar(20) = 'TestBusinessProfilesEIN'
		,@StatusId int = 1
		,@BusinessTypeId int = 1
		,@IndustryTypeId int = 1
		,@ProjectedAnnualBusinessIncome int = 500000
		,@AnnualBusinessIncome int = 450000
		,@BusinessStageId int = 1
		,@Logo nvarchar(50) = 'http://TestBusinessProfilesLogo.com'
		,@LocationId int = 1
							
Execute dbo.[BusinessProfiles_Insert]  
		@UserId
		,@Name
		,@EIN
		,@StatusId
		,@BusinessTypeId
		,@IndustryTypeId
		,@ProjectedAnnualBusinessIncome
		,@AnnualBusinessIncome
		,@BusinessStageId
		,@Logo
		,@LocationId
		,@Id OUTPUT
										
Select @Id

Select *
From dbo.BusinessProfiles
Where Id = @Id

*/

as

BEGIN

	INSERT INTO dbo.BusinessProfiles
				([UserId]
				,[Name]
				,[EIN]
				,[StatusId]
				,[BusinessTypeId]
				,[IndustryTypeId]
				,[ProjectedAnnualBusinessIncome]
				,[AnnualBusinessIncome]
				,[BusinessStageId]
				,[Logo]
				,[LocationId])

	VALUES
				(@UserId 
				,@Name
				,@EIN
				,@StatusId
				,@BusinessTypeId
				,@IndustryTypeId
				,@ProjectedAnnualBusinessIncome
				,@AnnualBusinessIncome
				,@BusinessStageId
				,@Logo
				,@LocationId)

			SET @Id = SCOPE_IDENTITY()

END


