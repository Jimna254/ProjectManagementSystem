CREATE OR ALTER PROCEDURE deleteProject(@project_id VARCHAR(100))
AS
BEGIN
    UPDATE Projects SET isdeleted = 1 WHERE project_id = @project_id
END

