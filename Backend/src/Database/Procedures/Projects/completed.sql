CREATE OR ALTER PROCEDURE completed(@project_id VARCHAR(100))
AS
BEGIN
    UPDATE Projects SET isComplete = 1 WHERE project_id = @project_id
END