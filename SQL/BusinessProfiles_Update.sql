USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Update]    Script Date: 6/3/2023 6:51:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: UPDATE BusinessProfiles
-- Code Reviewer: Vincent Miller

-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/06/2023
-- Code Reviewer: Vincent Miller
-- Note: Removed UserId - (can't update UserId)
-- =============================================
-- MODIFIED BY: Cameron Johnson
-- MODIFIED DATE: 05/29/2023
-- Code Reviewer: Vincent Miller
-- Note: Modified Logo nvarchar to (255) instead of (50).
-- =============================================

ALTER proc [dbo].[BusinessProfiles_Update]
				@Name nvarchar(100)
				,@EIN nvarchar(20)
				,@StatusId int
				,@BusinessTypeId int
				,@IndustryTypeId int
				,@ProjectedAnnualBusinessIncome int
				,@AnnualBusinessIncome int
				,@BusinessStageId int
				,@Logo nvarchar(255)
				,@LocationId int
				,@Id int

/*
Declare @Id int = 35

Declare
		@Name nvarchar(100) = 'Luminous Lux Lighting'
		,@EIN nvarchar(20) = '123456789'
		,@StatusId int = 3
		,@BusinessTypeId int = 2
		,@IndustryTypeId int = 22
		,@ProjectedAnnualBusinessIncome int = 400000
		,@AnnualBusinessIncome int = 350000
		,@BusinessStageId int = 3
		,@Logo nvarchar(255) = 'https://img1.pnghut.com/16/15/1/h6gbVRqJGu/electricity-symbol-hand-light-line-art.jpg'
		,@LocationId int = 8

		Execute dbo.[BusinessProfiles_Update]  
	
		@Name
		,@EIN
		,@StatusId
		,@BusinessTypeId
		,@IndustryTypeId
		,@ProjectedAnnualBusinessIncome
		,@AnnualBusinessIncome
		,@BusinessStageId
		,@Logo
		,@LocationId
		,@Id
										
Select *
From dbo.BusinessProfiles
Where Id = @Id

Select *
From dbo.BusinessProfiles
*/

as

BEGIN

Declare @DateNow datetime2 = getutcdate()

UPDATE [dbo].[BusinessProfiles]

	SET 
		[Name] = @Name
		,[EIN] = @EIN
		,[StatusId] = @StatusId
		,[BusinessTypeId] = @BusinessTypeId
		,[IndustryTypeId] = @IndustryTypeId
		,[ProjectedAnnualBusinessIncome] = @ProjectedAnnualBusinessIncome
		,[AnnualBusinessIncome] = @AnnualBusinessIncome
		,[BusinessStageId] = @BusinessStageId
		,[Logo] = @Logo
		,[LocationId] = @LocationId
		,[DateModified] = @DateNow

	WHERE Id = @Id

END