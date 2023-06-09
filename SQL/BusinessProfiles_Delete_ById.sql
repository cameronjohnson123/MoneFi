USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Delete_ById]    Script Date: 6/3/2023 6:49:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Cameron Johnson
-- Create date: 05/05/2023
-- Description: Delete BusinessProfiles - (update Status to 'Removed')
-- Code Reviewer: Vincent Miller

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[BusinessProfiles_Delete_ById]
					@Id int


as

/*
DECLARE @Id int = 6
exec dbo.BusinessProfiles_SelectById @Id
exec dbo.BusinessProfiles_Delete_ById @Id
exec dbo.BusinessProfiles_SelectById @Id
*/

BEGIN

	UPDATE dbo.BusinessProfiles
		SET StatusId = 5,
		DateModified = GETUTCDATE()
	WHERE Id = @Id

END